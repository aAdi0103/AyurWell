import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    content: { type: String, required: true },
    media: String, // Optional: image/video/audio file link
    timestamp: { type: Date, default: Date.now }
  });

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;

