import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, User, MapPin, DollarSign, Heart, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    // Travel preferences
    travelType: "",
    budgetRange: "",
    accommodation: "",
    interests: [] as string[],
    favoriteDestinations: [] as string[],
    // Custom destinations
    customDestination: ""
  });

  const travelTypes = [
    "Adventure & Outdoor",
    "Cultural & Historical",
    "Relaxation & Wellness",
    "City & Urban",
    "Beach & Coastal",
    "Mountain & Nature",
    "Food & Culinary",
    "Business Travel"
  ];

  const budgetRanges = [
    "Under $1,000",
    "$1,000 - $2,500",
    "$2,500 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $20,000",
    "Above $20,000"
  ];

  const accommodationTypes = [
    "Hotels",
    "Resorts",
    "Homestays",
    "Hostels",
    "Vacation Rentals",
    "Boutique Hotels",
    "Luxury Accommodations",
    "Budget Accommodations"
  ];

  const interestOptions = [
    "Adventure Sports", "Photography", "History", "Art & Museums", 
    "Local Cuisine", "Nightlife", "Shopping", "Nature & Wildlife",
    "Architecture", "Festivals", "Beaches", "Mountains",
    "Religious Sites", "Markets", "Music", "Hiking",
    "Water Sports", "Cultural Tours", "Wellness", "Family Activities"
  ];

  const popularDestinations = [
    "Paris, France", "Tokyo, Japan", "New York, USA", "London, UK",
    "Bali, Indonesia", "Rome, Italy", "Bangkok, Thailand", "Barcelona, Spain",
    "Dubai, UAE", "Sydney, Australia", "Amsterdam, Netherlands", "Prague, Czech Republic",
    "Santorini, Greece", "Machu Picchu, Peru", "Iceland", "Morocco"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleDestinationToggle = (destination: string) => {
    setFormData(prev => ({
      ...prev,
      favoriteDestinations: prev.favoriteDestinations.includes(destination)
        ? prev.favoriteDestinations.filter(d => d !== destination)
        : [...prev.favoriteDestinations, destination]
    }));
  };

  const addCustomDestination = () => {
    if (formData.customDestination.trim()) {
      setFormData(prev => ({
        ...prev,
        favoriteDestinations: [...prev.favoriteDestinations, prev.customDestination.trim()],
        customDestination: ""
      }));
    }
  };

  const removeDestination = (destination: string) => {
    setFormData(prev => ({
      ...prev,
      favoriteDestinations: prev.favoriteDestinations.filter(d => d !== destination)
    }));
  };

  const handleSubmit = async () => {
    try {
      // Structure the data to match the backend user model
      const profileData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        phone: formData.phone,
        preferences: {
          travelType: formData.travelType,
          budget: formData.budgetRange,
          accommodation: formData.accommodation,
          interests: formData.interests,
          favoriteDestinations: formData.favoriteDestinations
        }
      };

      // Make the API call to update the user profile
      await authService.updateProfile(profileData);
      
      // Navigate to dashboard after successful update
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      // TODO: Add proper error handling (e.g., toast notification)
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground">
            Help us personalize your travel experience
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-smooth",
                  s <= step
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={cn(
                    "w-16 h-1 mx-2 transition-smooth",
                    s < step ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <Card className="travel-card shadow-travel">
          <CardHeader>
            <CardTitle className="flex items-center">
              {step === 1 && (
                <>
                  <User className="h-5 w-5 mr-2 text-primary" />
                  Personal Information
                </>
              )}
              {step === 2 && (
                <>
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Travel Preferences
                </>
              )}
              {step === 3 && (
                <>
                  <Heart className="h-5 w-5 mr-2 text-primary" />
                  Interests & Destinations
                </>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="travel-input"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="travel-input"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal travel-input",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-3">
                  <Label>Gender</Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) => handleInputChange("gender", value)}
                    className="flex flex-wrap gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                      <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="travel-input"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Travel Preferences */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>What type of travel do you prefer?</Label>
                  <Select
                    value={formData.travelType}
                    onValueChange={(value) => handleInputChange("travelType", value)}
                  >
                    <SelectTrigger className="travel-input">
                      <SelectValue placeholder="Select your travel style" />
                    </SelectTrigger>
                    <SelectContent>
                      {travelTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>What's your typical budget range per trip?</Label>
                  <Select
                    value={formData.budgetRange}
                    onValueChange={(value) => handleInputChange("budgetRange", value)}
                  >
                    <SelectTrigger className="travel-input">
                      <SelectValue placeholder="Select your budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>What type of accommodation do you prefer?</Label>
                  <Select
                    value={formData.accommodation}
                    onValueChange={(value) => handleInputChange("accommodation", value)}
                  >
                    <SelectTrigger className="travel-input">
                      <SelectValue placeholder="Select accommodation type" />
                    </SelectTrigger>
                    <SelectContent>
                      {accommodationTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 3: Interests & Destinations */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>What are you interested in? (Select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {interestOptions.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={formData.interests.includes(interest)}
                          onCheckedChange={() => handleInterestToggle(interest)}
                        />
                        <Label
                          htmlFor={interest}
                          className="text-sm cursor-pointer hover:text-primary transition-smooth"
                        >
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Favorite destinations (Select your dream places)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {popularDestinations.map((destination) => (
                      <div key={destination} className="flex items-center space-x-2">
                        <Checkbox
                          id={destination}
                          checked={formData.favoriteDestinations.includes(destination)}
                          onCheckedChange={() => handleDestinationToggle(destination)}
                        />
                        <Label
                          htmlFor={destination}
                          className="text-sm cursor-pointer hover:text-primary transition-smooth"
                        >
                          {destination}
                        </Label>
                      </div>
                    ))}
                  </div>

                  {/* Custom Destination Input */}
                  <div className="space-y-2">
                    <Label>Add custom destination</Label>
                    <div className="flex gap-2">
                      <Input
                        value={formData.customDestination}
                        onChange={(e) => handleInputChange("customDestination", e.target.value)}
                        className="travel-input"
                        placeholder="Enter destination..."
                        onKeyPress={(e) => e.key === 'Enter' && addCustomDestination()}
                      />
                      <Button onClick={addCustomDestination} variant="outline">
                        Add
                      </Button>
                    </div>
                  </div>

                  {/* Selected Destinations */}
                  {formData.favoriteDestinations.length > 0 && (
                    <div className="space-y-2">
                      <Label>Selected destinations:</Label>
                      <div className="flex flex-wrap gap-2">
                        {formData.favoriteDestinations.map((destination) => (
                          <Badge
                            key={destination}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {destination}
                            <X
                              className="h-3 w-3 cursor-pointer hover:text-destructive"
                              onClick={() => removeDestination(destination)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
              >
                Previous
              </Button>
              {step < 3 ? (
                <Button onClick={nextStep} className="travel-button">
                  Continue
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="travel-button">
                  Complete Profile
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;
