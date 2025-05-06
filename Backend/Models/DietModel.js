const mongoose = require("mongoose");

const DietSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  diseases: [String],
  goals: [String],
  duration: {
    type: String, // e.g., "1 Week", "30 Days"
    required: true,
  },
  dietPlan: [
    {
      instruction: { type: String }, // e.g., "Avoid sugar", "Drink warm water"
      FoodToFavor: [String], // e.g., "Include more fruits", "Eat more protein"
      meals: [
        {
          mealType: String, // "Breakfast", "Lunch", "Dinner", "Snack"
          foodItems: [String], // e.g., ["Moong dal", "Steamed veggies"]
        },
      ],
      FoodsToAvoid: [String], // e.g., ["Sweets", "Fried food"]
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Diet = mongoose.model("Diet", DietSchema);

module.exports = Diet;
