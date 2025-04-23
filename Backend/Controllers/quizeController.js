import User from "../Models/userModel.js";

export const creatingQuize = async function(req, res) {
    try {
      const { answers } = req.body;
      const userId = req.user.userId; // Assuming userId is set in the request by middleware
  
      if (!userId || !Array.isArray(answers)) {
        return res.status(400).json({ message: "Invalid data format" });
      }
  
      // Find the user
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Store quiz answers
      user.quizAnswers = answers; // Overwrites previous answers
      await user.save();
  
      res.status(200).json({ message: "Quiz answers saved successfully", user });
    } catch (error) {
      console.error("Error saving quiz answers:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };