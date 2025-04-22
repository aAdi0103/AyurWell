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
    sleepDuration: [
      {
        date: { type: Date, default: Date.now },
        hours: Number
      }
    ],// in hours
    waterIntakeHistory: [
      {
        date: { type: Date, default: Date.now },
        liters: Number
      }
    ],
    healthGoals: [String], // e.g. ["Weight Loss", "Better Sleep"]
    quizAnswers: [], // store question-id and answer
    createdAt: { type: Date, default: Date.now }
});


const User = mongoose.model("User",UserSchema);
export default User;