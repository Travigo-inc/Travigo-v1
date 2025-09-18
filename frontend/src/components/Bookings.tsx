import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Hotel, 
  Plane, 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  Wifi, 
  Car,
  CheckCircle,
  ExternalLink,
  ArrowLeft,
  CreditCard,
  Shield
} from "lucide-react";
import { toast } from "sonner";

const Bookings = () => {
  const [searchParams] = useSearchParams();
  const tripId = searchParams.get("tripId");
  const [bookingData, setBookingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // Mock booking data - replace with actual API call
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        // TODO: Replace with actual API call to /api/bookings/:tripId
        const mockData = {
          tripId: tripId || "1",
          tripName: "European Grand Adventure",
          destination: "Paris, Rome, Barcelona",
          startDate: "2024-06-15",
          endDate: "2024-06-25",
          totalCost: 4500,
          accommodations: [
            {
              id: "hotel1",
              name: "Hotel des Grands Boulevards",
              city: "Paris",
              rating: 4.5,
              pricePerNight: 180,
              nights: 3,
              totalPrice: 540,
              checkIn: "2024-06-15",
              checkOut: "2024-06-18",
              amenities: ["WiFi", "Breakfast", "Gym", "Restaurant", "Spa"],
              image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
              bookingUrl: "https://booking.com/hotel-paris",
              cancellationPolicy: "Free cancellation until 24 hours before check-in",
              address: "4 Boulevard Poissonnière, 75009 Paris, France"
            },
            {
              id: "hotel2",
              name: "Hotel Artemide",
              city: "Rome",
              rating: 4.3,
              pricePerNight: 160,
              nights: 3,
              totalPrice: 480,
              checkIn: "2024-06-18",
              checkOut: "2024-06-21",
              amenities: ["WiFi", "Spa", "Restaurant", "Bar", "Concierge"],
              image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
              bookingUrl: "https://booking.com/hotel-rome",
              cancellationPolicy: "Free cancellation until 48 hours before check-in",
              address: "Via Nazionale 22, 00184 Rome, Italy"
            },
            {
              id: "hotel3",
              name: "Hotel Casa Fuster",
              city: "Barcelona",
              rating: 4.6,
              pricePerNight: 200,
              nights: 4,
              totalPrice: 800,
              checkIn: "2024-06-21",
              checkOut: "2024-06-25",
              amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Terrace", "Gym"],
              image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
              bookingUrl: "https://booking.com/hotel-barcelona",
              cancellationPolicy: "Free cancellation until 72 hours before check-in",
              address: "Passeig de Gràcia 132, 08008 Barcelona, Spain"
            }
          ],
          transportation: [
            {
              id: "flight1",
              type: "Flight",
              from: "Paris",
              to: "Rome",
              date: "2024-06-18",
              time: "08:00 - 10:30",
              airline: "Air France",
              flightNumber: "AF1204",
              price: 150,
              duration: "2h 30m",
              bookingUrl: "https://airfrance.com/booking",
              baggage: "1 carry-on + 1 checked bag included",
              aircraft: "Airbus A320"
            },
            {
              id: "flight2",
              type: "Flight",
              from: "Rome",
              to: "Barcelona",
              date: "2024-06-21",
              time: "14:00 - 16:15",
              airline: "Vueling",
              flightNumber: "VY6134",
              price: 120,
              duration: "2h 15m",
              bookingUrl: "https://vueling.com/booking",
              baggage: "1 carry-on included",
              aircraft: "Airbus A319"
            },
            {
              id: "transport1",
              type: "Airport Transfer",
              from: "Charles de Gaulle Airport",
              to: "Hotel des Grands Boulevards",
              date: "2024-06-15",
              time: "14:00",
              provider: "Paris Taxi",
              price: 35,
              duration: "45 minutes",
              bookingUrl: "https://paris-taxi.com/booking",
              vehicleType: "Standard Sedan",
              notes: "Meet at Terminal 2E Arrivals"
            }
          ]
        };
        
        setBookingData(mockData);
      } catch (error) {
        console.error("Failed to fetch booking data:", error);
        toast.error("Failed to load booking information");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [tripId]);

  const handleBookNow = (item: any, type: 'accommodation' | 'transport') => {
    setSelectedBooking({ ...item, type });
  };

  const confirmBooking = () => {
    // Mock booking confirmation
    toast.success("Booking confirmed!", {
      description: `Your ${selectedBooking.type} has been booked successfully.`
    });
    setSelectedBooking(null);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'spa': return <Shield className="h-4 w-4" />;
      case 'pool': return <Users className="h-4 w-4" />;
      case 'restaurant': return <MapPin className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading booking options...</p>
        </div>
      </div>
    );
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No booking data found</p>
          <Link to="/dashboard">
            <Button className="mt-4">Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/itinerary-result">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">{bookingData.tripName}</h1>
              <p className="text-muted-foreground">{bookingData.destination}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">${bookingData.totalCost}</div>
            <div className="text-sm text-muted-foreground">Total Trip Cost</div>
          </div>
        </div>

        {/* Trip Summary */}
        <Card className="travel-card mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center space-x-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">Duration</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(bookingData.startDate).toLocaleDateString()} - {new Date(bookingData.endDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Hotel className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">{bookingData.accommodations.length} Hotels</div>
                  <div className="text-sm text-muted-foreground">Across 3 cities</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Plane className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">{bookingData.transportation.length} Transfers</div>
                  <div className="text-sm text-muted-foreground">Flights & ground transport</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="accommodations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="accommodations">Hotels & Accommodations</TabsTrigger>
            <TabsTrigger value="transportation">Transportation</TabsTrigger>
          </TabsList>

          <TabsContent value="accommodations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {bookingData.accommodations.map((hotel: any) => (
                <Card key={hotel.id} className="travel-card group hover:shadow-travel transition-smooth">
                  <div className="aspect-video relative overflow-hidden rounded-t-xl">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-white/90 text-primary">
                        <Star className="h-3 w-3 mr-1" />
                        {hotel.rating}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-xl mb-1">{hotel.name}</h3>
                        <p className="text-muted-foreground flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {hotel.city}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">${hotel.pricePerNight}</div>
                        <div className="text-sm text-muted-foreground">per night</div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Check-in
                        </span>
                        <span className="font-semibold">{new Date(hotel.checkIn).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Check-out
                        </span>
                        <span className="font-semibold">{new Date(hotel.checkOut).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>{hotel.nights} nights</span>
                        <span className="font-bold text-primary">${hotel.totalPrice} total</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="text-sm font-medium">Amenities:</div>
                      <div className="flex flex-wrap gap-2">
                        {hotel.amenities.map((amenity: string, i: number) => (
                          <Badge key={i} variant="secondary" className="text-xs flex items-center">
                            {getAmenityIcon(amenity)}
                            <span className="ml-1">{amenity}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full travel-button"
                          onClick={() => handleBookNow(hotel, 'accommodation')}
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Book Now - ${hotel.totalPrice}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Confirm Booking</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="text-center">
                            <h3 className="font-bold text-lg">{hotel.name}</h3>
                            <p className="text-muted-foreground">{hotel.city}</p>
                            <div className="text-2xl font-bold text-primary mt-2">${hotel.totalPrice}</div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Check-in:</span>
                              <span>{new Date(hotel.checkIn).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Check-out:</span>
                              <span>{new Date(hotel.checkOut).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Nights:</span>
                              <span>{hotel.nights}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              className="flex-1"
                              onClick={() => window.open(hotel.bookingUrl, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Book External
                            </Button>
                            <Button 
                              className="flex-1 travel-button"
                              onClick={confirmBooking}
                            >
                              Confirm Booking
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transportation" className="space-y-6">
            <div className="space-y-4">
              {bookingData.transportation.map((transport: any) => (
                <Card key={transport.id} className="travel-card group hover:shadow-travel transition-smooth">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          {transport.type === "Flight" ? (
                            <Plane className="h-6 w-6 text-primary" />
                          ) : (
                            <Car className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-lg">{transport.from} → {transport.to}</h3>
                            <div className="text-right">
                              <div className="text-xl font-bold text-primary">${transport.price}</div>
                              <div className="text-sm text-muted-foreground">per person</div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <div className="flex items-center text-sm">
                                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                {new Date(transport.date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center text-sm">
                                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                {transport.time}
                              </div>
                            </div>
                            <div className="space-y-2">
                              {transport.airline && (
                                <div className="text-sm">
                                  <span className="font-medium">{transport.airline}</span>
                                  {transport.flightNumber && (
                                    <span className="text-muted-foreground ml-2">({transport.flightNumber})</span>
                                  )}
                                </div>
                              )}
                              {transport.provider && (
                                <div className="text-sm">
                                  <span className="font-medium">{transport.provider}</span>
                                </div>
                              )}
                              <div className="text-sm text-muted-foreground">
                                Duration: {transport.duration}
                              </div>
                            </div>
                          </div>

                          {(transport.baggage || transport.vehicleType || transport.aircraft) && (
                            <div className="text-sm text-muted-foreground mb-4">
                              {transport.baggage && <div>• {transport.baggage}</div>}
                              {transport.vehicleType && <div>• {transport.vehicleType}</div>}
                              {transport.aircraft && <div>• {transport.aircraft}</div>}
                              {transport.notes && <div>• {transport.notes}</div>}
                            </div>
                          )}

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                className="w-full travel-button"
                                onClick={() => handleBookNow(transport, 'transport')}
                              >
                                <CreditCard className="h-4 w-4 mr-2" />
                                Book {transport.type} - ${transport.price}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Confirm {transport.type} Booking</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="text-center">
                                  <h3 className="font-bold text-lg">{transport.from} → {transport.to}</h3>
                                  <p className="text-muted-foreground">{transport.airline || transport.provider}</p>
                                  <div className="text-2xl font-bold text-primary mt-2">${transport.price}</div>
                                </div>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span>Date:</span>
                                    <span>{new Date(transport.date).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Time:</span>
                                    <span>{transport.time}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Duration:</span>
                                    <span>{transport.duration}</span>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="outline" 
                                    className="flex-1"
                                    onClick={() => window.open(transport.bookingUrl, '_blank')}
                                  >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Book External
                                  </Button>
                                  <Button 
                                    className="flex-1 travel-button"
                                    onClick={confirmBooking}
                                  >
                                    Confirm Booking
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Summary & Actions */}
        <Card className="travel-card mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Ready to Book Your Trip?</h3>
                <p className="text-muted-foreground">
                  Secure your accommodations and transportation for the best prices.
                </p>
              </div>
              <div className="flex gap-3">
                <Link to="/itinerary-result">
                  <Button variant="outline">
                    Back to Itinerary
                  </Button>
                </Link>
                <Button className="travel-button">
                  <Shield className="h-4 w-4 mr-2" />
                  Book All Items
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Bookings;