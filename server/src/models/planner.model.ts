import mongoose from 'mongoose';

const PlannerSchema = new mongoose.Schema({
  // Indexed for fast lookups when the user opens their schedule
  clerkId: { 
    type: String, 
    required: true, 
    index: true 
  }, 
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  summary: { 
    type: String, 
    trim: true 
  }, 
  
  // Stored as ISO Date strings in MongoDB
  start: { 
    type: Date, 
    required: true 
  }, 
  end: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(this: any, value: Date) {
        // Ensures the session doesn't end before it starts
        return value > this.start;
      },
      message: 'End date must be after start date'
    }
  },
}, { 
  timestamps: true // Automatically creates createdAt and updatedAt fields
});

// Using 'Planner' as the model name
export const Planner = mongoose.models.Planner || mongoose.model('Planner', PlannerSchema);