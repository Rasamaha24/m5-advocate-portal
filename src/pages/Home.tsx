import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import heroImage from '@/assets/hero-dashboard.jpg';
import { 
  Shield, 
  Users, 
  BarChart3, 
  Zap, 
  CheckCircle, 
  Star,
  ArrowRight,
  Lock,
  Smartphone,
  Clock
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Client Portal Management",
      description: "Secure, personalized dashboards for each client with real-time updates and notifications."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Legislative Tracking",
      description: "Embedded Notion trackers for Texas bills, regulations, and legislative sessions."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance standards to protect sensitive government data."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Smart Organization",
      description: "Intelligent client management with automated legislation attachment and categorization."
    }
  ];

  const useCases = [
    {
      title: "Texas Lobbyists",
      description: "Track state legislation, regulations, and committee activities for multiple clients",
      icon: "🏛️"
    },
    {
      title: "Advocacy Firms", 
      description: "Manage campaigns across different issues and provide transparent reporting",
      icon: "📊"
    },
    {
      title: "Multi-Client Management",
      description: "Organize dozens of clients with automated updates and custom dashboards",
      icon: "👥"
    }
  ];

  const testimonials = [
    {
      quote: "M5 Solutions transformed how we deliver value to our clients. The embedded Notion trackers save us hours every week.",
      author: "Sarah Mitchell",
      title: "Senior Partner, Austin Advocacy Group",
      rating: 5
    },
    {
      quote: "Finally, a secure platform that our government clients trust. The personalized dashboards are game-changing.",
      author: "Michael Rodriguez", 
      title: "Principal, Capitol Strategies LLC",
      rating: 5
    },
    {
      quote: "From 3 clients to 30+ clients seamlessly. M5's organization tools scale with our growing practice.",
      author: "Jennifer Chen",
      title: "Founder, Texas Policy Partners",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-soft py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-sm font-medium">
                  🏛️ Trusted by Texas Advocacy Firms
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Secure Client Portals for 
                  <span className="text-primary"> Legislative Tracking</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Empower your lobbying practice with personalized dashboards, embedded Notion trackers, and enterprise-grade security for tracking Texas legislation.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button size="lg" className="bg-gradient-primary shadow-glow">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/features">
                  <Button variant="outline" size="lg">
                    See Features
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">No setup fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">30-day trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Cancel anytime</span>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="relative rounded-2xl overflow-hidden shadow-large">
                <img 
                  src={heroImage} 
                  alt="M5 Solutions Dashboard"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-background rounded-xl shadow-medium p-4 border border-border">
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Bank-level Security</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-background rounded-xl shadow-medium p-4 border border-border">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Real-time Updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Everything you need to serve your clients
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Purpose-built for lobbyists and advocacy firms who need secure, organized, and professional client reporting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-border hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Built for your practice
            </h2>
            <p className="text-xl text-muted-foreground">
              Whether you're tracking bills for a single client or managing a portfolio of advocacy campaigns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-semibold text-foreground">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Integrations Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary mx-auto">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Enterprise Security</h3>
              <p className="text-muted-foreground">
                SOC 2 compliant with end-to-end encryption. Your sensitive government data stays protected.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary mx-auto">
                <Smartphone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Notion Integration</h3>
              <p className="text-muted-foreground">
                Seamlessly embed your existing Notion workflows for bill tracking and legislative monitoring.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary mx-auto">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Easy to Use</h3>
              <p className="text-muted-foreground">
                Set up client portals in minutes, not hours. Intuitive interface your clients will love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Trusted by leading advocacy firms
            </h2>
            <p className="text-xl text-muted-foreground">
              See what Texas lobbyists are saying about M5 Solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border border-border">
                <CardContent className="p-6 space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.title}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Ready to transform your lobbying practice?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join leading advocacy firms in Texas who trust M5 Solutions for secure, professional client reporting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" variant="secondary">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;