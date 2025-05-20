import chatModel from '../Models/chatModel.js'



export const getMessages = async (req, res) => {
    try {
        const { groupId } = req.params;
        const userId = req.user?.id; // Assuming middleware adds user info to req

        // Validate input
        if (!groupId) {
            return res.status(400).json({ message: "Group ID is required" });
        }

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User ID not found" });
        }

        // Fetch messages
        const messages = await chatModel.find({ group: groupId })
            .populate("sender", "name email _id")
            .sort({ timestamp: 1 }); // Oldest to newest for chat UI

        // Add direction tag to each message
        const formattedMessages = messages.map((msg) => ({
            _id: msg._id,
            text: msg.content,
            timestamp: msg.timestamp,
            sender: {
                _id: msg.sender._id,
                name: msg.sender.name,
                email: msg.sender.email
            },
            direction: msg.sender._id.toString() === userId ? "sender" : "receiver"
        }));

        res.status(200).json({ messages: formattedMessages });
    } catch (error) {
        console.error("Error fetching messages:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};


