# Component Reference Guide

Complete documentation of all components in the M5 Solutions website with usage examples and customization options.

## Page Components

### Home.tsx
**Purpose**: Main landing page with hero section, features, testimonials, and CTAs

**Key Sections**:
- Hero section with animated background
- Feature highlights grid
- Use cases section
- Testimonials
- Call-to-action sections

**Customizable Elements**:
```tsx
// Hero content
const heroContent = {
  headline: "Track legislation with confidence",
  subheadline: "Professional client portal for lobbyists...",
  ctaText: "Start Free Trial"
};

// Features array
const features = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "Your client data is protected..."
  }
  // Add/remove features here
];

// Testimonials array
const testimonials = [
  {
    quote: "M5 Solutions transformed our practice...",
    author: "Sarah Chen",
    role: "Senior Partner",
    company: "Austin Government Relations"
  }
  // Add/remove testimonials here
];
```

### Features.tsx
**Purpose**: Detailed feature showcase page

**Key Sections**:
- Feature hero
- Detailed feature cards
- Integration showcase
- Security emphasis

**Customizable Elements**:
```tsx
// Main features list
const mainFeatures = [
  {
    icon: BarChart3,
    title: "Personalized Dashboards",
    description: "Each client gets their own secure portal...",
    benefits: [
      "Custom dashboard for each client",
      "Real-time legislative tracking",
      "Automated notifications"
    ]
  }
  // Modify features here
];

// Integration features
const integrationFeatures = [
  {
    icon: Link,
    title: "Notion Integration",
    description: "Seamlessly embed Notion trackers..."
  }
  // Add new integrations here
];
```

### Pricing.tsx
**Purpose**: Pricing plans and FAQ

**Key Sections**:
- Pricing tiers
- Feature comparison
- FAQ section

**Customizable Elements**:
```tsx
// Pricing plans
const pricingPlans = [
  {
    name: "Starter",
    price: "Custom",
    description: "Perfect for small lobbying firms",
    features: [
      "Up to 5 clients",
      "Basic dashboard",
      "Email support"
    ],
    highlighted: false
  }
  // Modify pricing tiers here
];

// FAQ items
const faqItems = [
  {
    question: "How does pricing work?",
    answer: "We offer custom pricing based on your firm size..."
  }
  // Add/remove FAQ items here
];
```

### About.tsx
**Purpose**: Company information and team

**Key Sections**:
- Company story
- Mission statement
- Team members
- Values

**Customizable Elements**:
```tsx
// Team members
const teamMembers = [
  {
    name: "Michael Rodriguez",
    role: "CEO & Founder",
    bio: "Former lobbyist with 15+ years...",
    image: "/api/placeholder/300/300"
  }
  // Add/remove team members here
];

// Company values
const values = [
  {
    icon: Shield,
    title: "Security First",
    description: "We prioritize the protection..."
  }
  // Modify company values here
];
```

### Contact.tsx
**Purpose**: Contact form and information

**Key Sections**:
- Contact form
- Contact information
- FAQ section

**Customizable Elements**:
```tsx
// Contact information
const contactInfo = {
  email: "hello@m5solutions.com",
  phone: "+1 (512) 555-0123",
  address: "Austin, Texas"
};

// Form fields (in the form component)
const formFields = [
  { name: "name", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "company", label: "Company", type: "text" },
  { name: "message", label: "Message", type: "textarea" }
];
```

### Login.tsx
**Purpose**: Authentication interface

**Key Sections**:
- Login form
- Features highlight
- Security messaging

**Customizable Elements**:
```tsx
// Login features
const loginFeatures = [
  {
    icon: Shield,
    title: "Secure Access",
    description: "Enterprise-grade security"
  }
  // Modify login page features here
];
```

## Layout Components

### Navigation.tsx
**Purpose**: Main site navigation

**Structure**:
```tsx
// Navigation items
const navItems = [
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

// Mobile navigation state
const [isOpen, setIsOpen] = useState(false);
```

**Customization Examples**:
```tsx
// Adding a new nav item
const navItems = [
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" }, // New item
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

// Changing company name/logo
<div className="flex items-center space-x-2">
  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
    <span className="text-primary-foreground font-bold">M5</span>
  </div>
  <span className="font-bold text-xl">Your Company</span>
</div>
```

### Footer.tsx
**Purpose**: Site footer with links and information

**Structure**:
```tsx
// Footer sections
const footerSections = {
  product: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Security", href: "/security" }
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" }
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Cookies", href: "/cookies" }
  ]
};
```

**Customization Examples**:
```tsx
// Adding social media links
const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/yourcompany", icon: Twitter },
  { name: "LinkedIn", href: "https://linkedin.com/company/yourcompany", icon: Linkedin },
  { name: "GitHub", href: "https://github.com/yourcompany", icon: Github }
];

// Updating copyright
<p className="text-muted-foreground">
  © 2024 Your Company Name. All rights reserved.
</p>
```

## UI Components (Shadcn)

### Button Component
**File**: `src/components/ui/button.tsx`

**Variants**:
```tsx
// Available variants
<Button variant="default">Default Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="destructive">Destructive Button</Button>

// Available sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon Only</Button>
```

**Custom Styling**:
```tsx
// Adding custom classes
<Button className="bg-gradient-primary hover:opacity-90">
  Gradient Button
</Button>

// With icons
<Button>
  <Star className="mr-2 h-4 w-4" />
  Starred
</Button>
```

### Card Component
**File**: `src/components/ui/card.tsx`

**Structure**:
```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**Styling Examples**:
```tsx
// Hover effects
<Card className="hover:shadow-elegant transition-shadow">

// Gradient border
<Card className="border-2 border-gradient-primary">

// Background variations
<Card className="bg-secondary/50">
```

### Input Component
**File**: `src/components/ui/input.tsx`

**Usage**:
```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="Enter your email"
    required
  />
</div>
```

### Textarea Component
**File**: `src/components/ui/textarea.tsx`

**Usage**:
```tsx
import { Textarea } from "@/components/ui/textarea";

<Textarea
  placeholder="Enter your message"
  rows={4}
  className="resize-none"
/>
```

### Badge Component
**File**: `src/components/ui/badge.tsx`

**Variants**:
```tsx
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>
```

## Custom Components

### Feature Card
**Usage Pattern**:
```tsx
const FeatureCard = ({ icon: Icon, title, description, benefits }) => (
  <Card className="p-6 hover:shadow-elegant transition-shadow">
    <CardContent className="p-0">
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 rounded-lg bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground mb-4">{description}</p>
      {benefits && (
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-primary" />
              <span className="text-sm">{benefit}</span>
            </li>
          ))}
        </ul>
      )}
    </CardContent>
  </Card>
);
```

### Testimonial Card
**Usage Pattern**:
```tsx
const TestimonialCard = ({ quote, author, role, company }) => (
  <Card className="p-6">
    <CardContent className="p-0">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>
      <blockquote className="text-muted-foreground mb-4">
        "{quote}"
      </blockquote>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-semibold">
            {author.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">{role} at {company}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);
```

### Pricing Card
**Usage Pattern**:
```tsx
const PricingCard = ({ plan, highlighted = false }) => (
  <Card className={cn(
    "relative p-6",
    highlighted && "border-primary shadow-elegant"
  )}>
    {highlighted && (
      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        Most Popular
      </Badge>
    )}
    <CardContent className="p-0">
      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{plan.price}</span>
        {plan.period && <span className="text-muted-foreground">/{plan.period}</span>}
      </div>
      <p className="text-muted-foreground mb-6">{plan.description}</p>
      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button 
        className="w-full" 
        variant={highlighted ? "default" : "outline"}
      >
        {plan.ctaText || "Get Started"}
      </Button>
    </CardContent>
  </Card>
);
```

## Icon Usage

### Lucide React Icons
**Common Icons Used**:
```tsx
import {
  Shield,        // Security features
  BarChart3,     // Analytics/tracking
  Users,         // Team/clients
  Zap,          // Performance
  Lock,         // Security
  Check,        // Checkmarks
  Star,         // Reviews/ratings
  Mail,         // Contact
  Phone,        // Contact
  MapPin,       // Location
  ArrowRight,   // CTAs
  Menu,         // Mobile menu
  X,            // Close buttons
  ChevronDown,  // Dropdowns
  ExternalLink, // External links
  Globe,        // Web/global
  FileText,     // Documents
  Bell,         // Notifications
  Settings,     // Configuration
  Eye,          // View/visibility
  Download,     // Downloads
  Upload        // Uploads
} from "lucide-react";
```

**Usage Examples**:
```tsx
// Basic icon
<Shield className="w-6 h-6 text-primary" />

// Icon with background
<div className="p-3 rounded-lg bg-primary/10">
  <Shield className="w-6 h-6 text-primary" />
</div>

// Icon in button
<Button>
  <Download className="mr-2 h-4 w-4" />
  Download
</Button>

// Responsive icon sizes
<Shield className="w-4 h-4 md:w-6 md:h-6" />
```

## Animation Classes

### Pre-built Animations
**Available in `index.css`**:
```css
/* Fade animations */
.animate-fade-in { /* Fades in from bottom */ }
.animate-fade-out { /* Fades out to bottom */ }

/* Scale animations */
.animate-scale-in { /* Scales in */ }
.animate-scale-out { /* Scales out */ }

/* Slide animations */
.animate-slide-in-right { /* Slides in from right */ }
.animate-slide-out-right { /* Slides out to right */ }

/* Interactive animations */
.hover-scale { /* Scales on hover */ }
.story-link { /* Underline animation on hover */ }
```

**Usage Examples**:
```tsx
// Fade in content
<div className="animate-fade-in">
  Content that fades in
</div>

// Hover scale effect
<Card className="hover-scale">
  Card that scales on hover
</Card>

// Link with underline animation
<a href="#" className="story-link">
  Link with animated underline
</a>

// Staggered animations
<div className="space-y-4">
  {items.map((item, index) => (
    <div 
      key={index}
      className="animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {item.content}
    </div>
  ))}
</div>
```

## Form Components

### Contact Form Example
```tsx
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  );
};
```

## Responsive Design Patterns

### Grid Layouts
```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <div key={item.id}>{item.content}</div>
  ))}
</div>

// Two-column layout
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
  <div>Content</div>
  <div>Image</div>
</div>
```

### Text Sizing
```tsx
// Responsive headings
<h1 className="text-3xl md:text-4xl lg:text-6xl font-bold">
  Responsive Heading
</h1>

// Responsive body text
<p className="text-sm md:text-base lg:text-lg">
  Responsive paragraph
</p>
```

### Spacing
```tsx
// Responsive padding
<div className="p-4 md:p-8 lg:p-12">
  Content with responsive padding
</div>

// Responsive margins
<div className="mb-8 md:mb-12 lg:mb-16">
  Content with responsive margin
</div>
```

This reference guide covers all the major components and patterns used in the M5 Solutions website. Use it as a quick reference when building new features or customizing existing ones.