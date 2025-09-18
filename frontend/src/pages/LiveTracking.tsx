import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Navigation, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  RefreshCw,
  Zap,
  CloudRain,
  Sun,
  Wind
} from "lucide-react";
import { toast } from "sonner";

interface LiveTrackingProps {
  trip: any;
  currentLocation: {lat: number, lng: number} | null;
  onLocationUpdate: (location: {lat: number, lng: number}) => void;
}

const LiveTracking = ({ trip, currentLocation, onLocationUpdate }: LiveTrackingProps) => {
  const [watchId, setWatchId] = useState<number | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [weatherAlert, setWeatherAlert] = useState<any>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Get current activity
  const currentDay = trip.dailyItinerary.find((day: any) => day.status === 'ongoing');
  const currentActivity = currentDay?.activities.find((activity: any) => activity.status === 'current');
  const nextActivity = currentDay?.activities.find((activity: any) => activity.status === 'upcoming');

  // Start location tracking
  const startTracking = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by this browser");
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000 // 1 minute
    };

    const id = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        onLocationUpdate(newLocation);
        setLastUpdate(new Date());
        
        // Check if user is near next destination
        if (nextActivity && nextActivity.location) {
          const distance = calculateDistance(
            newLocation.lat, 
            newLocation.lng, 
            nextActivity.location.lat, 
            nextActivity.location.lng
          );
          
          if (distance < 0.5) { // Within 500 meters
            toast.success("You're near your next destination!", {
              description: nextActivity.title
            });
          }
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.error("Failed to get your location");
      },
      options
    );

    setWatchId(id);
    setIsTracking(true);
    toast.success("Live tracking started");
  };

  // Stop location tracking
  const stopTracking = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setIsTracking(false);
      toast.info("Live tracking stopped");
    }
  };

  // Calculate distance between two points (Haversine formula)
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Mock weather check
  useEffect(() => {
    const checkWeather = () => {
      // Simulate weather alert
      const alerts = [
        null,
        { type: "rain", message: "Light rain expected in 2 hours", severity: "low" },
        { type: "storm", message: "Thunderstorm warning for this evening", severity: "high" }
      ];
      
      const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
      setWeatherAlert(randomAlert);
    };

    const interval = setInterval(checkWeather, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Reorganize itinerary based on conditions
  const reorganizeItinerary = () => {
    toast.info("Reorganizing your itinerary...", {
      description: "Adjusting schedule based on current conditions"
    });
    
    // Mock reorganization logic
    setTimeout(() => {
      toast.success("Itinerary updated!", {
        description: "Your schedule has been optimized for current conditions"
      });
    }, 2000);
  };

  useEffect(() => {
    // Initialize map when component mounts
    if (mapRef.current && currentLocation) {
      // This would initialize Leaflet map
      // For now, we'll show a placeholder
    }
  }, [currentLocation]);

  return (
    <div className="space-y-6">
      {/* Tracking Controls */}
      <Card className="travel-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Navigation className="h-5 w-5 mr-2 text-primary" />
              Live Tracking
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant={isTracking ? "destructive" : "default"}
                size="sm"
                onClick={isTracking ? stopTracking : startTracking}
              >
                {isTracking ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Stop Tracking
                  </>
                ) : (
                  <>
                    <Navigation className="h-4 w-4 mr-2" />
                    Start Tracking
                  </>
                )}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Current Location</div>
              <div className="font-semibold">
                {currentLocation ? 
                  `${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}` : 
                  "Getting location..."
                }
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Last Update</div>
              <div className="font-semibold">{lastUpdate.toLocaleTimeString()}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Tracking Status</div>
              <div className={`font-semibold ${isTracking ? 'text-green-600' : 'text-gray-600'}`}>
                {isTracking ? 'Active' : 'Inactive'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Alert */}
      {weatherAlert && (
        <Card className="travel-card border-yellow-200 bg-yellow-50/50 dark:bg-yellow-950/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  {weatherAlert.type === 'rain' ? <CloudRain className="h-5 w-5 text-yellow-600" /> :
                   weatherAlert.type === 'storm' ? <Wind className="h-5 w-5 text-yellow-600" /> :
                   <Sun className="h-5 w-5 text-yellow-600" />}
                </div>
                <div>
                  <div className="font-semibold text-yellow-800 dark:text-yellow-200">Weather Alert</div>
                  <div className="text-sm text-yellow-700 dark:text-yellow-300">{weatherAlert.message}</div>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={reorganizeItinerary}
                className="border-yellow-300 text-yellow-700 hover:bg-yellow-100"
              >
                <Zap className="h-4 w-4 mr-2" />
                Adjust Plans
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Map Container */}
      <Card className="travel-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-primary" />
            Live Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            ref={mapRef}
            className="w-full h-96 bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-lg flex items-center justify-center border-2 border-dashed border-primary/20"
          >
            <div className="text-center">
              <MapPin className="h-12 w-12 text-primary/40 mx-auto mb-4" />
              <p className="text-muted-foreground">Interactive map will load here</p>
              <p className="text-sm text-muted-foreground mt-2">
                Showing your location and trip destinations
              </p>
              {currentLocation && (
                <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                  <div className="text-sm font-medium">Your Current Position</div>
                  <div className="text-xs text-muted-foreground">
                    {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current & Next Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Activity */}
        {currentActivity && (
          <Card className="travel-card border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Navigation className="h-5 w-5 mr-2 animate-pulse" />
                Current Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h3 className="font-bold text-lg">{currentActivity.title}</h3>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {currentActivity.time}
                  </span>
                  <Badge className="bg-green-500/10 text-green-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    In Progress
                  </Badge>
                </div>
                {currentLocation && currentActivity.location && (
                  <div className="text-sm text-muted-foreground">
                    Distance: {calculateDistance(
                      currentLocation.lat,
                      currentLocation.lng,
                      currentActivity.location.lat,
                      currentActivity.location.lng
                    ).toFixed(2)} km away
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Activity */}
        {nextActivity && (
          <Card className="travel-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                Next Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h3 className="font-bold text-lg">{nextActivity.title}</h3>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {nextActivity.time}
                  </span>
                  <Badge variant="secondary">
                    Upcoming
                  </Badge>
                </div>
                {currentLocation && nextActivity.location && (
                  <div className="text-sm text-muted-foreground">
                    Distance: {calculateDistance(
                      currentLocation.lat,
                      currentLocation.lng,
                      nextActivity.location.lat,
                      nextActivity.location.lng
                    ).toFixed(2)} km away
                  </div>
                )}
                <Button variant="outline" size="sm" className="w-full">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LiveTracking;