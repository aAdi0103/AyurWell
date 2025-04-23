import React from "react";

const doctors = [
    {
      name: "Dr. Ananya Iyer",
      specialization: "Ayurvedic Medicine",
      experience: "15 years",
      image: "https://authenticayurvedacentre.com/wp-content/uploads/2023/06/Dr.-Nisha-2.jpg",
    },
    {
      name: "Dr. Kavita Desai",
      specialization: "Herbal Medicine",
      experience: "8 years",
      image: "https://www.ayurvedakendra.in/wp-content/uploads/2024/09/Best-Ayurvedic-Doctor-in-Delhi.jpg",
    },
    {
      name: "Dr. Arjun Mehta",
      specialization: "Ayurvedic Nutrition",
      experience: "12 years",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0N0L27driTXyBhnIfssxzlHuG_EwtXgHGPA&s",
    },
  ];
  

const Constation = () => {
  return (
    <div className="bg-[#fdf6ed] min-h-screen px-6 py-10 font-sans text-[#333]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-2">Consultation</h1>
        <p className="text-lg mb-6">
          Receive personalized guidance and support from experienced Ayurvedic doctors.
        </p>

        <div className="bg-[#fff] rounded-xl p-6 mb-8 shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-full sm:w-2/3">
            <h2 className="text-xl font-semibold mb-2">Consultation Request</h2>
            <textarea
              placeholder="Describe your symptoms or health concerns:"
              className="w-full h-32 border border-gray-300 rounded-lg p-3 resize-none bg-[#faf4e8]"
            ></textarea>
            <button className="mt-4 bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition">
              Submit Request
            </button>
          </div>

          <div className="w-full sm:w-1/3 flex justify-center">
            <img
              src="https://i0.wp.com/medesol.com/wp-content/uploads/2020/02/ayur.png?fit=719%2C475&ssl=1"
              alt="Doctor Illustration"
              className="w-[30vw] h-40 object-contain"
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Available Doctors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {doctors.map((doc, index) => (
    <div
      key={index}
      className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4"
    >
      <img
        src={doc.image}
        alt={doc.name}
        className="w-16 h-16 rounded-full object-cover border border-gray-300"
      />
      <div className="flex-1">
        <h3 className="font-bold">{doc.name}</h3>
        <p className="text-sm text-gray-600">{doc.specialization}</p>
        <p className="text-sm text-gray-500">{doc.experience}</p>
      </div>
      <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition">
        Contact
      </button>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default Constation;
