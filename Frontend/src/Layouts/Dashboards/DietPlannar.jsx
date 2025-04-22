import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';

const DietPlanner = () => {
  const [showForm, setShowForm] = useState(false);
  const [dietPlans, setDietPlans] = useState([]);

  const [formData, setFormData] = useState({
    diseases: '',
    goals: '',
    duration: '',
  });

  useEffect(() => {
    fetchDietPlans();
  }, []);

  const fetchDietPlans = async () => {
    try {
      // Uncomment below when backend API is ready
      // const res = await axios.get('/api/diet');
      // setDietPlans(res.data);

      // Demo data:
      setDietPlans([
        {
          
            userId: "user123",
            diseases: ["Diabetes"],
            goals: ["Weight Loss"],
            duration: "30 Days",
            foodToFavor: ["Leafy greens", "Whole grains", "Lean proteins"],
            foodToAvoid: ["Sugary drinks", "Refined carbs", "Processed snacks"],
            recommendations: "Follow a low-carb diet with consistent meal timing. Monitor glucose regularly."
          
        },
      ]);
    } catch (err) {
      console.error("Failed to fetch diet plans:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = "USER_ID"; // Replace with actual user ID

      const formattedData = {
        userId,
        diseases: formData.diseases.split(',').map((d) => d.trim()),
        goals: formData.goals.split(',').map((g) => g.trim()),
        duration: formData.duration,
      };

      await axios.post('/api/diet', formattedData);
      alert("Diet plan submitted!");
      setShowForm(false);
      setFormData({ diseases: '', goals: '', duration: '' });
      fetchDietPlans();
    } catch (err) {
      console.error("Error submitting plan:", err);
    }
  };

  return (
    <div className="p-8 bg-white shadow-xl rounded-2xl max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-center text-green-700">Diet Planner</h2>
      <p className="text-center text-gray-600 mb-6">Track your health goals with personalized diet suggestions</p>

      <div className="flex justify-center mb-6">
        <button
          className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Close Form' : 'Create New Plan'}
        </button>
      </div>

      {!showForm && (
  <div className="space-y-6">
    {dietPlans.length > 0 ? (
      dietPlans.map((plan, idx) => (
        <div key={idx} className="bg-gray-100 p-6 rounded-xl border shadow space-y-4">
          <h4 className="text-xl font-bold text-green-800">Plan #{idx + 1}</h4>
          <p><strong>Diseases:</strong> {plan.diseases.join(', ')}</p>
          <p><strong>Goals:</strong> {plan.goals.join(', ')}</p>
          <p><strong>Duration:</strong> {plan.duration}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded shadow">
              <h5 className="font-semibold text-green-700 mb-2">🍀 Foods to Favor</h5>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {plan.foodToFavor?.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow">
              <h5 className="font-semibold text-red-700 mb-2">🚫 Foods to Avoid</h5>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {plan.foodToAvoid?.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>

          {plan.recommendations && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded shadow mt-4">
              <h5 className="font-semibold text-blue-700 mb-2">📌 Recommendations</h5>
              <p className="text-sm text-gray-700">{plan.recommendations}</p>
            </div>
          )}
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500">No diet plans found.</p>
    )}
  </div>
)}


      <AnimatePresence>
        {showForm && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 p-6 rounded-xl border shadow space-y-6 mt-4"
          >
            <div className="space-y-4">
              {['diseases', 'goals', 'duration'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
                    placeholder={`Enter ${field}`}
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
              >
                Submit Plan
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DietPlanner;
