import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../Context/AuthContext';
import { axiosInstance } from '../../lib/axios';

const DietPlanner = () => {
  const [showForm, setShowForm] = useState(false);
  const [dietPlans, setDietPlans] = useState([]);
  
  
  const [formData, setFormData] = useState({
    diseases: '',
    goals: '',
    duration: '',
    dosha: '',
  });

  // Fetching diet plans when component mounts
  useEffect(() => {
    fetchDietPlans();
  }, []);

  const fetchDietPlans = async () => {
    try {
      const response = await axiosInstance.get("/auth/dietplans");
      // console.log(response.data); // Check the fetched data
      console.log(response.data); // Check the fetched data
      
      setDietPlans(response.data); // Update the state with fetched data
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
        goals: [formData.goals], // Now it's a single selected goal wrapped in an array
        duration: formData.duration,
        dosha: formData.dosha,
      };

      // Send the form data to the backend
      const res = await axios.post('', formattedData);
      console.log(res.data); // Check the response from the server
      alert("Diet plan submitted!");
      setShowForm(false);
      setFormData({ diseases: '', goals: '', duration: '', dosha: '' });
      fetchDietPlans(); // Fetch the updated diet plans
    } catch (err) {
      console.error("Error submitting plan:", err);
    }
  };

  return (
    <div className="p-8 bg-white shadow-xl rounded-2xl max-w-3xl mx-auto items-center justify-center  flex flex-col mt-20 md:mt-0">
      <h2 className="text-3xl font-bold mb-2 text-center text-green-700  ">Diet Planner</h2>
      <p className="text-center text-gray-600 mb-6">Track your health goals with personalized diet suggestions</p>

      {/* Display Diet Plans */}
      {!showForm && (
      <div className="space-y-6">
      
      {dietPlans ? (
        <div className="bg-white p-6 rounded-xl border shadow-lg space-y-6">
          {/* Meal Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-green-700 mb-2 text-lg">🍳 Breakfast</h5>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {dietPlans.breakfast?.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
    
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-yellow-700 mb-2 text-lg">🥗 Lunch</h5>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {dietPlans.lunch?.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
    
            <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-red-700 mb-2 text-lg">🍽 Dinner</h5>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {dietPlans.dinner?.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>
    
          {/* Foods to Favor */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-sm mt-4">
            <h5 className="font-semibold text-green-700 mb-2 text-lg">🍀 Foods to Favor</h5>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {dietPlans.foodsToFavor?.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
    
          {/* Foods to Avoid */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-sm mt-4">
            <h5 className="font-semibold text-red-700 mb-2 text-lg">🚫 Foods to Avoid</h5>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {dietPlans.foodsToAvoid?.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
    
          {/* Recommendations */}
          {dietPlans.recommendations?.length > 0 && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg shadow-sm mt-4">
              <h5 className="font-semibold text-blue-700 mb-2 text-lg">📌 Recommendations</h5>
              <p className="text-sm text-gray-700">{dietPlans.recommendations.join(', ')}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">No diet plans found.</p>
      )}
    </div>
    
     
      )}

      {/* Form to Create New Diet Plan */}
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
              {/* Form Fields for Diseases, Goals, Duration, Dosha */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Diseases</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
                  placeholder="e.g. Diabetes, Hypertension"
                  value={formData.diseases}
                  onChange={(e) => setFormData({ ...formData, diseases: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Goal</label>
                <select
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  <option value="">Select Goal</option>
                  <option value="Weight Gain">Weight Gain</option>
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Muscle Gain">Muscle Gain</option>
                  <option value="Detox">Detox</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
                  placeholder="e.g. 30 Days"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Dosha</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
                  placeholder="e.g. Pitta, Vata, Kapha"
                  value={formData.dosha}
                  onChange={(e) => setFormData({ ...formData, dosha: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
              >
                Create Plan
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DietPlanner;
