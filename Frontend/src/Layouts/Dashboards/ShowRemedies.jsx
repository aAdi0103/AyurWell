import React from 'react';

const ShowRemedies = ({ remedy }) => {
  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-green-50 border border-gray-200 rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto my-10 transition-all duration-300 ease-in-out hover:shadow-green-200">

      {/* Header */}
      <div className="flex items-center mb-6">
        {remedy.image ? (
          <img src={remedy.image} alt={remedy.disease_name} className="w-24 h-24 object-cover rounded-full mr-6 border-4 border-green-300 shadow-md" />
        ) : (
          <div className="w-24 h-24 bg-green-100 rounded-full mr-6 flex items-center justify-center text-4xl shadow-inner">
            💊
          </div>
        )}
        <div>
          <h2 className="text-4xl font-extrabold text-green-800 mb-1">{remedy.disease_name}</h2>
          <p className="text-sm text-gray-600">Category: {remedy.category}</p>
          <span className="bg-green-200 text-green-900 px-3 py-1 rounded-full text-xs mt-2 inline-block shadow">
            {remedy.dosha} Dosha
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="mb-6 text-gray-700 italic text-base bg-gray-100 px-4 py-3 rounded-xl shadow-inner">
        📝 {remedy.description}
      </p>

      {/* Causes & Symptoms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div>
          <h3 className="text-xl font-semibold text-green-700 mb-2">💉 Causes</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            {remedy.causes.map((cause, i) => (
              <li key={i}>{cause}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-green-700 mb-2">❤️ Symptoms</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            {remedy.symptoms.map((symptom, i) => (
              <li key={i}>{symptom}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Herbs */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-green-700 mb-2">🌿 Herbal Remedies</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          {remedy.herbs.map((herb, i) => (
            <li key={i}>{herb}</li>
          ))}
        </ul>
      </div>

      {/* Diet Plan */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-green-700 mb-3">🍎 Diet Recommendations</h3>
        <div className="space-y-3">
          {Object.entries(remedy.diet_to_eat_detailed).map(([time, items]) => (
            <div key={time}>
              <h4 className="font-bold text-gray-800 capitalize">{time.replace('_', ' ')}:</h4>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-700">
                {items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Diet to Avoid */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-red-700 mb-2">🚫 Avoid These</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
          {remedy.diet_to_avoid.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Yoga & Pranayama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div>
          <h3 className="text-xl font-semibold text-green-700 mb-2">🧘 Yoga Asanas</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            {remedy.yoga_asanas.map((asana, i) => (
              <li key={i}>{asana}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-green-700 mb-2">🌬️ Pranayama</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            {remedy.pranayama.map((pranayam, i) => (
              <li key={i}>{pranayam}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Ayurvedic Treatments */}
      <div>
        <h3 className="text-xl font-semibold text-green-700 mb-2">💊 Ayurvedic Treatments</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          {remedy.treatments.map((treatment, i) => (
            <li key={i}>{treatment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShowRemedies;
