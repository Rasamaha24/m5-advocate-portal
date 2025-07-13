import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  Shield, 
  Users, 
  BarChart3, 
  Zap, 
  Lock,
  Bell,
  FileText,
  Search,
  Smartphone,
  Cloud,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const mainFeatures = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Personalized Client Dashboards",
      description: "Every client gets their own secure portal with customized views of relevant legislation, regulations, and government activity.",
      details: [
        "Custom branding with your firm's logo",
        "Real-time legislative updates",
        "Personalized notification preferences",
        "Mobile-responsive design"
      ]
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Embedded Notion Trackers",
      description: "Seamlessly integrate your existing Notion workflows for tracking Texas bills, regulations, and legislative sessions.",
      details: [
        "Direct Notion database embedding",
        "Synchronized data updates",
        "Custom view configurations",
        "Collaborative editing capabilities"
      ]
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Smart Client Organization",
      description: "Intelligent management system that automatically organizes clients and attaches relevant legislation based on their interests.",
      details: [
        "AI-powered legislation matching",
        "Automated tagging and categorization",
        "Bulk client management tools",
        "Custom organizational hierarchies"
      ]
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "Bank-level security with SOC 2 compliance ensures your sensitive government and client data stays protected.",
      details: [
        "End-to-end encryption",
        "SOC 2 Type II certified",
        "Multi-factor authentication",
        "Regular security audits"
      ]
    }
  ];

  const additionalFeatures = [
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Real-time Notifications",
      description: "Instant alerts for bill changes, hearings, and deadlines"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Document Management",
      description: "Secure storage and sharing of legislative documents"
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Advanced Search",
      description: "Powerful search across all legislation and documents"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Access",
      description: "Full functionality on mobile devices and tablets"
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Cloud Backup",
      description: "Automatic backup and disaster recovery"
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Role-based Access",
      description: "Granular permissions for different user types"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6">
            🚀 Powerful Features
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything you need for professional 
            <span className="text-primary"> client reporting</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            M5 Solutions provides a complete platform for lobbyists and advocacy firms to deliver exceptional value to their clients through secure, organized, and intelligent tracking systems.
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-gradient-primary">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {mainFeatures.map((feature, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                      {feature.title}
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <Card className="border border-border shadow-medium">
                    <CardContent className="p-8">
                      <div className="bg-muted/50 rounded-lg h-64 flex items-center justify-center">
                        <div className="text-center space-y-4">
                          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                            {feature.icon}
                          </div>
                          <p className="text-muted-foreground">Feature Preview</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              And so much more
            </h2>
            <p className="text-xl text-muted-foreground">
              Additional features that make M5 Solutions the complete choice for your practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="border border-border hover:shadow-medium transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Seamless Notion Integration
              </h2>
              <p className="text-lg text-muted-foreground">
                Already using Notion for legislative tracking? M5 Solutions embeds directly into your existing workflows, so you don't have to start over.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-muted-foreground">Import existing Notion databases</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-muted-foreground">Real-time synchronization</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-muted-foreground">Maintain your existing workflows</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-muted-foreground">Share views securely with clients</span>
                </li>
              </ul>
            </div>
            <div className="bg-muted/50 rounded-xl p-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground text-sm font-bold">N</span>
                  </div>
                  <div className="text-foreground font-semibold">Notion Integration</div>
                </div>
                <div className="space-y-2">
                  <div className="bg-background rounded-lg p-3 border border-border">
                    <div className="text-sm text-muted-foreground">Texas Bill Tracker</div>
                  </div>
                  <div className="bg-background rounded-lg p-3 border border-border">
                    <div className="text-sm text-muted-foreground">Regulation Database</div>
                  </div>
                  <div className="bg-background rounded-lg p-3 border border-border">
                    <div className="text-sm text-muted-foreground">Session Notes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Ready to see these features in action?
          </h2>
          <p className="text-xl opacity-90">
            Start your free trial today and experience the difference M5 Solutions makes.
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

export default Features;