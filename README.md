# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/89674b6e-2f5e-4274-94dc-750582e03d16

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/89674b6e-2f5e-4274-94dc-750582e03d16) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Backend & Authentication)

## Supabase Integration

This project is connected to Supabase for backend functionality:

**Project Details:**
- Project ID: `iueunzrkmotewirixdef`
- Project Name: `Rasamaha24's Project`
- Configuration: Located in `supabase/config.toml`

**Features Available:**
- User authentication (sign up/login)
- Database operations with Row Level Security
- Real-time subscriptions
- File storage capabilities
- Edge functions for serverless backend logic

**Getting Started with Supabase:**
1. The Supabase client is pre-configured in `src/integrations/supabase/client.ts`
2. Database types are auto-generated in `src/integrations/supabase/types.ts`
3. Use the client in your components: `import { supabase } from "@/integrations/supabase/client"`

**Database Management:**
- View your database: [Supabase Dashboard](https://supabase.com/dashboard/project/iueunzrkmotewirixdef)
- SQL Editor: [SQL Editor](https://supabase.com/dashboard/project/iueunzrkmotewirixdef/sql/new)
- Authentication Settings: [Auth Settings](https://supabase.com/dashboard/project/iueunzrkmotewirixdef/auth/providers)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/89674b6e-2f5e-4274-94dc-750582e03d16) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
