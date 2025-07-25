# Supabase Integration Setup Guide

This document provides detailed information about the Supabase integration for the M5 Solutions project.

## Project Configuration

**Supabase Project Details:**
- Project ID: `iueunzrkmotewirixdef`
- Project Name: `Rasamaha24's Project`
- Database URL: `https://iueunzrkmotewirixdef.supabase.co`

## File Structure

```
src/integrations/supabase/
├── client.ts          # Pre-configured Supabase client
└── types.ts           # Auto-generated TypeScript types from database schema

supabase/
└── config.toml        # Project configuration file
```

## Getting Started

### 1. Using the Supabase Client

The Supabase client is pre-configured and ready to use:

```typescript
import { supabase } from "@/integrations/supabase/client";

// Example: Insert data
const { data, error } = await supabase
  .from('your_table')
  .insert([{ column: 'value' }]);

// Example: Query data
const { data, error } = await supabase
  .from('your_table')
  .select('*');
```

### 2. Authentication Setup

To implement user authentication:

```typescript
import { supabase } from "@/integrations/supabase/client";

// Sign up new user
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password',
  options: {
    emailRedirectTo: `${window.location.origin}/`
  }
});

// Sign in existing user
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});

// Get current session
const { data: { session } } = await supabase.auth.getSession();

// Listen to auth changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session);
});
```

### 3. Database Operations

Create tables and manage data through the Supabase dashboard or migrations:

```sql
-- Example: Create a profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  company TEXT,
  role TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own data
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
```

## Available Features

### Authentication
- Email/password authentication
- Social login providers (Google, GitHub, etc.)
- Magic link authentication
- User management and roles

### Database
- PostgreSQL database with full SQL support
- Row Level Security (RLS) for data protection
- Real-time subscriptions
- Auto-generated TypeScript types

### Storage
- File upload and management
- Image transformations
- Access control policies

### Edge Functions
- Serverless backend functions
- Custom API endpoints
- Third-party integrations

## Security Configuration

### Row Level Security (RLS)
Always enable RLS on tables containing user data:

```sql
-- Enable RLS
ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can only see their own data" ON your_table
  FOR ALL USING (auth.uid() = user_id);
```

### Authentication Policies
Configure authentication settings in the Supabase dashboard:
- Site URL: Set to your deployment URL
- Redirect URLs: Add your development and production URLs
- Email templates: Customize confirmation and reset emails

## Development Workflow

1. **Database Changes**: Make schema changes through the Supabase dashboard SQL editor
2. **Type Generation**: Database types are automatically generated in `types.ts`
3. **Local Development**: Use the pre-configured client for all operations
4. **Testing**: Use Supabase's built-in testing tools and logs

## Useful Links

- **Supabase Dashboard**: [https://supabase.com/dashboard/project/iueunzrkmotewirixdef](https://supabase.com/dashboard/project/iueunzrkmotewirixdef)
- **SQL Editor**: [https://supabase.com/dashboard/project/iueunzrkmotewirixdef/sql/new](https://supabase.com/dashboard/project/iueunzrkmotewirixdef/sql/new)
- **Authentication Settings**: [https://supabase.com/dashboard/project/iueunzrkmotewirixdef/auth/providers](https://supabase.com/dashboard/project/iueunzrkmotewirixdef/auth/providers)
- **Database Tables**: [https://supabase.com/dashboard/project/iueunzrkmotewirixdef/editor](https://supabase.com/dashboard/project/iueunzrkmotewirixdef/editor)
- **Storage Buckets**: [https://supabase.com/dashboard/project/iueunzrkmotewirixdef/storage/buckets](https://supabase.com/dashboard/project/iueunzrkmotewirixdef/storage/buckets)

## Next Steps

1. **Set up authentication**: Implement user login/signup functionality
2. **Create database schema**: Design tables for your application data
3. **Configure RLS policies**: Secure your data with proper access controls
4. **Implement real-time features**: Use Supabase subscriptions for live updates
5. **Add file storage**: Set up buckets for user uploads

For detailed implementation examples, refer to the `BACKEND_INTEGRATION.md` file which contains specific code examples for authentication and data management.