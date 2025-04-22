import cnt from "../../assets/cnt.png";
import smile from "../../assets/smile.png";
import l from "../../assets/l.png";
import hrt from "../../assets/hrt.png";
import rm from "../../assets/rm.png";
import menimg from "../../assets/menimg.png";
import icon2 from "../../assets/icon2.png";

import leftlogo from "../../assets/leftlogo.png";
export default function Page3() {
  return (
    <main className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-5">
      {/* Left Column */}
      <section className="space-y-8">
        <h1 className="text-[#4a5a3a] text-2xl font-normal">
          Track Your Wellness
        </h1>
        {/* Healthy Card */}
        <div className="bg-[#fef6e3] rounded-md flex items-center p-6 gap-6 max-w-md">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-3">
              <div className="bg-[#a1b07a] rounded-full w-8 h-8 flex items-center justify-center text-white text-lg font-semibold">
                <i className="fas fa-user"></i>
              </div>
              <h2 className="text-[#4a5a3a] font-normal text-lg">Healthy</h2>
            </div>
            <p className="text-xs text-[#4a5a3a] max-w-[220px]">
              Receive a tailored nutrition plan designed specifically for your
              body and goals
            </p>
            <div className="flex items-center gap-3 bg-[#f9e9c9] rounded-md p-2 max-w-[140px]">
              <img
                src={menimg}
                alt="Illustration of a man avatar with beard and green shirt"
                className="rounded-md"
                width="40"
                height="40"
              />
              <span className="text-[#7a7a7a] text-sm">Rahul</span>
            </div>
          </div>
          <img
            src={leftlogo}
            alt="Illustration of a woman with dark hair and green shirt"
            className="rounded-md"
            width="120"
            height="120"
          />
        </div>
        {/* Join Our Community Challenges */}
        <div>
          <h2 className="text-[#4a5a3a] text-2xl font-normal leading-tight">
            Join Our Community Challenges
          </h2>
          <div className="flex gap-4 mt-4">
            <div className="bg-[#f9e9c9] rounded-md flex items-center gap-2 px-4 py-2 max-w-[130px]">
              <i className="fas fa-check-double text-[#7a7a7a]">
                <img src={l} alt="" />
              </i>
              <span className="text-[#7a7a7a] text-sm">7-Day Detox</span>
            </div>
            <div className="bg-[#f9e9c9] rounded-md flex items-center gap-2 px-4 py-2 max-w-[130px]">
              <i className="fas fa-heart text-[#7a7a7a]">
                <img src={hrt} alt="" />
              </i>
              <span className="text-[#7a7a7a] text-sm">No Suger</span>
            </div>
          </div>
        </div>
      </section>
      {/* Right Column */}
      <section className="space-y-8">
        {/* Dashboard Card */}
        <div className="bg-[#a1b07a] rounded-md p-6 max-w-md">
          <div className="bg-[#fef6e3] rounded-md p-6 relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[#4a5a3a] font-normal text-lg">Dashboard</h3>
              <button
                aria-label="Ether mer2"
                className="bg-[#f9e9c9] text-[#a1b07a] text-xs rounded-full px-3 py-1 flex items-center gap-1 cursor-default select-none"
              >
                <i className="fas fa-wallet"></i> Ether mer2
              </button>
            </div>
            <div className="flex justify-between gap-4">
              <div className="bg-white rounded-md p-4 flex flex-col items-center gap-2 w-1/3">
                <span className="text-3xl">
                  <img src={smile} alt="" />
                </span>
                <h4 className="text-[#4a5a3a] font-normal text-lg">Mood</h4>
                <p className="text-[#c1c1a6] text-xs">Good morning</p>
              </div>
              <div className="bg-white rounded-md p-4 flex flex-col items-center gap-2 w-1/3">
                <span className="text-3xl text-[#a1b07a]">
                  <img src={icon2} alt="" />
                </span>
                <h4 className="text-[#4a5a3a] font-normal text-lg">Sleep</h4>
                <p className="text-[#c1c1a6] text-xs">Eleep cycle</p>
              </div>
              <div className="bg-white rounded-md p-4 flex flex-col items-center gap-2 w-1/3">
                <span className="bg-[#a1b07a] text-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
                  ✓
                </span>
                <h4 className="text-[#4a5a3a] font-normal text-lg">Skin</h4>
                <p className="text-[#c1c1a6] text-xs">Slop poin</p>
              </div>
            </div>
          </div>
        </div>
        {/* Help Improving us Card */}
        <div className="bg-[#fef6e3] rounded-md p-6 max-w-md flex  gap-6">
          <div className=" flex flex-col gap-5">
            <h3 className="text-[#4a5a3a] font-normal text-lg">
              Help Improving us !!!
            </h3>
            <button
              aria-label="Contact us"
              className="bg-[#d67a52] text-[#f9e9c9] rounded-md px-6 py-3 flex items-center gap-3 max-w-[180px]"
            >
              <i className="fas fa-shopping-bag">
                <img src={cnt} alt="" />
              </i>{" "}
              Contact us
            </button>
            <p className="text-xs text-[#7a7a7a]">@subsribe our blog</p>
          </div>
          <div>
            <img
              src={rm}
              alt="Illustration of a man avatar with short hair and green shirt"
              className="rounded-md self-start"
              width="120"
              height="120"
            />
          </div>
        </div>
      </section>
      <footer class="bg-[#f9e9c9] mt-12 py-6   rouded-md w-[95vw]">
        <div class="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
          <div class="text-[#4a5a3a] text-sm">
            &copy; 2025 AyurWell. All rights reserved.
          </div>
          <nav class="flex gap-6 text-[#4a5a3a] text-sm font-medium">
            <a href="#about" class="hover:underline">
              About
            </a>
            <a href="#contact" class="hover:underline">
              Contact
            </a>
            <a href="#privacy" class="hover:underline">
              Privacy Policy
            </a>
            <a href="#terms" class="hover:underline">
              Terms of Service
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}

