import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    age: Number,
    gender: String,
    location: String,
    language: String,
    prakriti: String, // E.g., "Vata", "Pitta", "Kapha", or combination
    doshaProfile: {
      vata: Number,
      pitta: Number,
      kapha: Number
    },
    healthGoals: [String], // e.g. ["Weight Loss", "Better Sleep"]
    quizAnswers: [], // store question-id and answer
    createdAt: { type: Date, default: Date.now }
});


const User = mongoose.model("User",UserSchema);
export default User;