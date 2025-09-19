import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  MapPin,
  Calendar,
  Plus,
  Settings,
  FileText,
  CheckCircle,
  Clock,
  Plane,
  Hotel,
  Camera,
  DollarSign,
  Edit,
} from "lucide-react";

const Dashboard = () => {

  interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    preferences: {
      travelType: string;
      budget?: string;
      accommodation?: string;
      interests?: string[];
    };
    kycStatus: "pending" | "verified" | "rejected";
    blockchainId?: string;
  }
  
  interface Itinerary {
    id: string;
    title: string;
    destination: string;
    startDate: string;
    endDate: string;
    status: string;
    budget: number;
    image?: string;
    activities?: number;
    hotels?: number;
  }

  const [user, setUser] = useState<User | null>(null);

  // Initialize with empty array instead of mock data
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);

  const api = axios.create({
    baseURL: "http://localhost:8000/api/v1/", // Default backend URL
    withCredentials: true, // Important for cookies
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const userRes = await api.get("auth/profile");
        setUser(userRes.data.data);
        console.log("Fetched user:", userRes.data);

        // Fetch itineraries for the user
        const itinRes = await api.get(`itineraries`);
        console.log("Fetched itineraries response:", itinRes.data);
        // Extract itineraries array from ApiResponse structure
        const itinerariesData = itinRes.data?.data || [];
        console.log("Fetched itineraries:", itinerariesData);
        
        // Ensure itineraries is always an array
        if (Array.isArray(itinerariesData)) {
          setItineraries(itinerariesData);
        } else {
          // If we can't find an array, set to empty array
          setItineraries([]);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        // Set itineraries to empty array on error
        setItineraries([]);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "planning":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "draft":
        return "bg-gray-500/10 text-gray-700 border-gray-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "planning":
        return <Clock className="h-4 w-4" />;
      case "draft":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user && user.name ? user.name.split(" ")[0] : "Traveler"}!
            </h1>
            <p className="text-muted-foreground">
              Ready for your next adventure?
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Link to="/create-itinerary">
              <Button className="travel-button">
                <Plus className="h-4 w-4 mr-2" />
                New Trip
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trips">My Trips</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="tracking">
              <Link to='/tracking'>Trip Details</Link>
            </TabsTrigger>

          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="travel-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Trips
                      </p>
                      <p className="text-2xl font-bold">{itineraries.length}</p>
                    </div>
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card className="travel-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Countries Visited
                      </p>
                      <p className="text-2xl font-bold">0</p>
                    </div>
                    <Plane className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card className="travel-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Savings
                      </p>
                      <p className="text-2xl font-bold">$0.0</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card className="travel-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        KYC Status
                      </p>
                      {user?.kycStatus==="verified"? <p className="text-2xl font-bold text-green-600">
                        { user?.kycStatus }
                      </p> :
                      <p className="text-2xl font-bold text-yellow-600">
                        { user?.kycStatus }
                      </p>}
                    </div>
                    {user?.kycStatus==="verified"?<CheckCircle className="h-8 w-8 text-green-600" />:null}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Trips */}
            <Card className="travel-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Trips
                  <Link
                    to="#"
                    className="text-primary hover:text-primary-glow transition-smooth text-sm font-normal"
                  >
                    View All
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {itineraries.slice(0, 2).map((trip) => (
                    <div
                      key={trip.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-accent/50 transition-smooth"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{trip.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {trip.destination}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(trip.status)}>
                          {getStatusIcon(trip.status)}
                          <span className="ml-1 capitalize">{trip.status}</span>
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          ${trip.budget.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trips" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Trips</h2>
              <Link to="/create-itinerary">
                <Button className="travel-button">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Trip
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itineraries.map((trip) => (
                <Card
                  key={trip.id}
                  className="travel-card group hover:shadow-travel hover:scale-105 transition-smooth"
                >
                  <div className="aspect-video relative overflow-hidden rounded-t-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center">
                      <Camera className="h-12 w-12 text-white/60" />
                    </div>
                    <Badge
                      className={`absolute top-3 right-3 ${getStatusColor(
                        trip.status
                      )}`}
                    >
                      {getStatusIcon(trip.status)}
                      <span className="ml-1 capitalize">{trip.status}</span>
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">{trip.title}</h3>
                    <p className="text-muted-foreground mb-4">
                      {trip.destination}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(trip.startDate).toLocaleDateString()} -{" "}
                        {new Date(trip.endDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {trip.activities} activities
                        </span>
                        <span className="flex items-center text-muted-foreground">
                          <Hotel className="h-4 w-4 mr-1" />
                          {trip.hotels} hotels
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        ${trip.budget.toLocaleString()}
                      </span>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Trip
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Info */}
              <Card className="travel-card lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Profile Information
                    <Link to="/profile-setup">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xl">
                        {user?.name
                          ? user.name.split(" ").map((n) => n[0]).join("")
                          : "T"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold">{user?.name}</h3>
                      <p className="text-muted-foreground">{user?.email}</p>
                      <p className="text-muted-foreground">{user?.phone}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Travel Type
                      </label>
                      <p className="font-semibold">
                        { user?.preferences?.travelType}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Budget Range
                      </label>
                      <p className="font-semibold">{user?.preferences?.budget}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Accommodation
                      </label>
                      <p className="font-semibold">
                        {user?.preferences?.accommodation}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        KYC Status
                      </label>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-600">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Interests
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {user?.preferences?.interests.map((interest, index) => (
                        <Badge key={index} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="travel-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/profile-setup" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <User className="h-4 w-4 mr-2" />
                      Update Profile
                    </Button>
                  </Link>
                  <Link to="/kyc-upload" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Upload KYC Documents
                    </Button>
                  </Link>
                  <Link to="/create-itinerary" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Plan New Trip
                    </Button>
                  </Link>
                  <Link to="/settings" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
