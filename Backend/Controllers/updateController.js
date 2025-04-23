import User from "../Models/userModel.js";

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

export const quizeResponse = async (req, res) => {
  try {
    // console.log(req.body);  

    const userId = req.user;
    

    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ message: 'No data received in request body.' });
    }

    const {
      diet,
      dosha,
      insight,
      meditation,
      yoga,
      qualities,
      score,
      quizAnswers = [] // default to empty array if not provided
    } = data;

    if (!Array.isArray(quizAnswers)) {
      return res.status(400).json({
        message: 'Quiz answers should be an array.',
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.prakriti = dosha;
    user.insight = insight;
    user.qualities = qualities || [];

    user.doshaProfile = {
      vata: score?.Vata || 0,
      pitta: score?.Pitta || 0,
      kapha: score?.Kapha || 0,
    };

    user.dietPlans = {
      foodsToFavor: diet?.prefer || [],
      foodsToAvoid: diet?.avoid || [],
      recommendations: [diet?.insight || ''],
      breakfast: [diet?.meals?.breakfast || ''],
      lunch: [diet?.meals?.lunch || ''],
      dinner: [diet?.meals?.dinner || ''],
    };

    user.yogaPlans = (yoga || []).map((y) => ({
      name: y.name || '',
      duration: y.duration?.value || 0,
      image: y.image || '',
      time: y.time || '',
    }));

    user.meditations = [
      {
        technique: meditation?.description || '',
        duration: meditation?.duration?.value || 0,
      },
    ];

    user.quizAnswers = quizAnswers;

    await user.save();

    res.status(200).json({
      message: 'Quiz response and related data updated successfully.',
    });

  } catch (error) {
    console.error('Error updating quiz response:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
