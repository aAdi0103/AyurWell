import React, { useState, useEffect } from "react";
import axios from "axios";

const Insights = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // To manage modal visibility

  // Fetch weather data based on the city or user's location
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Bhopal&units=metric&appid=2c2c27a7168454c5f27667473ae34a3c`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  // Render loading state
  if (loading) {
    return <div>Loading weather data...</div>;
  }

  // Check if weather data is available
  if (!weatherData) {
    return <div>Failed to load weather data.</div>;
  }

  const { main, weather } = weatherData;

  // Example of insights based on weather
  const getWeatherInsight = () => {
    const temperature = main.temp;
    const weatherCondition = weather[0].main.toLowerCase();

    if (temperature > 30) {
      // Hot weather advice
      return {
        title: "Hot Weather Tips",
        advice: [
          "Stay hydrated. Drink plenty of water throughout the day.",
          "Avoid direct sun exposure, wear sunscreen.",
          "Wear lightweight and breathable clothes.",
        ],
        food: "Try cooling foods like fruits, smoothies, and salads.",
        ayurvedicTips: [
          "In Ayurveda, Pitta dosha is dominant in hot weather. Consume cooling foods like cucumbers and mint.",
          "Stay hydrated with coconut water and cooling herbs like coriander and fennel.",
        ],
      };
    }

    if (temperature < 15) {
      // Cold weather advice
      return {
        title: "Cold Weather Tips",
        advice: [
          "Wear warm clothes, including a coat and gloves.",
          "Drink warm beverages like tea, coffee, or hot chocolate.",
          "Be cautious of slipping on ice if it rains or snows.",
        ],
        food: "Eat warming foods like soups, stews, and roasted vegetables.",
        ayurvedicTips: [
          "In Ayurveda, Vata dosha is more dominant in cold weather. Eat warm, grounding foods like root vegetables.",
          "Spice up your meals with ginger and black pepper to promote warmth.",
        ],
      };
    }

    if (weatherCondition === "rain" || weatherCondition === "drizzle") {
      // Rainy weather advice
      return {
        title: "Rainy Weather Tips",
        advice: [
          "Stay dry, carry an umbrella or raincoat.",
          "Avoid outdoor activities if it's too wet.",
          "Take care to avoid slipping on wet sidewalks.",
        ],
        food: "Comfort foods like hot drinks, baked goods, or light snacks.",
        ayurvedicTips: [
          "In Ayurveda, Kapha dosha increases during the rainy season. Avoid heavy and greasy foods.",
          "Include spicy and warming foods like garlic and turmeric to balance the dampness.",
        ],
      };
    }

    // Moderate weather advice
    return {
      title: "Moderate Weather Tips",
      advice: [
        "Perfect weather for outdoor activities.",
        "Go for a walk, jog, or outdoor workout.",
        "Wear comfortable clothing for the temperature.",
      ],
      food: "Enjoy a balanced meal with a mix of proteins and greens.",
      ayurvedicTips: [
        "In balanced weather, all three doshas (Vata, Pitta, and Kapha) are in harmony. Eat a balanced diet.",
        "Incorporate a variety of seasonal fruits and vegetables into your meals.",
      ],
    };
  };

  const weatherInsight = getWeatherInsight();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h3 className="font-semibold text-2xl mb-3 text-indigo-600">🌟 Wellness Insights 🌟</h3>
      <p className="text-sm text-gray-600 font-semibold mb-4">Here are some tips to help you stay healthy in today's weather:</p>

      <div className="mt-4 space-y-4">
        <h4 className="font-semibold text-lg text-gray-800">{weatherInsight.title}</h4>

        <ul className="list-disc space-y-2 text-gray-700">
          {weatherInsight.advice.map((item, index) => (
            <li key={index} className="flex items-center">
              <span className="text-emerald-500 mr-2">✅</span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <p className="font-semibold text-lg text-gray-800">🍽️ What to Eat:</p>
          <p className="text-lg text-gray-600 italic">{weatherInsight.food}</p>
        </div>

        {/* Button to open modal with Ayurvedic insights */}
        <button
          onClick={openModal}
          className="mt-4 text-blue-600 hover:text-blue-800 font-semibold"
        >
          Learn Ayurvedic Tips for This Weather
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <button onClick={closeModal} className="absolute top-2 right-2 text-xl text-gray-500">
              ✖️
            </button>
            <h4 className="font-semibold text-xl text-gray-800 mb-4">Ayurvedic Insights for the Current Weather</h4>
            <ul className="space-y-4 text-gray-700">
              {weatherInsight.ayurvedicTips.map((tip, index) => (
                <li key={index}>
                  <span className="text-emerald-500 mr-2">🌱</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Insights;
