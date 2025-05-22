import React, { useEffect, useState } from 'react';
import { useAuth } from "../../Context/AuthContext";
import { axiosInstance } from "../../lib/axios";

const Yoga = () => {
  const [asanas, setAsanas] = useState([]);
  const [medi, setMedi] = useState([]);
  const [doshaProfile, setDoshaProfile] = useState([]);
  const { authUser } = useAuth();
  const userId = authUser?._id;

  useEffect(() => {
    const fetchYogaData = async () => {
      try {
        const res = await axiosInstance.get(`/yoga-profile/data/${userId}`);
        console.log(res.data);
        setAsanas(res.data.yogaPlans);
        setMedi(res.data.meditations);
      } catch (error) {
        console.error("API Error:", error);
      }
    };
    fetchYogaData();
    
    const fetchDoshaProfile = async () => {
      try {
        const res = await axiosInstance.get(`/dosha-profile/data/${userId}`);
        setDoshaProfile(res.data);
      } catch (error) {
        console.error("Failed to fetch dosha profile:", error);
      }
    };
    
    fetchDoshaProfile();
  }, [userId]);

  return (
    <div className="  bg-[#fff9ec] rounded-[15px] border border-[#d9d6cc] sm:p-6 min-h-screen min-w-screen lg:p-10   flex  flex-col gap-6 md:gap-8 justify-center items-center p-5">
      <h1 className="text-[22px] sm:text-[24px] font-semibold text-[#1a2a2a] leading-tight">
        Yoga &amp; Meditation 
      </h1>
      <p className="text-[15px] sm:text-[16px] text-[#1a2a2a] max-w-full sm:max-w-[480px] mt-1">
        Integrate yoga and meditation into your Ayurveda practice
      </p>

      <div className="flex flex-col md:flex-row md:justify-between mt-2 md:mt-6 gap-6 md:gap-8">
        
        {/* Meditation Section */}
        <div className="flex flex-col gap-6 md:max-w-[320px]  ">
          {medi.length > 0 ? medi.map((meditation) => (
            <div
              key={meditation._id}
              className="border border-[#d9d6cc] rounded-lg p-4 text-[#1a2a2a] h-auto"
            >
              <img
                src={meditation.image || "https://via.placeholder.com/300x160"}
                alt={meditation.name}
                className="w-full h-40 object-center rounded-md mb-4"
              />
              <h2 className="font-semibold text-[17px] sm:text-[18px] mb-1">{meditation.name}</h2>
              <p className="text-[15px] sm:text-[16px] font-normal leading-tight">
                {meditation.description || "Try calming and grounding meditation."}
              </p>
            </div>
          )) : (
            <div className="border border-[#d9d6cc] rounded-lg p-4 text-[#1a2a2a] h-auto">
              <img
                src="https://images.unsplash.com/photo-1553531889-56c5d1e6c3b8?auto=format&fit=crop&w=800&q=60"
                alt="Meditation"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="font-semibold text-[17px] sm:text-[18px] mb-1">Meditation</h2>
              <p className="text-[15px] sm:text-[16px] font-normal leading-tight">
                Try calming and grounding meditation
              </p>
            </div>
          )}
        </div>

        {/* Asanas Section */}
        <div className="border border-[#d9d6cc] rounded-lg p-4 text-[#1a2a2a] md:w-[500px]">
          <h2 className="font-semibold text-[17px] sm:text-[18px] mb-4">
            Recommended Asanas for {doshaProfile?.prakriti}
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {asanas.map((asana) => (
              <Asana
                key={asana._id}
                name={asana.name}
                src={asana.image || "https://via.placeholder.com/120x80"}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

const Asana = ({ name, src }) => (
  <div className="flex flex-col items-start gap-2">
    <span className="text-[15px] sm:text-[16px] font-normal">{name}</span>
    <img
      alt={`Illustration of a person doing ${name} yoga pose`}
      className="w-[120px] h-[80px] object-contain"
      src={src}
      width="120"
      height="80"
    />
  </div>
);

export default Yoga;
