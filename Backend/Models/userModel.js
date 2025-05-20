import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  gender: String,
  location: String,
  language: String,
  prakriti: String,

  doshaProfile: {
    vata: Number,
    pitta: Number,
    kapha: Number
  },

  qualities: [String], // NEW: storing user's dominant qualities

  sleepDuration: [
    {
      date: { type: Date, default: Date.now },
      hours: Number
    }
  ],

  waterIntakeHistory: [
    {
      date: { type: Date, default: Date.now },
      liters: Number
    }
  ],

  healthGoals: [String],
  quizAnswers: [mongoose.Schema.Types.Mixed],

  dietPlans: {
    foodsToFavor: [String],
    foodsToAvoid: [String],
    recommendations: [String],
    breakfast: [String],
    lunch: [String],
    dinner: [String]
  },

  yogaPlans: [
    {
      name: String,
      duration: Number, // in minutes
      image: String,    // NEW
      time: String      // NEW
    }
  ],

  meditations: [
    {
      technique: String,
      image:String,
      duration: Number  // in minutes
    }
  ],

  insight: String,

  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;

