import express from 'express';
import User from '../Models/userModel.js';

const router = express.Router();

router.get('/data/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('waterIntakeHistory');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.waterIntakeHistory);
  } catch (error) {
    console.error('Error fetching sleep data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
