import User from "../Models/UserModel.js";

  
export const sleep = async (req, res) => {
  try {
    const userId = req.user // assuming auth middleware adds this
    const { sleep, water } = req.body

    if (!sleep || !water) {
      return res.status(400).json({ message: 'Both sleep and water intake are required.' })
    }

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Push new sleep and water entries
    user.sleepDuration.push({
      hours: parseFloat(sleep),
    })

    user.waterIntakeHistory.push({
      liters: parseFloat(water),
    })

    await user.save()

    res.status(200).json({ message: 'Daily tracker updated successfully' })
  } catch (error) {
    console.error('Error in updating tracker:', error.message)
    res.status(500).json({ message: 'Internal server error' })
  }
}
