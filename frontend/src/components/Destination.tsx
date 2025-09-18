import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { 
  Star, 
  MapPin, 
  Clock, 
  DollarSign, 
  Wifi, 
  Car, 
  Plane,
  Camera,
  Mountain,
  Building,
  Utensils,
  Calendar,
  Users,
  Globe,
} from "lucide-react";
import axios from "axios";

// Mock data for fallback
const mockDestinations = [
  {
    city: {
      id: "C1",
      name: "Goa",
      state: "Goa",
      country: "India",
      coordinates: { lat: 15.2993, lon: 74.1240 },
      description: { 
        en: "Goa, India's smallest state, is famous for its golden beaches, Portuguese heritage, vibrant nightlife, and laid-back tropical vibe. A unique blend of Indian and Western cultures, Goa offers everything from world heritage churches and ancient forts to water sports, flea markets, and mouthwatering seafood."
      },
      pois: [
        { 
          id: "GO1", 
          name: { en: "Baga Beach" }, 
          category: "Leisure", 
          subcategory: "Beach",
          description: { en: "One of the most popular beaches in Goa, famous for water sports, nightlife, beach shacks, and vibrant parties." }, 
          rating: 4.5, 
          estimated_duration_minutes: 180,
          cost: [{ amount: 0, currency: "INR", type: "entry_fee" }, { amount: 500, currency: "INR", type: "activity_cost" }]
        },
        { 
          id: "GO2", 
          name: { en: "Basilica of Bom Jesus" }, 
          category: "Historical", 
          subcategory: "Church",
          description: { en: "A UNESCO World Heritage Site built in 1605, housing the remains of St. Francis Xavier and showcasing baroque architecture." }, 
          rating: 4.7, 
          estimated_duration_minutes: 90,
          cost: [{ amount: 0, currency: "INR", type: "entry_fee" }]
        },
        { 
          id: "GO3", 
          name: { en: "Fort Aguada" }, 
          category: "Historical", 
          subcategory: "Fort",
          description: { en: "A 17th-century Portuguese fort overlooking the Arabian Sea, popular for its lighthouse and panoramic views." }, 
          rating: 4.4, 
          estimated_duration_minutes: 300,
          cost: [{ amount: 40, currency: "INR", type: "entry_fee" }]
        }
      ],
      accommodations: [
        { 
          id: "GH1", 
          name: { en: "Taj Exotica Resort & Spa" }, 
          rating: 4.8, 
          cost_per_night: 18000, 
          category: "luxury",
          amenities: ["wifi", "spa", "pool", "beach_access", "restaurant"],
          type: "5-star"
        },
        { 
          id: "GH2", 
          name: { en: "Cidade de Goa" }, 
          rating: 4.5, 
          cost_per_night: 7500, 
          category: "budget",
          amenities: ["wifi", "pool", "restaurant", "spa"],
          type: "4-star"
        }
      ],
      transport: {
        scooter_rental: { per_day: 300, currency: "INR" },
        car_rental: { average_fare: 3500, currency: "INR" },
        bike_rental: { per_day: 400, currency: "INR" }
      }
    }
  },
  {
    city: {
      id: "C2",
      name: "Pondicherry",
      state: "Puducherry",
      country: "India",
      coordinates: { lat: 11.9416, lon: 79.8083 },
      description: { 
        en: "Pondicherry, often called the 'French Riviera of the East,' is known for its colonial architecture, serene beaches, spiritual aura, and vibrant French-Indian cultural blend."
      },
      pois: [
        { 
          id: "PO1", 
          name: { en: "Promenade Beach" }, 
          category: "Leisure", 
          subcategory: "Beach",
          description: { en: "A rocky beachfront perfect for evening walks, sunrise views, and street food experiences." }, 
          rating: 4.5, 
          estimated_duration_minutes: 420,
          cost: [{ amount: 0, currency: "INR", type: "entry_fee" }, { amount: 200, currency: "INR", type: "activity_cost" }]
        },
        { 
          id: "PO2", 
          name: { en: "Auroville" }, 
          category: "Spiritual", 
          subcategory: "Township",
          description: { en: "An experimental township promoting human unity, featuring the famous Matrimandir meditation center." }, 
          rating: 4.7, 
          estimated_duration_minutes: 180,
          cost: [{ amount: 0, currency: "INR", type: "entry_fee" }, { amount: 100, currency: "INR", type: "activity_cost" }]
        }
      ],
      accommodations: [
        { 
          id: "POH1", 
          name: { en: "La Villa" }, 
          rating: 4.8, 
          cost_per_night: 12000, 
          category: "luxury",
          amenities: ["wifi", "restaurant", "pool", "spa", "parking"],
          type: "5-star"
        }
      ],
      transport: {
        scooter_rental: { per_day: 300, currency: "INR" },
        car_rental: { average_fare: 3500, currency: "INR" }
      }
    }
  },
  {
    city: {
      id: "C3",
      name: "Shimla",
      state: "Himachal Pradesh",
      country: "India",
      coordinates: { lat: 31.1048, lon: 77.1734 },
      description: { 
        en: "Shimla, the capital of Himachal Pradesh, is a popular hill station known for its colonial architecture and scenic landscapes."
      },
      pois: [
        { 
          id: "SH1", 
          name: { en: "Mall Road" }, 
          category: "Leisure", 
          subcategory: "Promenade",
          description: { en: "The bustling heart of Shimla, Mall Road is lined with shops, cafes, and colonial-era buildings." }, 
          rating: 4.5, 
          estimated_duration_minutes: 120,
          cost: [{ amount: 0, currency: "INR", type: "entry_fee" }]
        },
        { 
          id: "SH2", 
          name: { en: "The Ridge" }, 
          category: "Sightseeing", 
          subcategory: "Landmark",
          description: { en: "An open space offering panoramic views of the mountains. Venue for cultural events and festivals." }, 
          rating: 4.4, 
          estimated_duration_minutes: 120,
          cost: [{ amount: 0, currency: "INR", type: "entry_fee" }]
        }
      ],
      accommodations: [
        { 
          id: "SHH1", 
          name: { en: "Snow View Hotel" }, 
          rating: 4.0, 
          cost_per_night: 1800, 
          category: "budget",
          amenities: ["wifi", "breakfast", "parking"],
          type: "3-star"
        }
      ],
      transport: {
        scooter_rental: { per_day: 300, currency: "INR" },
        car_rental: { average_fare: 3500, currency: "INR" }
      }
    }
  },
  {
    city: {
      id: "C3",
      name: "Shimla",
      state: "Himachal Pradesh",
      country: "India",
      coordinates: { lat: 31.1048, lon: 77.1734 },
      description: { 
        en: "Shimla, the capital of Himachal Pradesh, is a popular hill station known for its colonial architecture and scenic landscapes."
      },
      pois: [
        { 
          id: "SH1", 
          name: { en: "Mall Road" }, 
          category: "Leisure", 
          subcategory: "Promenade",
          description: { en: "The bustling heart of Shimla, Mall Road is lined with shops, cafes, and colonial-era buildings." }, 
          rating: 4.5, 
          estimated_duration_minutes: 120,
          cost: [{ amount: 0, currency: "INR", type: "entry_fee" }]
        },
        { 
          id: "SH2", 
          name: { en: "The Ridge" }, 
          category: "Sightseeing", 
          subcategory: "Landmark",
          description: { en: "An open space offering panoramic views of the mountains. Venue for cultural events and festivals." }, 
          rating: 4.4, 
          estimated_duration_minutes: 120,
          cost: [{ amount: 0, currency: "INR", type: "entry_fee" }]
        }
      ],
      accommodations: [
        { 
          id: "SHH1", 
          name: { en: "Snow View Hotel" }, 
          rating: 4.0, 
          cost_per_night: 1800, 
          category: "budget",
          amenities: ["wifi", "breakfast", "parking"],
          type: "3-star"
        }
      ],
      transport: {
        scooter_rental: { per_day: 300, currency: "INR" },
        car_rental: { average_fare: 3500, currency: "INR" }
      }
    }
  },
  {
    city: {
      id: "C3",
      name: "Shimla",
      state: "Himachal Pradesh",
      country: "India",
      coordinates: { lat: 31.1048, lon: 77.1734 },
      description: { 
        en: "Shimla, the capital of Himachal Pradesh, is a popular hill station known for its colonial architecture and scenic landscapes."
      },
      pois: [
        { 
          id: "SH1", 
          name: { en: "Mall Road" }, 
          category: "Leisure", 
          subcategory: "Promenade",
          description: { en: "The bustling heart of Shimla, Mall Road is lined with shops, cafes, and colonial-era buildings." }, 
          rating: 4.5, 
          estimated_duration_minutes: 120,
          cost: [{ amount: 0, currency: "INR", type: "entry_fee" }]
        },
        { 
          id: "SH2", 
          name: { en: "The Ridge" }, 
          category: "Sightseeing", 
          subcategory: "Landmark",
          description: { en: "An open space offering panoramic views of the mountains. Venue for cultural events and festivals." }, 
          rating: 4.4, 
          estimated_duration_minutes: 120,
          cost: [{ amount: 0, currency: "INR", type: "entry_fee" }]
        }
      ],
      accommodations: [
        { 
          id: "SHH1", 
          name: { en: "Snow View Hotel" }, 
          rating: 4.0, 
          cost_per_night: 1800, 
          category: "budget",
          amenities: ["wifi", "breakfast", "parking"],
          type: "3-star"
        }
      ],
      transport: {
        scooter_rental: { per_day: 300, currency: "INR" },
        car_rental: { average_fare: 3500, currency: "INR" }
      }
    }
  },

];

const Destination = () => {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState<any>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        // Try to fetch from backend
        const response = await axios.get("http://localhost:8000/api/destinations");
        if (response.data?.data?.destinations) {
          setDestinations(response.data.data.destinations);
        } else {
          throw new Error("No destinations data");
        }
      } catch (error) {
        console.warn("Failed to fetch from backend, using mock data:", error);
        setDestinations(mockDestinations);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'leisure': return <Camera className="h-4 w-4" />;
      case 'historical': return <Building className="h-4 w-4" />;
      case 'nature': return <Mountain className="h-4 w-4" />;
      case 'spiritual': return <Globe className="h-4 w-4" />;
      case 'sightseeing': return <MapPin className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'leisure': return 'bg-blue-500/10 text-blue-700';
      case 'historical': return 'bg-amber-500/10 text-amber-700';
      case 'nature': return 'bg-green-500/10 text-green-700';
      case 'spiritual': return 'bg-purple-500/10 text-purple-700';
      case 'sightseeing': return 'bg-pink-500/10 text-pink-700';
      default: return 'bg-gray-500/10 text-gray-700';
    }
  };

  const getAccommodationColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'luxury': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'mid-range': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'budget': return 'bg-green-500/10 text-green-700 border-green-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading amazing destinations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Explore Amazing
              <br />
              <span className="text-white/90">Destinations</span>
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Discover handpicked destinations with AI-powered recommendations, 
              local insights, and personalized itineraries.
            </p>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Destinations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div key={destination.city.id} className="space-y-6">
              {/* Destination Header Card */}
              <Card 
                className="travel-card group hover:shadow-travel hover:scale-105 transition-smooth cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedDestination(selectedDestination?.city.id === destination.city.id ? null : destination)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold text-primary">
                        {destination.city.name}
                      </CardTitle>
                      <p className="text-muted-foreground">
                        {destination.city.state}, {destination.city.country}
                      </p>
                    </div>
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {destination.city.description.en}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-muted-foreground">
                      <Camera className="h-4 w-4 mr-1" />
                      {destination.city.pois?.length || 0} attractions
                    </span>
                    <span className="flex items-center text-muted-foreground">
                      <Building className="h-4 w-4 mr-1" />
                      {destination.city.accommodations?.length || 0} hotels
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Expanded Details */}
              {selectedDestination?.city.id === destination.city.id && (
                <div className="space-y-6 animate-fade-in">
                  <Tabs defaultValue="attractions" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="attractions">Attractions</TabsTrigger>
                      <TabsTrigger value="hotels">Hotels</TabsTrigger>
                      <TabsTrigger value="transport">Transport</TabsTrigger>
                    </TabsList>

                    <TabsContent value="attractions" className="space-y-4">
                      {destination.city.pois?.map((poi: any) => (
                        <Card key={poi.id} className="travel-card">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-start space-x-3">
                                <div className={`p-2 rounded-lg ${getCategoryColor(poi.category)}`}>
                                  {getCategoryIcon(poi.category)}
                                </div>
                                <div>
                                  <h3 className="font-bold text-lg">{poi.name.en}</h3>
                                  <p className="text-sm text-muted-foreground">{poi.subcategory}</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                <span className="font-semibold">{poi.rating}</span>
                              </div>
                            </div>

                            <p className="text-muted-foreground mb-4 leading-relaxed">
                              {poi.description.en}
                            </p>

                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center text-muted-foreground">
                                <Clock className="h-4 w-4 mr-1" />
                                {Math.floor(poi.estimated_duration_minutes / 60)}h {poi.estimated_duration_minutes % 60}m
                              </div>
                              <div className="flex items-center text-primary font-semibold">
                                <DollarSign className="h-4 w-4 mr-1" />
                                {poi.cost?.find((c: any) => c.type === 'entry_fee')?.amount === 0 ? 'Free' : 
                                 `₹${poi.cost?.reduce((sum: number, c: any) => sum + c.amount, 0) || 0}`}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="hotels" className="space-y-4">
                      {destination.city.accommodations?.map((hotel: any) => (
                        <Card key={hotel.id} className="travel-card">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-bold text-lg">{hotel.name.en}</h3>
                                <p className="text-sm text-muted-foreground">{hotel.type}</p>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center mb-1">
                                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                  <span className="font-semibold">{hotel.rating}</span>
                                </div>
                                <Badge className={getAccommodationColor(hotel.category)}>
                                  {hotel.category}
                                </Badge>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                              <div className="text-2xl font-bold text-primary">
                                ₹{hotel.cost_per_night.toLocaleString()}
                              </div>
                              <div className="text-sm text-muted-foreground">per night</div>
                            </div>

                            <div className="space-y-2">
                              <div className="text-sm font-medium">Amenities:</div>
                              <div className="flex flex-wrap gap-1">
                                {hotel.amenities?.map((amenity: string, i: number) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="transport" className="space-y-4">
                      {Object.entries(destination.city.transport || {}).map(([type, details]: [string, any]) => (
                        <Card key={type} className="travel-card">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                  {type.includes('car') ? <Car className="h-5 w-5 text-primary" /> :
                                   type.includes('flight') ? <Plane className="h-5 w-5 text-primary" /> :
                                   <Car className="h-5 w-5 text-primary" />}
                                </div>
                                <div>
                                  <h4 className="font-semibold capitalize">
                                    {type.replace(/_/g, ' ')}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {details.per_day ? 'Per day rental' : 'Average fare'}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-primary text-lg">
                                  ₹{(details.per_day || details.average_fare).toLocaleString()}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {details.currency}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <section className="py-20 mt-16">
          <Card className="travel-card bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Plan Your{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Perfect Trip?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let our AI create a personalized itinerary for any of these amazing destinations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="travel-button">
                  <Plane className="h-5 w-5 mr-2" />
                  <Link to="/create-itinerary">Start Planning</Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Users className="h-5 w-5 mr-2" />
                  View All Destinations
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};
export default Destination;