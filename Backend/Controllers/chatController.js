import Message from "../Models/chatModel";



export const sendMessage = async (req, res) => {
    try {
        const { sender, group, content, media } = req.body;
    
        // Validate the input data
        if (!sender || !group || !content) {
        return res.status(400).json({ message: "All fields are required" });
        }
    
        // Create a new message instance
        const newMessage = new Message({
        sender,
        group,
        content,
        media,
        });
    
        // Save the message to the database
        await newMessage.save();
    
        res.status(201).json({ message: "Message sent successfully", newMessage });
    } catch (error) {
        console.error("Error sending message:", error.message);
        res.status(500).json({ message: "Server error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { groupId } = req.params;
    
        // Validate the input data
        if (!groupId) {
        return res.status(400).json({ message: "Group ID is required" });
        }
    
        // Fetch messages for the specified group
        const messages = await Message.find({ group: groupId })
        .populate("sender", "name email") // Populate sender details
        .sort({ timestamp: -1 }); // Sort messages by timestamp
    
        res.status(200).json({ messages });
    } catch (error) {
        console.error("Error fetching messages:", error.message);
        res.status(500).json({ message: "Server error" });
    }
}

export const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
    
        // Validate the input data
        if (!messageId) {
        return res.status(400).json({ message: "Message ID is required" });
        }
    
        // Delete the message from the database
        await Message.findByIdAndDelete(messageId);
    
        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        console.error("Error deleting message:", error.message);
        res.status(500).json({ message: "Server error" });
    }
}

