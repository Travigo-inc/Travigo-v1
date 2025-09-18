import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Navigation, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Plane,
  Hotel,
  Camera,
  Utensils,
  RefreshCw
} from "lucide-react";
import LiveTracking from "./LiveTracking";
import { toast } from "sonner";

const TripDetails = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        // TODO: Replace with actual API call
        const mockTrip = {
          id: tripId,
          tripName: "Tokyo Explorer",
          destination: "Tokyo, Kyoto, Osaka",
          startDate: "2024-03-10",
          endDate: "2024-03-20",
          status: "ongoing",
          budget: 3200,
          travelers: 1,
          currentDay: 3,
          totalDays: 10,
          
          dailyItinerary: [
            {
              day: 1,
              date: "2024-03-10",
              city: "Tokyo",
              title: "Arrival & Tokyo Introduction",
              status: "completed",
              activities: [
                { 
                  id: "a1",
                  time: "14:00", 
                  type: "arrival", 
                  title: "Arrive at Narita Airport", 
                  status: "completed",
                  location: { lat: 35.7720, lng: 140.3929 }
                },
                { 
                  id: "a2",
                  time: "16:00", 
                  type: "transport", 
                  title: "Airport transfer to hotel", 
                  status: "completed",
                  location: { lat: 35.6762, lng: 139.6503 }
                },
                { 
                  id: "a3",
                  time: "18:00", 
                  type: "accommodation", 
                  title: "Check-in at Park Hyatt Tokyo", 
                  status: "completed",
                  location: { lat: 35.6762, lng: 139.6503 }
                }
              ]
            },
            {
              day: 2,
              date: "2024-03-11",
              city: "Tokyo",
              title: "Tokyo Highlights",
              status: "completed",
              activities: [
                { 
                  id: "a4",
                  time: "09:00", 
                  type: "sightseeing", 
                  title: "Visit Senso-ji Temple", 
                  status: "completed",
                  location: { lat: 35.7148, lng: 139.7967 }
                },
                { 
                  id: "a5",
                  time: "14:00", 
                  type: "sightseeing", 
                  title: "Tokyo Skytree", 
                  status: "completed",
                  location: { lat: 35.7101, lng: 139.8107 }
                },
                { 
                  id: "a6",
                  time: "19:00", 
                  type: "dining", 
                  title: "Dinner in Shibuya", 
                  status: "completed",
                  location: { lat: 35.6598, lng: 139.7006 }
                }
              ]
            },
            {
              day: 3,
              date: "2024-03-12",
              city: "Tokyo",
              title: "Modern Tokyo",
              status: "ongoing",
              activities: [
                { 
                  id: "a7",
                  time: "10:00", 
                  type: "sightseeing", 
                  title: "Meiji Shrine", 
                  status: "completed",
                  location: { lat: 35.6763, lng: 139.6993 }
                },
                { 
                  id: "a8",
                  time: "14:00", 
                  type: "sightseeing", 
                  title: "Harajuku District", 
                  status: "current",
                  location: { lat: 35.6702, lng: 139.7016 }
                },
                { 
                  id: "a9",
                  time: "18:00", 
                  type: "dining", 
                  title: "Sushi dinner in Ginza", 
                  status: "upcoming",
                  location: { lat: 35.6762, lng: 139.7649 }
                }
              ]
            }
          ],
          
          travelStatus: {
            currentActivity: "Exploring Harajuku District",
            nextActivity: "Sushi dinner in Ginza",
            onTime: true,
            weatherAlert: null,
            lastUpdate: new Date().toISOString()
          }
        };
        
        setTrip(mockTrip);
        
        // Get user's current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setCurrentLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude
              });
            },
            (error) => {
              console.error("Error getting location:", error);
              // Use mock location for demo (Harajuku, Tokyo)
              setCurrentLocation({ lat: 35.6702, lng: 139.7016 });
            }
          );
        } else {
          // Use mock location for demo
          setCurrentLocation({ lat: 35.6702, lng: 139.7016 });
        }
      } catch (error) {
        console.error("Failed to fetch trip details:", error);
        toast.error("Failed to load trip details");
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [tripId]);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/10 text-green-700 border-green-200";
      case "current": return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "upcoming": return "bg-gray-500/10 text-gray-700 border-gray-200";
      default: return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Trip not found</p>
          <Link to="/my-trips">
            <Button className="mt-4">Back to My Trips</Button>
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
            <Link to="/my-trips">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">{trip.tripName}</h1>
              <p className="text-muted-foreground">{trip.destination}</p>
            </div>
          </div>
          <div className="text-right">
            <Badge className={getStatusColor(trip.status)}>
              <Navigation className="h-4 w-4 mr-1" />
              <span className="capitalize">{trip.status}</span>
            </Badge>
            <div className="text-sm text-muted-foreground">
              Day {trip.currentDay} of {trip.totalDays}
            </div>
          </div>
        </div>

        {/* Trip Status Card */}
        {trip.status === 'ongoing' && (
          <Card className="travel-card mb-8 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Navigation className="h-6 w-6 text-primary animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Currently: {trip.travelStatus.currentActivity}</h3>
                    <p className="text-muted-foreground">Next: {trip.travelStatus.nextActivity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    {trip.travelStatus.onTime ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    )}
                    <span className={trip.travelStatus.onTime ? "text-green-600" : "text-yellow-600"}>
                      {trip.travelStatus.onTime ? "On Schedule" : "Running Late"}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Last updated: {new Date(trip.travelStatus.lastUpdate).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue={trip.status === 'ongoing' ? 'tracking' : 'itinerary'} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="tracking" disabled={trip.status !== 'ongoing'}>
              Live Tracking
            </TabsTrigger>
            <TabsTrigger value="details">Trip Details</TabsTrigger>
          </TabsList>

          <TabsContent value="itinerary" className="space-y-6">
            {trip.dailyItinerary.map((day: any) => (
              <Card key={day.day} className="travel-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4 ${
                        day.status === 'completed' ? 'bg-green-600' :
                        day.status === 'ongoing' ? 'bg-primary' : 'bg-gray-400'
                      }`}>
                        {day.day}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{day.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(day.date).toLocaleDateString()} • {day.city}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(day.status)}>
                      <span className="capitalize">{day.status}</span>
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {day.activities.map((activity: any) => (
                      <div 
                        key={activity.id} 
                        className={`flex items-center space-x-4 p-4 rounded-lg border transition-smooth ${
                          activity.status === 'current' ? 'border-primary bg-primary/5' : 'border-border/50'
                        }`}
                      >
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
                          <div className="flex items-center space-x-4 mt-1">
                            <Badge className={getStatusColor(activity.status)} >
                              <span className="capitalize">{activity.status}</span>
                            </Badge>
                            {activity.status === 'current' && (
                              <span className="text-xs text-primary animate-pulse">● Live</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6">
            {trip.status === 'ongoing' ? (
              <LiveTracking 
                trip={trip} 
                currentLocation={currentLocation}
                onLocationUpdate={setCurrentLocation}
              />
            ) : (
              <Card className="travel-card">
                <CardContent className="p-12 text-center">
                  <Navigation className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Live Tracking Unavailable</h3>
                  <p className="text-muted-foreground">
                    Live tracking is only available for ongoing trips.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="travel-card">
                <CardHeader>
                  <CardTitle>Trip Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Destination</span>
                    <span className="font-semibold">{trip.destination}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-semibold">{trip.totalDays} days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Travelers</span>
                    <span className="font-semibold">{trip.travelers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Budget</span>
                    <span className="font-semibold text-primary">${trip.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge className={getStatusColor(trip.status)}>
                      <span className="capitalize">{trip.status}</span>
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="travel-card">
                <CardHeader>
                  <CardTitle>Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Trip Progress</span>
                      <span>{Math.round((trip.currentDay / trip.totalDays) * 100)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-smooth" 
                        style={{ width: `${(trip.currentDay / trip.totalDays) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {trip.dailyItinerary.filter((d: any) => d.status === 'completed').length}
                      </div>
                      <div className="text-sm text-muted-foreground">Days Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {trip.totalDays - trip.currentDay + 1}
                      </div>
                      <div className="text-sm text-muted-foreground">Days Remaining</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TripDetails;