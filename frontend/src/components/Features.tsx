import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Shield, 
  Globe, 
  Zap,
  Brain,
  Clock,
  DollarSign,
  Users,
  Camera,
  Navigation,
  Smartphone,
  Cloud,
  Lock,
  TrendingUp,
  Heart,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const Features = () => {
  const mainFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Trip Planning",
      description: "Our advanced AI analyzes millions of data points to create personalized itineraries that match your unique preferences, budget, and travel style.",
      benefits: ["Personalized recommendations", "Budget optimization", "Real-time adjustments", "Learning from preferences"],
      highlight: "Save 10+ hours of planning time"
    },
    {
      icon: MapPin,
      title: "Smart Route Optimization",
      description: "Get the most efficient routes between destinations with our intelligent routing system that considers traffic, weather, and local events.",
      benefits: ["Optimal travel routes", "Time-saving paths", "Cost-effective journeys", "Real-time traffic updates"],
      highlight: "Reduce travel time by 30%"
    },
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Your travel documents and personal data are secured using blockchain technology, ensuring privacy and tamper-proof storage.",
      benefits: ["Encrypted data storage", "Immutable records", "Secure transactions", "Privacy protection"],
      highlight: "Bank-level security"
    },
    {
      icon: Globe,
      title: "Real-time Travel Intelligence",
      description: "Stay informed with live updates on weather, safety alerts, flight changes, and local events that might affect your trip.",
      benefits: ["Weather monitoring", "Safety alerts", "Flight tracking", "Local event updates"],
      highlight: "24/7 monitoring"
    }
  ];

  const additionalFeatures = [
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Easily adjust dates and activities with automatic itinerary updates."
    },
    {
      icon: DollarSign,
      title: "Budget Management",
      description: "Track expenses and get cost-saving recommendations in real-time."
    },
    {
      icon: Users,
      title: "Group Travel Planning",
      description: "Coordinate trips with friends and family using collaborative tools."
    },
    {
      icon: Camera,
      title: "Photo Integration",
      description: "Discover Instagram-worthy spots and plan photo opportunities."
    },
    {
      icon: Smartphone,
      title: "Mobile Companion",
      description: "Access your itinerary offline with our mobile-optimized platform."
    },
    {
      icon: Cloud,
      title: "Cloud Sync",
      description: "Your travel plans sync across all devices automatically."
    },
    {
      icon: Navigation,
      title: "GPS Navigation",
      description: "Turn-by-turn directions integrated with your itinerary."
    },
    {
      icon: Lock,
      title: "Secure Booking",
      description: "Book flights, hotels, and activities with encrypted transactions."
    },
    {
      icon: TrendingUp,
      title: "Price Tracking",
      description: "Monitor price changes and get alerts for the best deals."
    }
  ];

  const pricingPlans = [
    {
      name: "Explorer",
      price: "Free",
      description: "Perfect for occasional travelers",
      features: [
        "3 AI-generated itineraries per month",
        "Basic route optimization",
        "Weather alerts",
        "Mobile access",
        "Community support"
      ],
      popular: false
    },
    {
      name: "Adventurer",
      price: "$9.99/month",
      description: "For frequent travelers",
      features: [
        "Unlimited AI itineraries",
        "Advanced route optimization",
        "Real-time travel alerts",
        "Group planning tools",
        "Priority support",
        "Offline access",
        "Price tracking"
      ],
      popular: true
    },
    {
      name: "Explorer Pro",
      price: "$19.99/month",
      description: "For travel professionals",
      features: [
        "Everything in Adventurer",
        "Blockchain document storage",
        "Advanced analytics",
        "Custom branding",
        "API access",
        "Dedicated support",
        "White-label options"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Powerful Features for
              <br />
              <span className="text-white/90">Modern Travelers</span>
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Discover how Travigo's cutting-edge technology transforms the way you plan, 
              book, and experience your travels.
            </p>
            <Link to="/signup">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 h-auto text-lg shadow-glow hover:shadow-travel"
              >
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Core Features That Make Us{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Different
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the next generation of travel planning with features designed for the modern explorer.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="travel-card group hover:shadow-travel hover:scale-105 transition-smooth animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-smooth flex-shrink-0">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {feature.highlight}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {feature.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Everything You Need for{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Perfect Trips
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From planning to booking to traveling, we've got every aspect covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="travel-card group hover:shadow-travel hover:scale-105 transition-smooth animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-smooth">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Adventure Plan
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start free and upgrade as your travel needs grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={cn(
                  "travel-card relative transition-smooth animate-slide-up",
                  plan.popular 
                    ? "ring-2 ring-primary shadow-travel scale-105" 
                    : "hover:shadow-travel hover:scale-105"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-primary mb-2">{plan.price}</div>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                  
                  <ul className="space-y-3 mb-8 text-left">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/signup">
                    <Button 
                      className={cn(
                        "w-full",
                        plan.popular ? "travel-button" : "travel-button bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      )}
                    >
                      {plan.price === "Free" ? "Get Started" : "Start Free Trial"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience the Future of Travel?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join thousands of travelers who've discovered the power of AI-driven trip planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 h-auto text-lg shadow-glow hover:shadow-travel"
                >
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 h-auto text-lg backdrop-blur-sm"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      </section>
    </div>
  );
};

export default Features;