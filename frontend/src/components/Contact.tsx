import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send,
  Headphones,
  Globe,
  Shield,
  Zap,
  CheckCircle,
  Badge
} from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@travigo.com",
      availability: "24/7 response within 2 hours"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our team",
      contact: "+1 (555) 123-TRIP",
      availability: "Mon-Fri, 9AM-6PM PST"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Instant messaging support",
      contact: "Available on website",
      availability: "24/7 AI + Human agents"
    },
    {
      icon: MapPin,
      title: "Office Location",
      description: "Visit our headquarters",
      contact: "123 Innovation Drive, San Francisco, CA 94105",
      availability: "Mon-Fri, 9AM-5PM PST"
    }
  ];

  const supportCategories = [
    "General Inquiry",
    "Technical Support",
    "Billing & Payments",
    "Trip Planning Help",
    "Account Issues",
    "Partnership Opportunities",
    "Press & Media",
    "Feature Request",
    "Bug Report"
  ];

  const faqs = [
    {
      question: "How does AI trip planning work?",
      answer: "Our AI analyzes your preferences, budget, and travel style to create personalized itineraries. It considers millions of data points including weather, local events, and user reviews."
    },
    {
      question: "Is my personal data secure?",
      answer: "Yes! We use blockchain technology and end-to-end encryption to protect your data. Your information is never shared without your explicit consent."
    },
    {
      question: "Can I modify AI-generated itineraries?",
      answer: "Absolutely! You can edit, add, or remove any part of your itinerary. Our AI will automatically adjust recommendations based on your changes."
    },
    {
      question: "Do you support group travel planning?",
      answer: "Yes! Our platform supports collaborative planning for groups of any size, with shared itineraries and group booking features."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and cryptocurrency payments. All transactions are secured with blockchain verification."
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success("Message sent successfully!", {
      description: "We'll get back to you within 24 hours."
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      category: "",
      message: "",
    });

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Have questions? Need help planning your trip? Our team of travel experts 
              and AI specialists are here to assist you.
            </p>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <Card 
                key={index} 
                className="travel-card group hover:shadow-travel hover:scale-105 transition-smooth animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-smooth">
                    <method.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{method.description}</p>
                  <p className="font-medium text-primary mb-2">{method.contact}</p>
                  <p className="text-xs text-muted-foreground">{method.availability}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form & Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="travel-card shadow-travel">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Send className="h-5 w-5 mr-2 text-primary" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="travel-input"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="travel-input"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number (Optional)</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="travel-input"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleSelectChange("category", value)}
                        >
                          <SelectTrigger className="travel-input">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {supportCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="travel-input"
                        placeholder="How can we help you?"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="travel-input min-h-[120px]"
                        placeholder="Tell us more about your inquiry..."
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full travel-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Zap className="h-4 w-4 mr-2 animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Support Info & FAQs */}
            <div className="space-y-6">
              {/* Support Hours */}
              <Card className="travel-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    Support Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI Support</span>
                    <Badge className="bg-green-500/10 text-green-700">24/7</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Human Support</span>
                    <span className="text-sm text-muted-foreground">9AM-6PM PST</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Emergency Line</span>
                    <Badge className="bg-red-500/10 text-red-700">24/7</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Quick FAQs */}
              <Card className="travel-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Headphones className="h-5 w-5 mr-2 text-primary" />
                    Quick Answers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faqs.slice(0, 3).map((faq, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-semibold text-sm">{faq.question}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                      {index < 2 && <div className="border-b border-border/50 pt-2"></div>}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="travel-card border-red-200 bg-red-50/50 dark:bg-red-950/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700 dark:text-red-400">
                    <Shield className="h-5 w-5 mr-2" />
                    Emergency Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-600 dark:text-red-400 mb-3">
                    For urgent travel emergencies while you're on your trip:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-red-600" />
                      <span className="font-semibold text-red-700 dark:text-red-400">
                        +1 (555) 911-HELP
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-red-600" />
                      <span className="font-semibold text-red-700 dark:text-red-400">
                        emergency@travigo.com
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find quick answers to common questions about Travigo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <Card 
                key={index} 
                className="travel-card group hover:shadow-travel transition-smooth animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Locations
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Visit us at our offices around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                city: "San Francisco",
                country: "USA",
                address: "123 Innovation Drive\nSan Francisco, CA 94105",
                phone: "+1 (555) 123-TRIP",
                email: "sf@travigo.com"
              },
              {
                city: "London",
                country: "UK", 
                address: "45 Tech Square\nLondon, EC2A 4DN",
                phone: "+44 20 7123 4567",
                email: "london@travigo.com"
              },
              {
                city: "Singapore",
                country: "Singapore",
                address: "88 Marina Bay\nSingapore 018956",
                phone: "+65 6123 4567",
                email: "singapore@travigo.com"
              }
            ].map((office, index) => (
              <Card 
                key={index} 
                className="travel-card group hover:shadow-travel hover:scale-105 transition-smooth animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-smooth">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{office.city}</h3>
                  <p className="text-muted-foreground mb-4">{office.country}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start justify-center">
                      <MapPin className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="whitespace-pre-line">{office.address}</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Phone className="h-4 w-4 text-primary mr-2" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Mail className="h-4 w-4 text-primary mr-2" />
                      <span>{office.email}</span>
                    </div>
                  </div>
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
              Ready to Start Planning?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Don't wait! Start creating your perfect trip with AI assistance today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 h-auto text-lg shadow-glow hover:shadow-travel"
                asChild
              >
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/30 text-red hover:bg-white/60 hover:text-black font-semibold px-8 py-4 h-auto text-lg backdrop-blur-sm"
                asChild
              >
                <Link to="/features">View Features</Link>
              </Button>
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

export default Contact;