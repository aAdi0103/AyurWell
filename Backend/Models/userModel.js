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