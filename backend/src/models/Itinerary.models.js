import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema(
  {
    // Link to user
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Link to the chosen destination (which already has POIs + Accommodations inside it)
    destination: {
      type: String,
      //ref: 'Destination',
      required: true,
    },

    // Trip basics
    trip_name: { type: String, default: 'My Trip' },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },

    // Calculated field (controller will compute this on save/update)
    total_days: { type: Number },

    // Trip-specific preferences (set AFTER "Start Travelling")
    budget: { type: Number }, // e.g., max spending in INR/USD
    travel_style: {
      type: String,
      enum: ['luxury', 'budget', 'balanced'],
      default: 'balanced',
    },

    // Daily plan (activities/accommodation reference IDs inside Destination schema)
    daily_plan: [
      {
        date: { type: Date, required: true },
        activities: [
          {
            poi_id: { type: mongoose.Schema.Types.ObjectId }, // refers to destination.pois._id
            accommodation_id: { type: mongoose.Schema.Types.ObjectId }, // refers to destination.accommodations._id
            transport_mode: String,
            notes: String,
            estimated_cost: Number,
          },
        ],
      },
    ],

    // Cost summary (auto-calculated from daily_plan OR user input)
    cost_breakdown: {
      transport: { type: Number, default: 0 },
      accommodation: { type: Number, default: 0 },
      activities: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
      currency: { type: String, default: 'INR' },
    },

    // Status of the trip
    status: {
      type: String,
      enum: ['draft', 'confirmed', 'completed', 'cancelled'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

export default Itinerary;
