# M5 Solutions Website - Developer Guide

A comprehensive guide for beginners to understand, customize, and maintain the M5 Solutions marketing website.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Making Your First Edit](#making-your-first-edit)
5. [Content Management](#content-management)
6. [Styling & Design](#styling--design)
7. [Adding New Features](#adding-new-features)
8. [Component Reference](#component-reference)
9. [Common Customizations](#common-customizations)
10. [Troubleshooting](#troubleshooting)

## Getting Started

### Prerequisites
- Basic understanding of HTML/CSS
- Node.js installed on your computer
- A code editor (VS Code recommended)

### Quick Setup
1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd m5-solutions-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the website

## Technology Stack

### Core Technologies
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Adds type safety to JavaScript
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing for navigation

### UI Components
- **Shadcn/ui**: Pre-built, customizable components
- **Lucide React**: Beautiful icon library
- **Radix UI**: Accessible component primitives

### Backend & Database
- **Supabase**: Complete backend solution with PostgreSQL database
- **Authentication**: Built-in user management and authentication
- **Real-time**: Live data synchronization capabilities
- **Storage**: File upload and management system

## Project Structure

```
src/
├── components/              # Reusable components
│   ├── ui/                 # Shadcn UI components (button, card, etc.)
│   ├── Navigation.tsx      # Main navigation bar
│   └── Footer.tsx         # Site footer
├── pages/                  # Page components
│   ├── Home.tsx           # Homepage
│   ├── Features.tsx       # Features page
│   ├── Pricing.tsx        # Pricing page
│   ├── About.tsx          # About page
│   ├── Contact.tsx        # Contact page
│   └── Login.tsx          # Login page
├── integrations/           # External service integrations
│   └── supabase/          # Supabase configuration and types
│       ├── client.ts      # Supabase client setup
│       └── types.ts       # Auto-generated database types
├── assets/                 # Images and static files
├── lib/                    # Utility functions
├── hooks/                  # Custom React hooks
├── index.css              # Global styles and design tokens
└── App.tsx                # Main app component with routing
```

### Key Files
- `src/App.tsx` - Main routing configuration
- `src/index.css` - Design system colors and global styles
- `tailwind.config.ts` - Tailwind configuration
- `src/components/Navigation.tsx` - Main navigation
- `src/pages/Home.tsx` - Homepage content
- `src/integrations/supabase/client.ts` - Supabase client configuration
- `supabase/config.toml` - Supabase project configuration

## Making Your First Edit

### Example: Changing the Company Name
Let's start with a simple change - updating text content.

1. **Find the file**: Open `src/pages/Home.tsx`
2. **Locate the text**: Look for "M5 Solutions"
3. **Make the change**: Replace with your desired text
4. **Save the file**: The browser will automatically refresh

```tsx
// Before
<h1 className="text-4xl md:text-6xl font-bold">
  M5 Solutions
</h1>

// After
<h1 className="text-4xl md:text-6xl font-bold">
  Your Company Name
</h1>
```

### Example: Adding a New Navigation Link
1. **Open**: `src/components/Navigation.tsx`
2. **Find the navigation items**:
```tsx
const navItems = [
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];
```
3. **Add your new item**:
```tsx
const navItems = [
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" }, // New item
  { name: "Contact", href: "/contact" },
];
```

## Content Management

### Updating Text Content

#### Homepage Hero Section
**File**: `src/pages/Home.tsx`
**Location**: Look for the hero section at the top

```tsx
// Update the main headline
<h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
  Your New Headline Here
</h1>

// Update the description
<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
  Your new description text here
</p>
```

#### Feature Descriptions
**File**: `src/pages/Home.tsx`
**Location**: Find the features array

```tsx
const features = [
  {
    icon: Shield,
    title: "Your Feature Title",
    description: "Your feature description here"
  },
  // Add more features...
];
```

#### Contact Information
**File**: `src/pages/Contact.tsx`
**Location**: Update contact details

```tsx
<div className="space-y-6">
  <div>
    <h3 className="font-semibold mb-2">Email</h3>
    <p className="text-muted-foreground">your-email@company.com</p>
  </div>
  <div>
    <h3 className="font-semibold mb-2">Phone</h3>
    <p className="text-muted-foreground">+1 (555) 123-4567</p>
  </div>
</div>
```

### Updating Images

#### Replacing the Hero Image
1. **Add new image**: Place your image in `src/assets/` folder
2. **Update import**: In `src/pages/Home.tsx`
```tsx
// Replace this line
import heroImage from "@/assets/hero-dashboard.jpg";

// With your new image
import heroImage from "@/assets/your-new-image.jpg";
```

#### Adding New Images
1. **Import the image**:
```tsx
import yourImage from "@/assets/your-image.jpg";
```
2. **Use in JSX**:
```tsx
<img src={yourImage} alt="Description" className="w-full h-auto" />
```

## Styling & Design

### Color System
The website uses a custom color system defined in `src/index.css`. All colors are semantic tokens:

```css
:root {
  --primary: 221 83% 53%;           /* Main brand color */
  --primary-glow: 221 83% 70%;      /* Lighter brand color */
  --secondary: 210 40% 98%;         /* Secondary color */
  --accent: 210 40% 90%;            /* Accent color */
  --background: 0 0% 100%;          /* Page background */
  --foreground: 222.2 84% 4.9%;     /* Main text color */
}
```

### Using Colors in Components
Always use semantic color tokens, never direct colors:

```tsx
// ✅ Good - Using semantic tokens
<div className="bg-primary text-primary-foreground">
  Primary colored section
</div>

// ❌ Bad - Using direct colors
<div className="bg-blue-500 text-white">
  Don't do this
</div>
```

### Typography Scale
Defined in `tailwind.config.ts`:
- `text-xs` - 12px
- `text-sm` - 14px
- `text-base` - 16px (default)
- `text-lg` - 18px
- `text-xl` - 20px
- `text-2xl` - 24px
- `text-3xl` - 30px
- `text-4xl` - 36px
- `text-5xl` - 48px
- `text-6xl` - 60px

### Spacing System
Use consistent spacing:
- `p-4` - 16px padding
- `m-8` - 32px margin
- `gap-6` - 24px gap
- `space-y-4` - 16px vertical spacing between children

### Custom Classes
Pre-defined utility classes in `index.css`:

```css
.gradient-primary {
  background: var(--gradient-primary);
}

.shadow-elegant {
  box-shadow: var(--shadow-elegant);
}

.text-gradient {
  background: var(--gradient-text);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## Adding New Features

### Creating a New Page

1. **Create the page component**:
```tsx
// src/pages/Blog.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-foreground mb-8">
            Blog
          </h1>
          <p className="text-muted-foreground">
            Your blog content here...
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

2. **Add to routing in `src/App.tsx`**:
```tsx
import Blog from "./pages/Blog";

// Add to the Routes component
<Route path="/blog" element={<Blog />} />
```

3. **Add to navigation in `src/components/Navigation.tsx`**:
```tsx
const navItems = [
  // ... existing items
  { name: "Blog", href: "/blog" },
];
```

### Creating Reusable Components

1. **Create component file**:
```tsx
// src/components/TestimonialCard.tsx
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export function TestimonialCard({ quote, author, role, company }: TestimonialCardProps) {
  return (
    <Card className="p-6">
      <CardContent>
        <p className="text-muted-foreground mb-4">"{quote}"</p>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">{role} at {company}</p>
        </div>
      </CardContent>
    </Card>
  );
}
```

2. **Use the component**:
```tsx
import { TestimonialCard } from "@/components/TestimonialCard";

// In your JSX
<TestimonialCard
  quote="M5 Solutions transformed our lobbying practice"
  author="John Smith"
  role="Senior Lobbyist"
  company="Texas Advocacy Group"
/>
```

## Component Reference

### Navigation Component
**File**: `src/components/Navigation.tsx`

**Customizable elements**:
- Logo/company name
- Navigation menu items
- Login button text and link
- Mobile menu behavior

### Footer Component
**File**: `src/components/Footer.tsx`

**Customizable elements**:
- Company information
- Social media links
- Footer navigation links
- Copyright text

### UI Components (Shadcn)
Located in `src/components/ui/`:

#### Button Component
```tsx
import { Button } from "@/components/ui/button";

// Variants
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

#### Card Component
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

#### Icons (Lucide React)
```tsx
import { Star, Shield, Zap, Users } from "lucide-react";

<Star className="w-6 h-6 text-primary" />
<Shield className="w-8 h-8 text-accent" />
```

## Common Customizations

### Changing Brand Colors

1. **Update color tokens in `src/index.css`**:
```css
:root {
  --primary: 260 84% 57%;        /* Purple theme */
  --primary-glow: 260 84% 70%;   /* Lighter purple */
}
```

2. **Update gradients**:
```css
:root {
  --gradient-primary: linear-gradient(135deg, hsl(260 84% 57%), hsl(260 84% 70%));
}
```

### Changing Fonts

1. **Add Google Font to `index.html`**:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

2. **Update `tailwind.config.ts`**:
```ts
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
}
```

### Adding Animation

1. **Use built-in Tailwind animations**:
```tsx
<div className="animate-fade-in">Fades in</div>
<div className="hover:scale-105 transition-transform">Scales on hover</div>
```

2. **Create custom animations in `tailwind.config.ts`**:
```ts
animation: {
  'slide-up': 'slideUp 0.5s ease-out',
}
```

### Customizing Layout

#### Container Widths
```tsx
// Full width
<div className="w-full">

// Container with max width
<div className="container mx-auto">

// Custom max width
<div className="max-w-4xl mx-auto">
```

#### Responsive Design
```tsx
// Mobile first approach
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

// Grid layouts
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  Grid items
</div>
```

## Troubleshooting

### Common Issues

#### 1. White Screen or App Won't Load
- Check browser console for errors (F12 → Console)
- Ensure all imports are correct
- Check for syntax errors in recent changes

#### 2. Styling Not Applying
- Verify Tailwind classes are spelled correctly
- Check if custom CSS variables are defined in `index.css`
- Clear browser cache

#### 3. Navigation Not Working
- Check routes in `src/App.tsx`
- Ensure page components are imported correctly
- Verify React Router setup

#### 4. Images Not Loading
- Check file paths are correct
- Ensure images are in `src/assets/` folder
- Verify image imports in components

#### 5. TypeScript Errors
- Check component prop types
- Ensure all required props are provided
- Import types correctly

### Development Tips

1. **Keep the dev server running** - Changes appear instantly
2. **Use browser dev tools** - Inspect elements and check console
3. **Start small** - Make one change at a time
4. **Test responsive design** - Check mobile and desktop views
5. **Validate your changes** - Click through all pages after changes

### Getting Help

1. **Check the browser console** for error messages
2. **Compare with working examples** in the existing code
3. **Revert changes** if something breaks - use Git to go back
4. **Ask for help** with specific error messages

## Best Practices

### Code Organization
- Keep components small and focused
- Use meaningful file and variable names
- Group related functionality together
- Comment complex logic

### Performance
- Optimize images before adding them
- Use lazy loading for large content
- Keep bundle size minimal
- Test loading speed regularly

### Accessibility
- Use semantic HTML elements
- Provide alt text for images
- Ensure good color contrast
- Test with keyboard navigation

### SEO
- Use proper heading hierarchy (h1, h2, h3)
- Add meta descriptions
- Use descriptive page titles
- Optimize image alt attributes

## Quick Reference

### File Editing Checklist
- [ ] Text content: Update in page components
- [ ] Images: Add to assets, update imports
- [ ] Navigation: Modify Navigation.tsx
- [ ] Styling: Use semantic color tokens
- [ ] New pages: Create component + add route
- [ ] Test: Check in browser after changes

### Common File Locations
- Homepage content: `src/pages/Home.tsx`
- Navigation menu: `src/components/Navigation.tsx`
- Contact info: `src/pages/Contact.tsx`
- Colors/styling: `src/index.css`
- Routing: `src/App.tsx`

This guide should help you confidently make changes to the M5 Solutions website. Start with small changes and gradually work up to more complex modifications as you become comfortable with the codebase.
