import React from 'react';
import TeamSwiper from '../layout/TeamSwiper';
import '../styles/TeamSwiper.css';
import '../styles/About.css'; // <-- Import your new or updated CSS file

const About = () => {
  return (
    <div className="waving-gradient-background"> {/* Apply the class here */}
      <section className="team-section">
        <h2 style={{ color: 'white' }}></h2> {/* Adjust text color for readability */}
        <TeamSwiper />
      </section>

      {/* You might want to add more content here for the about page */}
      {/* Ensure text within this div has good contrast with the gradient */}
      {/* For example: */}
      {/* <p style={{ color: 'white' }}>More about us...</p> */}
    </div>
  );
};

export default About;
