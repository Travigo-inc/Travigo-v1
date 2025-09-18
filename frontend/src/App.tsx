import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProfileSetup from "./pages/ProfileSetup";
import CreateItinerary from "./pages/CreateItinerary";
import ItineraryResult from "./pages/ItineraryResult";
import NotFound from "./pages/NotFound";
import Features from "./components/Features";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact"
import Destination from "./components/Destination";
import Bookings from "./components/Bookings";
import LiveTracking from "./pages/LiveTracking";
import TripDetails from "./pages/TripDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="/create-itinerary" element={<CreateItinerary />} />
            <Route path="/itinerary-result" element={<ItineraryResult />} />
            <Route path="/features" element = {<Features/>}/>
            <Route path="/about" element = {<AboutUs/>}/>
            <Route path="/contact" element = {<Contact/>}/>
            <Route path="/destinations" element = {<Destination />}/>
            <Route path="/booking" element = {<Bookings />}/>
            <Route path="/tracking" element = {<TripDetails/>}/>
            

          </Route>
          {/* Routes outside layout (fullscreen pages) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
