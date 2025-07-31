-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  role TEXT DEFAULT 'client',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create clients table for organizations
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  address TEXT,
  industry TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bills table for Texas legislation
CREATE TABLE public.bills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bill_number TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT,
  status TEXT NOT NULL DEFAULT 'introduced' CHECK (status IN ('introduced', 'committee', 'floor', 'passed', 'failed', 'signed', 'vetoed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  chamber TEXT CHECK (chamber IN ('house', 'senate')),
  author TEXT,
  sponsor TEXT,
  effective_date DATE,
  session_year INTEGER DEFAULT EXTRACT(year FROM now()),
  committee TEXT,
  last_action TEXT,
  last_action_date DATE,
  fiscal_impact TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create client_bills junction table (many-to-many relationship)
CREATE TABLE public.client_bills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  bill_id UUID NOT NULL REFERENCES public.bills(id) ON DELETE CASCADE,
  tracking_reason TEXT,
  position TEXT CHECK (position IN ('support', 'oppose', 'monitor', 'neutral')),
  notes TEXT,
  priority_override TEXT CHECK (priority_override IN ('low', 'medium', 'high', 'critical')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(client_id, bill_id)
);

-- Create bill_updates table for tracking changes
CREATE TABLE public.bill_updates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bill_id UUID NOT NULL REFERENCES public.bills(id) ON DELETE CASCADE,
  previous_status TEXT,
  new_status TEXT NOT NULL,
  update_description TEXT,
  action_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  bill_id UUID REFERENCES public.bills(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'error')),
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_clients junction table (users can belong to multiple clients)
CREATE TABLE public.user_clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, client_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bill_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_clients ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create security definer function to get user's client IDs
CREATE OR REPLACE FUNCTION public.get_user_client_ids(target_user_id UUID DEFAULT auth.uid())
RETURNS UUID[] AS $$
  SELECT ARRAY_AGG(client_id) 
  FROM public.user_clients 
  WHERE user_id = target_user_id;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- RLS policies for clients (users can only see clients they belong to)
CREATE POLICY "Users can view their clients" ON public.clients
  FOR SELECT USING (id = ANY(public.get_user_client_ids()));

-- RLS policies for bills (all authenticated users can view bills)
CREATE POLICY "Authenticated users can view bills" ON public.bills
  FOR SELECT TO authenticated USING (true);

-- RLS policies for client_bills (users can only see bills tracked by their clients)
CREATE POLICY "Users can view their client bills" ON public.client_bills
  FOR SELECT USING (client_id = ANY(public.get_user_client_ids()));

-- RLS policies for bill_updates (users can see updates for bills their clients track)
CREATE POLICY "Users can view bill updates for tracked bills" ON public.bill_updates
  FOR SELECT USING (
    bill_id IN (
      SELECT cb.bill_id 
      FROM public.client_bills cb 
      WHERE cb.client_id = ANY(public.get_user_client_ids())
    )
  );

-- RLS policies for notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for user_clients
CREATE POLICY "Users can view their own client relationships" ON public.user_clients
  FOR SELECT USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_client_bills_client_id ON public.client_bills(client_id);
CREATE INDEX idx_client_bills_bill_id ON public.client_bills(bill_id);
CREATE INDEX idx_bill_updates_bill_id ON public.bill_updates(bill_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(read);
CREATE INDEX idx_user_clients_user_id ON public.user_clients(user_id);
CREATE INDEX idx_user_clients_client_id ON public.user_clients(client_id);
CREATE INDEX idx_bills_status ON public.bills(status);
CREATE INDEX idx_bills_session_year ON public.bills(session_year);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bills_updated_at
  BEFORE UPDATE ON public.bills
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_client_bills_updated_at
  BEFORE UPDATE ON public.client_bills
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data
INSERT INTO public.clients (name, contact_email, industry, status) VALUES
  ('Tech Innovations LLC', 'contact@techinnovations.com', 'Technology', 'active'),
  ('Green Energy Corp', 'info@greenenergy.com', 'Energy', 'active'),
  ('Healthcare Solutions Inc', 'support@healthcaresolutions.com', 'Healthcare', 'active'),
  ('Financial Services Group', 'contact@financialservices.com', 'Finance', 'active');

-- Insert sample bills
INSERT INTO public.bills (bill_number, title, summary, status, priority, chamber, author, session_year) VALUES
  ('HB 1234', 'Texas Digital Privacy Act', 'Comprehensive data privacy legislation for Texas residents', 'committee', 'high', 'house', 'Rep. Johnson', 2024),
  ('SB 567', 'Clean Energy Infrastructure Bill', 'Funding for renewable energy projects across Texas', 'floor', 'critical', 'senate', 'Sen. Martinez', 2024),
  ('HB 890', 'Healthcare Transparency Act', 'Requires hospitals to publish pricing information', 'introduced', 'medium', 'house', 'Rep. Williams', 2024),
  ('SB 123', 'Financial Innovation Sandbox', 'Regulatory framework for fintech companies', 'passed', 'high', 'senate', 'Sen. Davis', 2024),
  ('HB 456', 'Cybersecurity Standards Act', 'Mandatory security standards for state agencies', 'committee', 'critical', 'house', 'Rep. Brown', 2024);

-- Enable realtime for relevant tables
ALTER TABLE public.bills REPLICA IDENTITY FULL;
ALTER TABLE public.client_bills REPLICA IDENTITY FULL;
ALTER TABLE public.bill_updates REPLICA IDENTITY FULL;
ALTER TABLE public.notifications REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.bills;
ALTER PUBLICATION supabase_realtime ADD TABLE public.client_bills;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bill_updates;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;