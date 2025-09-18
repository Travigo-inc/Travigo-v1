import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Users, 
  Target, 
  Award, 
  Globe, 
  Heart,
  Lightbulb,
  Shield,
  Zap,
  TrendingUp,
  MapPin,
  User,
  Linkedin,
  Twitter,
  Mail
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We leverage cutting-edge AI and blockchain technology to revolutionize how people plan and experience travel."
    },
    {
      icon: Heart,
      title: "Traveler-Centric",
      description: "Every feature we build is designed with the traveler's needs, safety, and experience at the forefront."
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Your data, documents, and transactions are protected with the highest levels of security and privacy."
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "We believe amazing travel experiences should be accessible to everyone, everywhere in the world."
    }
  ];

  const stats = [
    { number: "100K+", label: "Happy Travelers", icon: Users },
    { number: "50+", label: "Countries Covered", icon: Globe },
    { number: "1M+", label: "Trips Planned", icon: MapPin },
    { number: "99.9%", label: "Uptime", icon: TrendingUp }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former Google AI researcher with 10+ years in machine learning and travel tech.",
      image: "",
      social: { linkedin: "#", twitter: "#", email: "sarah@travigo.com" }
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder", 
      bio: "Ex-Airbnb engineer specializing in scalable systems and blockchain technology.",
      image: "",
      social: { linkedin: "#", twitter: "#", email: "michael@travigo.com" }
    },
    {
      name: "Emma Thompson",
      role: "Head of Product",
      bio: "Travel industry veteran with 15+ years at Expedia and Booking.com.",
      image: "",
      social: { linkedin: "#", twitter: "#", email: "emma@travigo.com" }
    },
    {
      name: "David Kim",
      role: "Head of AI",
      bio: "PhD in Computer Science, former researcher at OpenAI and Microsoft Research.",
      image: "",
      social: { linkedin: "#", twitter: "#", email: "david@travigo.com" }
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "Company Founded",
      description: "Started with a vision to democratize travel planning using AI"
    },
    {
      year: "2024",
      title: "AI Engine Launch",
      description: "Released our first AI-powered itinerary generation system"
    },
    {
      year: "2024",
      title: "Blockchain Integration",
      description: "Implemented secure document storage and transaction verification"
    },
    {
      year: "2024",
      title: "100K Users",
      description: "Reached our first major milestone of happy travelers"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Revolutionizing Travel
              <br />
              <span className="text-white/90">One Trip at a Time</span>
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              We're on a mission to make travel planning effortless, personalized, and secure 
              for every explorer around the globe.
            </p>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Mission
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                To democratize travel by making personalized, intelligent trip planning accessible to everyone. 
                We believe that technology should enhance human experiences, not complicate them.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Through AI-powered recommendations, blockchain security, and real-time intelligence, 
                we're building the future of travel planning today.
              </p>
            </div>
            <div className="animate-slide-up">
              <Card className="travel-card shadow-travel">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Target className="h-16 w-16 text-primary mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A world where every traveler can discover, plan, and experience 
                      their perfect journey with confidence, security, and joy.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Values
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do at Travigo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="travel-card group hover:shadow-travel hover:scale-105 transition-smooth animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-smooth">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Trusted by Travelers{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Worldwide
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-in" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Team
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate travelers and technologists working to transform your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card 
                key={index} 
                className="travel-card group hover:shadow-travel hover:scale-105 transition-smooth animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-smooth">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{member.bio}</p>
                  
                  <div className="flex justify-center space-x-3">
                    <Button variant="ghost" size="icon" className="hover:text-primary">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:text-primary">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:text-primary">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From startup to the leading AI travel platform.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20"></div>
              
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className="relative flex items-start mb-12 animate-slide-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-travel relative z-10">
                    {milestone.year.slice(-2)}
                  </div>
                  <div className="ml-8 flex-1">
                    <Card className="travel-card">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold">{milestone.title}</h3>
                          <Badge variant="secondary">{milestone.year}</Badge>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Be part of the travel revolution. Start planning your next adventure with AI today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 h-auto text-lg shadow-glow hover:shadow-travel"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 h-auto text-lg backdrop-blur-sm"
                >
                  Contact Us
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

export default About;