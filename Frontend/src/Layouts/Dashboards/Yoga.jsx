import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Yoga = () => {
  const [dosha,setDosha] = useState();
  useEffect(() => {

//     const getUserData= async ()=>{
// const dosha = axios.get();
// setDosha(dosha);

//     }
    const fetchYogaData = async () => {

      try {
        const res = await axios.post("http://192.168.114.13:5000/get_yoga", {
          "dosha": "kapha",
        });
        console.log(res.data); // You can set this to state to dynamically render data
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchYogaData();
  }, []);

  return (
    <div className="overflow-y-hidden bg-[#fff9ec] rounded-[15px] border border-[#d9d6cc] sm:p-6 min-h-full max-w-[53rem] flex flex-col gap-6 md:gap-8">
      <h1 className="text-[22px] sm:text-[24px] font-semibold text-[#1a2a2a] leading-tight">
        Yoga &amp; Meditation
      </h1>
      <p className="text-[15px] sm:text-[16px] text-[#1a2a2a] max-w-full sm:max-w-[480px] mt-1">
        Integrate yoga and meditation into your Ayurveda practice
      </p>

      <div className="flex flex-col md:flex-row md:justify-between mt-2 md:mt-6 gap-6 md:gap-8">
        <div className="flex flex-col gap-6 md:w-[320px]">
          <div className="border border-[#d9d6cc] rounded-lg p-4 text-[#1a2a2a] h-[95px]">
            <h2 className="font-semibold text-[17px] sm:text-[18px] mb-1">Meditation</h2>
            <p className="text-[15px] sm:text-[16px] font-normal leading-tight">
              Try calming and grounding meditation
            </p>
          </div>
        </div>

        <div className="border border-[#d9d6cc] rounded-lg p-4 text-[#1a2a2a] md:w-[500px]">
          <h2 className="font-semibold text-[17px] sm:text-[18px] mb-4">
            Recommended Asanas for Kapha
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {/* Replace these hardcoded asanas with dynamic content from API if needed */}
            <Asana name="Warrior I" src="https://storage.googleapis.com/a1aa/image/0566897d-66f6-433f-ad37-d9f8952b61f8.jpg" />
            <Asana name="Bridge Pose" src="https://storage.googleapis.com/a1aa/image/7d1891c1-1d12-4425-62b7-0025905887e4.jpg" />
            <Asana name="Seated Forward Bend" src="https://storage.googleapis.com/a1aa/image/322957af-3549-4723-4218-5561ddeb81ac.jpg" />
            <Asana name="Camel Pose" src="https://storage.googleapis.com/a1aa/image/f14c5871-d539-4e09-887b-97631d3d63b2.jpg" />
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
