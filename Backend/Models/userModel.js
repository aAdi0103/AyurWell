import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
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
  
    profilePic: {
        type: String, // URL to the profile picture
        default: "default-profile.png"
    },
    Phone: {
         type:String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const User = mongoose.model("User",UserSchema);
export default User;