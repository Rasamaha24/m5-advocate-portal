-- Insert sample client-bill relationships
INSERT INTO public.client_bills (client_id, bill_id, tracking_reason, position, notes) VALUES
  ((SELECT id FROM public.clients WHERE name = 'Tech Innovations LLC'), 
   (SELECT id FROM public.bills WHERE bill_number = 'HB 1234'), 
   'Data privacy affects our customers', 'support', 'Critical for our business operations'),
  
  ((SELECT id FROM public.clients WHERE name = 'Green Energy Corp'), 
   (SELECT id FROM public.bills WHERE bill_number = 'SB 567'), 
   'Directly impacts our funding opportunities', 'support', 'Essential for expansion plans'),
  
  ((SELECT id FROM public.clients WHERE name = 'Healthcare Solutions Inc'), 
   (SELECT id FROM public.bills WHERE bill_number = 'HB 890'), 
   'Transparency requirements may affect our operations', 'monitor', 'Need to assess impact'),
  
  ((SELECT id FROM public.clients WHERE name = 'Financial Services Group'), 
   (SELECT id FROM public.bills WHERE bill_number = 'SB 123'), 
   'Regulatory framework for our fintech products', 'support', 'Enables our services'),
  
  ((SELECT id FROM public.clients WHERE name = 'Tech Innovations LLC'), 
   (SELECT id FROM public.bills WHERE bill_number = 'HB 456'), 
   'Cybersecurity standards affect our compliance', 'support', 'Aligns with our security practices');

-- Insert some bill updates
INSERT INTO public.bill_updates (bill_id, previous_status, new_status, update_description, action_date) VALUES
  ((SELECT id FROM public.bills WHERE bill_number = 'HB 1234'), 
   'introduced', 'committee', 'Assigned to House Committee on Technology', '2024-01-15'),
  
  ((SELECT id FROM public.bills WHERE bill_number = 'SB 567'), 
   'committee', 'floor', 'Passed out of committee with amendments', '2024-01-20'),
  
  ((SELECT id FROM public.bills WHERE bill_number = 'HB 890'), 
   NULL, 'introduced', 'Filed in House', '2024-01-10');