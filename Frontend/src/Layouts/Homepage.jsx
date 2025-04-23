import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Homepage.css';
import Page2 from './Page2.jsx'; // Import the Page2 component
import { Link } from "react-router-dom";
import Page3 from './Dashboards/Page3.jsx'; 


const Homepage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="main">
    
      <div className="page1">
        {/* Navbar */}
        <motion.div
  className="nav"
  initial={{ y: -100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8 }}
>
  <div className="logo">
    <img src="https://www.pngarts.com/files/12/Ayurveda-Transparent-Images.png" alt="logo" />
    <h1 className='text-xl font-mono'>AyuPath</h1>
  </div>

  <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
    <div className="bar"></div>
    <div className="bar"></div>
    <div className="bar"></div>
  </div>

  <div className={`navElements ${menuOpen ? 'show' : ''}`}>
    <a className='text-4xl' href="#">Home</a>
    <a href="#">Features</a>
    <a href="#">Community</a>
    <a href="#">Contact</a>
  </div>
</motion.div>


        {/* Hero Section */}
        <motion.div 
          className="center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="content">
            <motion.h1
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Your Path to <br />
              Personalized Wellness <br />
              Through Ayurveda
            </motion.h1>

            <motion.h2
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Discover your Dosha. Balance your Life
            </motion.h2>


<div className="keys text-xl font-semibold">
  <Link to="/login">
    <motion.button
      id="startBut"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      Get Started
    </motion.button>
  </Link>

  <Link to="/quiz">
    <motion.button
      id="quizeBut"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      Take Dosha Quiz
    </motion.button>
  </Link>
</div>

          </div>

          <motion.div
            className="photo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <img src="../src/assets/firstpage.png" alt="hero" />
          </motion.div>
        </motion.div>
      </div>
   
      <Page2></Page2>
      <Page3></Page3>
    </div>
  );
};

export default Homepage;
