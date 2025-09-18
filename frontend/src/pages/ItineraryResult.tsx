import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  Plane, 
  Hotel, 
  Camera,
  Edit,
  Save,
  Download,
  Share,
  Star,
  Navigation,
  Utensils
} from "lucide-react";

const ItineraryResult = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Mock generated itinerary data
  const itinerary = {
    tripName: "European Grand Adventure",
    destination: "Paris, Rome, Barcelona",
    duration: 10,
    travelers: 2,
    totalBudget: 4500,
    startDate: "2024-06-15",
    endDate: "2024-06-25",
    
    summary: {
      flights: 1200,
      accommodation: 1800,
      activities: 800,
      meals: 500,
      transport: 200
    },

    dailyItinerary: [
      {
        day: 1,
        date: "2024-06-15",
        city: "Paris",
        title: "Arrival & Paris Introduction",
        activities: [
          { time: "14:00", type: "arrival", title: "Arrive at Charles de Gaulle Airport", duration: "2h", cost: 0 },
          { time: "16:00", type: "transport", title: "Airport transfer to hotel", duration: "1h", cost: 35 },
          { time: "18:00", type: "accommodation", title: "Check-in at Hotel des Grands Boulevards", duration: "30min", cost: 0 },
          { time: "19:30", type: "dining", title: "Welcome dinner at Le Comptoir Relais", duration: "2h", cost: 85 }
        ]
      },
      {
        day: 2,
        date: "2024-06-16", 
        city: "Paris",
        title: "Paris Highlights",
        activities: [
          { time: "09:00", type: "sightseeing", title: "Visit Eiffel Tower", duration: "2h", cost: 25 },
          { time: "11:30", type: "sightseeing", title: "Seine River Cruise", duration: "1h", cost: 15 },
          { time: "14:00", type: "dining", title: "Lunch at Café de Flore", duration: "1.5h", cost: 45 },
          { time: "16:00", type: "sightseeing", title: "Louvre Museum", duration: "3h", cost: 17 },
          { time: "20:00", type: "dining", title: "Dinner in Montmartre", duration: "2h", cost: 65 }
        ]
      },
      {
        day: 3,
        date: "2024-06-17",
        city: "Rome",
        title: "Travel to Rome",
        activities: [
          { time: "08:00", type: "transport", title: "Flight Paris to Rome", duration: "2h", cost: 150 },
          { time: "13:00", type: "accommodation", title: "Check-in at Hotel Artemide", duration: "30min", cost: 0 },
          { time: "15:00", type: "sightseeing", title: "Colosseum & Roman Forum", duration: "3h", cost: 35 },
          { time: "19:00", type: "dining", title: "Traditional Roman dinner", duration: "2h", cost: 55 }
        ]
      }
    ],

    accommodations: [
      {
        city: "Paris",
        name: "Hotel des Grands Boulevards",
        rating: 4.5,
        pricePerNight: 180,
        nights: 3,
        amenities: ["WiFi", "Breakfast", "Gym", "Restaurant"]
      },
      {
        city: "Rome", 
        name: "Hotel Artemide",
        rating: 4.3,
        pricePerNight: 160,
        nights: 3,
        amenities: ["WiFi", "Spa", "Restaurant", "Bar"]
      },
      {
        city: "Barcelona",
        name: "Hotel Casa Fuster",
        rating: 4.6,
        pricePerNight: 200,
        nights: 4,
        amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Terrace"]
      }
    ],

    transportation: [
      { from: "Airport", to: "Paris Hotel", type: "Taxi", cost: 35 },
      { from: "Paris", to: "Rome", type: "Flight", cost: 150 },
      { from: "Rome", to: "Barcelona", type: "Flight", cost: 120 },
      { from: "Barcelona", to: "Airport", type: "Train", cost: 45 }
    ]
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "arrival": case "transport": return <Plane className="h-4 w-4" />;
      case "accommodation": return <Hotel className="h-4 w-4" />;
      case "sightseeing": return <Camera className="h-4 w-4" />;
      case "dining": return <Utensils className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "arrival": case "transport": return "bg-blue-500/10 text-blue-700";
      case "accommodation": return "bg-purple-500/10 text-purple-700";
      case "sightseeing": return "bg-green-500/10 text-green-700";
      case "dining": return "bg-orange-500/10 text-orange-700";
      default: return "bg-gray-500/10 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Star className="h-8 w-8 text-yellow-500 mr-3" />
              {itinerary.tripName}
            </h1>
            <p className="text-muted-foreground">{itinerary.destination} • {itinerary.duration} days</p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Button variant="outline">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              className={isEditing ? "bg-green-600 hover:bg-green-700" : "travel-button"}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Customize
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Budget Overview */}
        <Card className="travel-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-primary" />
              Budget Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">${itinerary.summary.flights}</div>
                <div className="text-sm text-muted-foreground">Flights</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">${itinerary.summary.accommodation}</div>
                <div className="text-sm text-muted-foreground">Hotels</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">${itinerary.summary.activities}</div>
                <div className="text-sm text-muted-foreground">Activities</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">${itinerary.summary.meals}</div>
                <div className="text-sm text-muted-foreground">Meals</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">${itinerary.summary.transport}</div>
                <div className="text-sm text-muted-foreground">Transport</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border text-center">
              <div className="text-3xl font-bold text-primary">
                ${itinerary.totalBudget}
              </div>
              <div className="text-muted-foreground">Total Trip Cost</div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="itinerary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="itinerary">Daily Itinerary</TabsTrigger>
            <TabsTrigger value="accommodations">Hotels</TabsTrigger>
            <TabsTrigger value="transportation">Transportation</TabsTrigger>
          </TabsList>

          <TabsContent value="itinerary" className="space-y-6">
            {itinerary.dailyItinerary.map((day) => (
              <Card key={day.day} className="travel-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {day.day}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{day.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(day.date).toLocaleDateString()} • {day.city}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">{day.city}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {day.activities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border border-border/50 hover:bg-accent/30 transition-smooth">
                        <div className="flex items-center space-x-3">
                          <div className="text-sm font-mono text-muted-foreground min-w-[50px]">
                            {activity.time}
                          </div>
                          <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                            {getActivityIcon(activity.type)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{activity.title}</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {activity.duration}
                            {activity.cost > 0 && (
                              <>
                                <span className="mx-2">•</span>
                                <DollarSign className="h-3 w-3 mr-1" />
                                ${activity.cost}
                              </>
                            )}
                          </div>
                        </div>
                        {isEditing && (
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="accommodations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itinerary.accommodations.map((hotel, index) => (
                <Card key={index} className="travel-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{hotel.name}</h3>
                        <p className="text-muted-foreground">{hotel.city}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-semibold">{hotel.rating}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Price per night:</span>
                        <span className="font-semibold">${hotel.pricePerNight}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Nights:</span>
                        <span className="font-semibold">{hotel.nights}</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold text-primary pt-2 border-t">
                        <span>Total:</span>
                        <span>${hotel.pricePerNight * hotel.nights}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Amenities:</div>
                      <div className="flex flex-wrap gap-1">
                        {hotel.amenities.map((amenity, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transportation" className="space-y-4">
            {itinerary.transportation.map((transport, index) => (
              <Card key={index} className="travel-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        {transport.type === "Flight" ? (
                          <Plane className="h-5 w-5 text-primary" />
                        ) : (
                          <Navigation className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold">{transport.from} → {transport.to}</h4>
                        <p className="text-muted-foreground">{transport.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">${transport.cost}</div>
                      <div className="text-sm text-muted-foreground">per person</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to="/dashboard">
            <Button variant="outline" size="lg">
              Back to Dashboard
            </Button>
          </Link>
          <Link to="/booking">
            <Button size="lg" className="travel-button">
            Book This Trip
           </Button>
          </Link>
          

          <Link to="/create-itinerary">
            <Button variant="outline" size="lg">
              Create New Trip
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItineraryResult;