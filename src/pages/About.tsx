import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight, MapPin, Users, Target, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Purpose-Built",
      description: "Every feature is designed specifically for the unique needs of lobbyists and advocacy professionals."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Client-Focused",
      description: "We understand that your success depends on delivering exceptional value to your clients."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description: "We're committed to providing enterprise-grade security and professional-quality tools."
    }
  ];

  const timeline = [
    {
      year: "2023",
      title: "Founded in Austin",
      description: "M5 Solutions was founded by former lobbyists who understood the challenges of client reporting and legislative tracking."
    },
    {
      year: "2024",
      title: "Texas Focus",
      description: "Launched with a dedicated focus on Texas legislation, working closely with Austin-area advocacy firms to perfect our platform."
    },
    {
      year: "2024",
      title: "Growing Impact",
      description: "Now serving dozens of clients across Texas, with plans to expand to other states and serve law firms."
    },
    {
      year: "Future",
      title: "National Expansion",
      description: "Preparing to bring our platform to advocacy professionals nationwide, starting with key political centers."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Former Texas lobbyist with 10+ years experience in state government relations.",
      image: "👩‍💼"
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder", 
      bio: "Enterprise software architect with expertise in secure government systems.",
      image: "👨‍💻"
    },
    {
      name: "Jessica Rodriguez",
      role: "Head of Product",
      bio: "Former advocacy firm partner who understands client needs firsthand.",
      image: "👩‍💼"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary">
                  🏛️ Founded by Lobbyists
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                  Built by advocates, 
                  <span className="text-primary"> for advocates</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  M5 Solutions was created by former lobbyists who experienced firsthand the challenges of managing multiple clients, tracking complex legislation, and delivering professional reports in a secure, organized manner.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-gradient-primary">
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/features">
                  <Button variant="outline" size="lg">
                    See Our Solution
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border border-border shadow-medium">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground">Austin, Texas</span>
                  </div>
                  <p className="text-muted-foreground">
                    Headquartered in the heart of Texas politics, we're perfectly positioned to understand the needs of advocacy professionals.
                  </p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-2 gap-4">
                <Card className="border border-border">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">50+</div>
                    <div className="text-sm text-muted-foreground">Active Clients</div>
                  </CardContent>
                </Card>
                <Card className="border border-border">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">1000+</div>
                    <div className="text-sm text-muted-foreground">Bills Tracked</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Our mission
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              To empower advocacy professionals with the tools they need to serve their clients exceptionally while maintaining the highest standards of security and professionalism.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border border-border text-center hover:shadow-medium transition-all duration-300">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary mx-auto">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Our story
            </h2>
            <p className="text-xl text-muted-foreground">
              From idea to implementation, here's how M5 Solutions came to be.
            </p>
          </div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline">{item.year}</Badge>
                    <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Meet the team
            </h2>
            <p className="text-xl text-muted-foreground">
              Industry veterans who understand your challenges because they've lived them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border border-border text-center hover:shadow-medium transition-all duration-300">
                <CardContent className="p-8 space-y-4">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                The problem we solve
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground">
                  Before M5 Solutions, advocacy professionals struggled with:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-destructive mt-1">❌</span>
                    <span className="text-muted-foreground">Hours spent on manual client reporting</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-destructive mt-1">❌</span>
                    <span className="text-muted-foreground">Insecure document sharing methods</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-destructive mt-1">❌</span>
                    <span className="text-muted-foreground">Difficulty scaling to more clients</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-destructive mt-1">❌</span>
                    <span className="text-muted-foreground">Lack of professional client presentation</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">
                Our solution
              </h3>
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground">
                  M5 Solutions provides:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-primary mt-1">✅</span>
                    <span className="text-muted-foreground">Automated client reporting and tracking</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary mt-1">✅</span>
                    <span className="text-muted-foreground">Enterprise-grade security and compliance</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary mt-1">✅</span>
                    <span className="text-muted-foreground">Seamless scaling for any practice size</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary mt-1">✅</span>
                    <span className="text-muted-foreground">Professional, branded client experiences</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Ready to join the M5 Solutions family?
          </h2>
          <p className="text-xl opacity-90">
            Connect with our team to learn how we can help transform your advocacy practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;