import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { axiosInstance } from '../../lib/axios';

const CheckboxGroup = ({ label, name, options, formData, setFormData }) => {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const currentSelections = formData[name] || [];
    if (checked) {
      setFormData({ ...formData, [name]: [...currentSelections, value] });
    } else {
      setFormData({
        ...formData,
        [name]: currentSelections.filter((item) => item !== value),
      });
    }
  };

  return (
    <div className="space-y-4 text-[#f7f1e5] min-w-[100rem] min-h-full ">
      <p className="font-medium text-lg">{label}</p>
      {options.map((option) => (
        <label key={option} className="flex items-center space-x-2">
          <input
            type="checkbox"
            name={name}
            value={option}
            checked={(formData[name] || []).includes(option)}
            onChange={handleCheckboxChange}
            className="accent-blue-500 transform scale-125"
          />
          <span className="text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  );
};

const Quiz = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [ resp ,setResp] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleFirstAction = async () => {
    console.log("Submitting data:", formData);
    try {
      const response = await axios.post('https://dosha-analyzer.onrender.com/log_data', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response.data);
      setResp(response.data);
      alert("Quiz submitted successfully!");
      return response.data;   // <-- return the data directly
    } catch (error) {
      console.error('Submission error:', error);
      alert("There was an error submitting the quiz.");
      throw error; // rethrow so catch block of handleSubmit can catch
    }
  };
  
  const handleSecondAction = async (data) => {
    if (!data) return;
    try {
      const res = await axiosInstance.post('/update/quizeResponse', {
        data: data,
      });
      console.log(res.data + " Quiz response updated successfully");
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const firstResult = await handleFirstAction();
      await handleSecondAction(firstResult);  // Pass data directly
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };
  

  const renderProgress = () => (
    <div className="flex justify-center items-center mb-6 space-x-2">
      {[1, 2, 3, 4, 5].map((s) => (
        <div
          key={s}
          className={`h-2 w-2 rounded-full ${step === s ? 'bg-blue-600' : 'bg-gray-300'} transition-all`}
        ></div>
      ))}
    </div>
  );

  const renderButton = () => (
    <div className="mt-6 flex justify-between">
      {step > 1 && (
        <button
          type="button"
          className="px-6 py-3 bg-gray-300 text-gray-800 rounded-md shadow-md hover:bg-gray-400 transition-colors"
          onClick={prevStep}
        >
          Back
        </button>
      )}
      {step < 5 && (
        <button
          type="button"
          className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors"
          onClick={nextStep}
        >
          Next
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-3xl shadow-lg mt-10">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Health & Wellness Questionnaire</h2>
      {renderProgress()}
      <form className="space-y-8" onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-6">
            <label className="block text-lg">Age Group:</label>
            <select name="ageGroup" onChange={handleChange} className="w-full border border-black rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>18–25</option>
              <option>26–35</option>
              <option>36–50</option>
              <option>51+</option>
            </select>

            <label className="block text-lg">Sex:</label>
            <select name="sex" onChange={handleChange} className="w-full border border-black rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Male</option>
              <option>Female</option>
              <option>Other / Prefer not to say</option>
            </select>

            <label className="block text-lg">Current City & Country:</label>
            <input
              name="location"
              type="text"
              onChange={handleChange}
              className="w-full border border-black rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <label className="block text-lg">Body Frame:</label>
            <select name="bodyFrame" onChange={handleChange} className="w-full border border-black rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Lean and light</option>
              <option>Medium and muscular</option>
              <option>Broad and stocky</option>
            </select>

            <label className="block text-lg">Skin Type:</label>
            <select name="skinType" onChange={handleChange} className="w-full border border-black  rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Dry and rough</option>
              <option>Sensitive or acne-prone</option>
              <option>Oily and moist</option>
            </select>
   
            <label className="block text-lg">Hair Type:</label>
            <select name="hairType" onChange={handleChange} className="w-full border border-black rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Thin, dry, and frizzy</option>
              <option>Soft, fine, may turn grey early</option>
              <option>Thick, oily, and dense</option>
            </select>

            <label className="block text-lg">Digestive Pattern:</label>
            <select name="digestivePattern" onChange={handleChange} className="w-full border border-black  rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Irregular (bloating, gas, sometimes constipated)</option>
              <option>Strong and fast (frequent hunger, acid reflux)</option>
              <option>Slow and heavy (sluggish after eating, feels full quickly)</option>
            </select>

            <label className="block text-lg">Daily Energy:</label>
            <select name="energy" onChange={handleChange} className="w-full border border-black rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Comes in bursts; can tire quickly</option>
              <option>Steady and intense but drains fast</option>
              <option>Consistent but slow to start</option>
            </select>

            <label className="block text-lg">Sleep:</label>
            <select name="sleep" onChange={handleChange} className="w-full border border-black rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Light sleeper, wakes easily</option>
              <option>Short but deep sleep</option>
              <option>Long and heavy sleeper</option>
            </select>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <label className="block text-lg">Emotional State:</label>
            <select name="emotion" onChange={handleChange} className="w-full border border-black  rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Anxious, restless, uncertain</option>
              <option>Irritable, competitive, impatient</option>
              <option>Calm but sometimes lazy or unmotivated</option>
            </select>

            <CheckboxGroup
              label="Symptoms:"
              name="symptoms"
              options={['Acidity or heartburn', 'Constipation or bloating', 'Headaches', 'Low energy', 'Skin rashes or acne', 'None of the above']}
              formData={formData}
              setFormData={setFormData}
            />

            <label className="block text-lg">Physical Activity:</label>
            <select name="exercise" onChange={handleChange} className="w-full border border-black  rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Rarely</option>
              <option>1–3 days a week</option>
              <option>4–6 days a week</option>
              <option>Daily</option>
            </select>

            <label className="block text-lg">Diet:</label>
            <select name="diet" onChange={handleChange} className="w-full border border-black rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Mostly processed/irregular meals</option>
              <option>Balanced with some unhealthy items</option>
              <option>Very mindful, fresh, and seasonal food</option>
            </select>

            <label className="block text-lg">Main Health Goal:</label>
            <select name="goal" onChange={handleChange} className="w-full border border-black rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Improve digestion & energy</option>
              <option>Balance mood/stress</option>
              <option>Improve skin/hair</option>
              <option>Regulate cycle/hormones</option>
              <option>Build immunity</option>
              <option>General wellness</option>
            </select>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <label className="block text-lg">Medical Conditions:</label>
            <input
              name="conditions"    
              type="text"
              onChange={handleChange}
              className="w-full border border-black rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-lg">Food Allergies:</label>
            <select name="allergies" onChange={handleChange} className="w-full border border-black  rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>No</option>
              <option>Yes</option>
            </select>
            {formData.allergies === 'Yes' && (
              <input
                name="allergyDetails"
                type="text"
                placeholder="Please specify"
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        )}

        {step === 5 && (
          <div className="text-center">
            <p className="font-semibold text-xl mb-6">Thank you for completing the survey!</p>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition-colors"
            >
              Submit
            </button>
          </div>
        )}

        {renderButton()}
      </form>
    </div>
  );

};

export default Quiz;


