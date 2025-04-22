import React from 'react'

const Yoga = () => {
  return (
  
    //  <meta charset="utf-8"/>
    //  <meta content="width=device-width, initial-scale=1" name="viewport"/>
    //  <title>
    //   Yoga &amp; Meditation
    //  </title>
    //  <script src="https://cdn.tailwindcss.com">
    //  </script>  <html lang="en">
    // <head>
    //  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
    // </head>
    // <body class="bg-[#fff9ec] min-h-screen flex items-center justify-center p-4">
     <div class="  overflow-y-hidden bg-[#fff9ec] rounded-[15px] border border-[#d9d6cc]   sm:p-6   min-h-full max-w-[53rem] flex flex-col gap-6 md:gap-8">
      <h1 class="text-[22px] sm:text-[24px] font-semibold text-[#1a2a2a] leading-tight">
       Yoga &amp; Meditation
      </h1>
      <p class="text-[15px] sm:text-[16px] text-[#1a2a2a] max-w-full sm:max-w-[480px] mt-1">
       Integrate yoga and meditation into your
       
        Ayurveda
     
       practice
      </p>
      <div class="flex flex-col md:flex-row md:justify-between mt-2 md:mt-6 gap-6 md:gap-8">
       <div class="flex flex-col gap-6 md:w-[320px]">
        
        <div class="border border-[#d9d6cc] rounded-lg p-4 text-[#1a2a2a] h-[95px]">
         <h2 class="font-semibold text-[17px] sm:text-[18px] mb-1 ">
          Meditation
         </h2>
         <p class="text-[15px] sm:text-[16px] font-normal leading-tight">
          Try calming and grounding meditation
         </p>
        </div>
       </div>
       <div class="border border-[#d9d6cc] rounded-lg p-4 text-[#1a2a2a] md:w-[500px]">
        <h2 class="font-semibold text-[17px] sm:text-[18px] mb-4">
         Recommended Asanas for Kapha
        </h2>
        <div class="grid grid-cols-2 gap-x-8 gap-y-6">
         <div class="flex flex-col items-start gap-2">
          <span class="text-[15px] sm:text-[16px] font-normal">
           Warrior I
          </span>
          <img alt="Illustration of a person doing Warrior I yoga pose" class="w-[120px] h-[80px] object-contain" height="80" src="https://storage.googleapis.com/a1aa/image/0566897d-66f6-433f-ad37-d9f8952b61f8.jpg" width="120"/>
         </div>
         <div class="flex flex-col items-start gap-2">
          <span class="text-[15px] sm:text-[16px] font-normal">
           Bridge Pose
          </span>
          <img alt="Illustration of a person doing Bridge yoga pose" class="w-[120px] h-[80px] object-contain" height="80" src="https://storage.googleapis.com/a1aa/image/7d1891c1-1d12-4425-62b7-0025905887e4.jpg" width="120"/>
         </div>
         <div class="flex flex-col items-start gap-2">
          <span class="text-[15px] sm:text-[16px] font-normal">
           Seated Forward Bend
          </span>
          <img alt="Illustration of a person doing Seated Forward Bend yoga pose" class="w-[120px] h-[80px] object-contain" height="80" src="https://storage.googleapis.com/a1aa/image/322957af-3549-4723-4218-5561ddeb81ac.jpg" width="120"/>
         </div>
         <div class="flex flex-col items-start gap-2">
          <span class="text-[15px] sm:text-[16px] font-normal">
           Camel Pose
          </span>
          <img alt="Illustration of a person doing Camel yoga pose" class="w-[120px] h-[80px] object-contain" height="80" src="https://storage.googleapis.com/a1aa/image/f14c5871-d539-4e09-887b-97631d3d63b2.jpg" width="120"/>
         </div>
        </div>
       </div>
      </div>
     </div>
   
   
  )
}

export default Yoga
