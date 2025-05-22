import "./Page2.css";
import { motion } from "framer-motion";

const Page2 = () => {
  return (
    <div className='page2 h-full w-full  mt-40 md:mt-0 bg-[#FFFEF4]'>

      <div className="bodyType">

        <h1>What's Your Body Type?
          <br />
          <span>Take The Quiz</span>
        </h1>

           {["Vata", "Pitta", "Kapha"].map((type, index) => {
          const images = [
            "https://www.drkrishnaonline.com/images/vata.png",
            "https://yogiveda.de/wp-content/uploads/2021/01/pitta-dosha.png",
            "https://www.drkrishnaonline.com/images/kapha.png"
          ];
          return (
            <motion.div
  className="cir"
  key={type}
  whileInView={{ opacity: 1, scale: 1, y: 0 }}
  initial={{ opacity: 0, scale: 0.9, y: 30 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{
    duration: 0.6,
    delay: index * 0.2,
    ease: [0.25, 0.1, 0.25, 1]
  }}
>

              <div className="gola">
                <img src={images[index]} alt={type} />
              </div>
              <h3>{type}</h3>
            </motion.div>
          );
        })}

      </div>

      <div className="features">
        <h1>Features</h1>

        <div className="allcards">
          {[
            {
              title: "AI Wellness Assistant",
              desc: "Answers all your basic wellness queries and gives smart insights",
              img: "https://www.pngmart.com/files/21/AI-PNG-HD.png"
            },
            {
              title: "Personalized Diet Plan",
              desc: "Get meals crafted for your body type and goals",
              img: "https://www.pngall.com/wp-content/uploads/5/Diet-PNG-Clipart.png"
            },
            {
              title: "Exercise Routine",
              desc: "Daily fitness tailored to your energy type",
              img: "https://static.vecteezy.com/system/resources/previews/019/053/829/original/children-fitness-exercise-png.png"
            },
            {
              title: "Mindfulness Coach",
              desc: "Track your mood and improve your mental clarity",
              img: "https://www.pngall.com/wp-content/uploads/12/Mindfulness-Concept-PNG-HD-Image.png"
            }
          ].map((feature, index) => (
            <motion.div
            className="card"
            key={feature.title}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
          
              <img src={feature.img} alt={feature.title} />
              <h2>{feature.title}</h2>
              <h3>{feature.desc}</h3>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Page2;
