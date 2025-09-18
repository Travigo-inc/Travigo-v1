import api from './authService';

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export interface ChatContext {
  currentTrip?: any;
  userLocation?: { lat: number; lng: number };
  userPreferences?: any;
}

class ChatService {
  private context: ChatContext = {};

  // Set context for more personalized responses
  setContext(context: Partial<ChatContext>) {
    this.context = { ...this.context, ...context };
  }

  // Process user message and generate AI response
  async processMessage(message: string): Promise<{ content: string; suggestions?: string[] }> {
    try {
      // TODO: Replace with actual AI service call when backend is ready
      // const response = await api.post('/chat/message', {
      //   message,
      //   context: this.context
      // });
      // return response.data;

      // For now, use local processing
      return this.generateLocalResponse(message);
    } catch (error) {
      console.error('Chat service error:', error);
      return {
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        suggestions: ["Try again", "Contact support"]
      };
    }
  }

  // Local response generation (fallback)
  private generateLocalResponse(message: string): { content: string; suggestions?: string[] } {
    const msg = message.toLowerCase();

    // Itinerary modification requests
    if (msg.includes('change') || msg.includes('modify') || msg.includes('update')) {
      if (msg.includes('date') || msg.includes('time')) {
        return {
          content: "I can help you change dates and times in your itinerary. Here's what I can do:\n\n• Reschedule activities\n• Adjust check-in/check-out times\n• Move activities to different days\n• Update travel dates\n\nWhich specific dates would you like to modify?",
          suggestions: ["Change travel dates", "Reschedule activity", "Adjust hotel dates", "Move to different day"]
        };
      }

      if (msg.includes('hotel') || msg.includes('accommodation')) {
        return {
          content: "I can help you modify your accommodation:\n\n• Change hotel bookings\n• Upgrade/downgrade rooms\n• Find alternative accommodations\n• Adjust check-in/out dates\n• Compare prices\n\nWhat changes would you like to make to your hotel bookings?",
          suggestions: ["Change hotel", "Upgrade room", "Find alternatives", "Adjust dates"]
        };
      }

      if (msg.includes('activity') || msg.includes('attraction')) {
        return {
          content: "I can help you modify activities in your itinerary:\n\n• Add new attractions\n• Remove activities\n• Replace with alternatives\n• Adjust timing\n• Find nearby options\n\nWhat activity changes would you like to make?",
          suggestions: ["Add activity", "Remove activity", "Find alternatives", "Adjust timing"]
        };
      }
    }

    // Location-based requests
    if (msg.includes('near') || msg.includes('nearby') || msg.includes('around')) {
      return {
        content: "I can help you find things nearby! Based on your current location, I can suggest:\n\n• Restaurants and cafes\n• Attractions and landmarks\n• Shopping areas\n• Transportation options\n• Emergency services\n\nWhat are you looking for nearby?",
        suggestions: ["Find restaurants", "Find attractions", "Find shopping", "Find transport"]
      };
    }

    // Emergency or urgent help
    if (msg.includes('emergency') || msg.includes('help') || msg.includes('urgent')) {
      return {
        content: "I'm here to help with any urgent travel needs:\n\n• Emergency contacts\n• Medical assistance\n• Lost documents\n• Travel insurance claims\n• Embassy information\n• Local emergency services\n\nWhat kind of emergency assistance do you need?",
        suggestions: ["Medical help", "Lost documents", "Emergency contacts", "Insurance claim"]
      };
    }

    // Weather requests
    if (msg.includes('weather') || msg.includes('rain') || msg.includes('forecast')) {
      return {
        content: "Here's your weather information:\n\n🌤️ Current: 22°C, Partly cloudy\n🌧️ Tomorrow: 18°C, Light rain expected\n📅 This week: Mostly sunny with occasional showers\n\nI recommend:\n• Carrying an umbrella tomorrow\n• Indoor activities for rainy periods\n• Perfect weather for outdoor sightseeing today!",
        suggestions: ["Indoor activities", "Weather alerts", "Packing tips", "Activity recommendations"]
      };
    }

    // Budget and cost inquiries
    if (msg.includes('budget') || msg.includes('cost') || msg.includes('money') || msg.includes('expensive')) {
      return {
        content: "Let me help you with budget management:\n\n💰 Current trip spending: $1,240 / $3,200\n📊 You're 15% under budget - great job!\n💡 Savings opportunities:\n• Book dinner reservations in advance (save 20%)\n• Use public transport instead of taxis (save $50/day)\n• Visit free museums on certain days\n\nWould you like me to find more cost-saving options?",
        suggestions: ["Find deals", "Budget breakdown", "Save money tips", "Free activities"]
      };
    }

    // Transportation help
    if (msg.includes('transport') || msg.includes('taxi') || msg.includes('train') || msg.includes('bus')) {
      return {
        content: "I can help you with transportation:\n\n🚗 Current options near you:\n• Taxi: 3 min wait, $12-15\n• Metro: 2 min walk to station\n• Bus: Next bus in 8 minutes\n• Bike rental: Available 50m away\n\nI can also help you book or find the best routes to your next destination.",
        suggestions: ["Book taxi", "Metro directions", "Bus schedule", "Bike rental"]
      };
    }

    // Default helpful response
    return {
      content: "I'm your AI travel assistant, ready to help with anything! I can assist you with:\n\n✈️ Itinerary modifications\n🏨 Hotel and booking changes\n🗺️ Local recommendations\n🌤️ Weather updates\n💰 Budget optimization\n🚨 Emergency assistance\n\nWhat would you like help with?",
      suggestions: ["Modify itinerary", "Find restaurants", "Check weather", "Get directions"]
    };
  }

  // Get quick actions based on current context
  getQuickActions(): string[] {
    const actions = ["Plan new trip", "Modify current trip", "Find restaurants", "Check weather"];

    if (this.context.currentTrip) {
      actions.unshift("Update this trip", "Add activity", "Change dates");
    }

    return actions;
  }

  // Get contextual suggestions
  getContextualSuggestions(): string[] {
    if (this.context.currentTrip) {
      return [
        "What's next on my itinerary?",
        "Find nearby restaurants",
        "Check weather for tomorrow",
        "Modify my schedule"
      ];
    }

    return [
      "Plan a new trip",
      "Popular destinations",
      "Travel tips",
      "Budget planning"
    ];
  }
}

export const chatService = new ChatService();
export default chatService;
