import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Custom",
      description: "Perfect for solo practitioners and small advocacy firms",
      features: [
        "Up to 5 client portals",
        "Basic Notion integration",
        "Standard security features",
        "Email support",
        "30-day free trial"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      price: "Custom", 
      description: "Ideal for growing lobbying practices and mid-size firms",
      features: [
        "Up to 25 client portals",
        "Advanced Notion integration",
        "Premium security features",
        "Priority support",
        "Custom branding",
        "Advanced analytics",
        "API access"
      ],
      cta: "Contact Sales",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large advocacy firms and organizations",
      features: [
        "Unlimited client portals",
        "Full platform customization",
        "Enterprise security & compliance",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced reporting",
        "SSO & SAML",
        "SLA guarantee"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "Why don't you show exact pricing?",
      answer: "Every lobbying practice has unique needs. Our pricing is based on the number of clients, features required, and level of customization. Contact us for a personalized quote that fits your budget."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! We offer a 30-day free trial with full access to all features. No credit card required to get started."
    },
    {
      question: "Can I change plans later?",
      answer: "Absolutely. You can upgrade or downgrade your plan at any time. We'll work with you to ensure a smooth transition."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We provide email support for all plans, with priority support for Professional and Enterprise customers. Enterprise customers also get a dedicated account manager."
    },
    {
      question: "Do you offer annual discounts?",
      answer: "Yes, we offer significant discounts for annual subscriptions. Contact our sales team to learn about current promotions."
    },
    {
      question: "What about data migration?",
      answer: "We provide free data migration assistance for all new customers, including help with importing existing Notion databases and client information."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Transparent pricing for 
            <span className="text-primary"> every practice size</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            From solo practitioners to large advocacy firms, we have a plan that scales with your business. All plans include our core features with no hidden fees.
          </p>
          <div className="flex justify-center">
            <Badge variant="secondary" className="text-sm">
              💰 30-day free trial • No setup fees • Cancel anytime
            </Badge>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative border-2 transition-all duration-300 hover:shadow-large ${plan.popular ? 'border-primary shadow-glow' : 'border-border hover:border-primary/50'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center space-y-4 pb-8">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-primary">{plan.price}</div>
                    <p className="text-sm text-muted-foreground">Contact us for pricing</p>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact" className="block">
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-gradient-primary' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              More than just software
            </h2>
            <p className="text-xl text-muted-foreground">
              When you choose M5 Solutions, you're investing in your practice's growth and your clients' success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Save Time</h3>
              <p className="text-muted-foreground">
                Reduce client reporting time by 75% with automated tracking and organized dashboards.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Increase Revenue</h3>
              <p className="text-muted-foreground">
                Take on more clients without increasing overhead. Scale your practice efficiently.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Enhance Reputation</h3>
              <p className="text-muted-foreground">
                Impress clients with professional, secure portals that demonstrate your expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Frequently asked questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about our pricing and plans.
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="border border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex justify-center mb-6">
            <MessageCircle className="h-16 w-16" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Ready to discuss your needs?
          </h2>
          <p className="text-xl opacity-90">
            Our team is ready to create a custom solution that fits your practice perfectly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary">
                Get Custom Quote
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

export default Pricing;