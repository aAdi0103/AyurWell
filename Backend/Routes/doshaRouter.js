import express from 'express';
import User from '../Models/userModel.js'; // Adjust the path according to your project structure

const router = express.Router();

// Route to get the dosha profile of a user by their user ID
router.get('/data/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } 

    // Extract the doshaProfile, prakriti, and insight from the user object
    const { doshaProfile, prakriti, insight } = user;

    // Return the dosha profile along with prakriti and insight
    return res.status(200).json({ doshaProfile, prakriti, insight });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
