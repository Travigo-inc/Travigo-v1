import axios from 'axios';
import api from './authService';

// Trip service for managing itineraries and bookings
export const tripService = {
  // Get all trips for current user
  getUserTrips: async (userId: string, params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) => {
    try {
      const response = await api.get(`/itineraries/user/${userId}`, { params });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to fetch trips' };
    }
  },

  // Get detailed trip information
  getTripDetails: async (tripId: string) => {
    try {
      const response = await api.get(`/itineraries/${tripId}/details`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to fetch trip details' };
    }
  },

  // Get booking options for a trip
  getBookingOptions: async (tripId: string) => {
    try {
      const response = await api.get(`/bookings/${tripId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to fetch booking options' };
    }
  },

  // Create a booking
  createBooking: async (bookingData: {
    itineraryId: string;
    itemType: string;
    itemName: string;
    bookingLink?: string;
    provider?: string;
    amount?: number;
  }) => {
    try {
      const response = await api.post('/bookings', bookingData);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to create booking' };
    }
  },

  // Update trip tracking
  updateTracking: async (tripId: string, locationData: {
    latitude: number;
    longitude: number;
    timestamp?: string;
  }) => {
    try {
      const response = await api.post(`/itineraries/track/${tripId}`, locationData);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to update tracking' };
    }
  },

  // Delete a trip
  deleteTrip: async (tripId: string) => {
    try {
      const response = await api.delete(`/itineraries/${tripId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to delete trip' };
    }
  }
};

export default tripService;