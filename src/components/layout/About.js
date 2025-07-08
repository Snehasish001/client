import React from "react";
import "../styles/About.css";

import reactLogo from "../assets/backendLogo/react-2.svg";
import mysqlLogo from "../assets/backendLogo/mysql-logo-svgrepo-com.svg";
import restLogo from "../assets/backendLogo/Django REST.svg";
import djangoLogo from "../assets/backendLogo/django-svgrepo-com.svg";

import aboutImage from "../assets/bike-logo.svg";

import member1 from "../assets/self photo/snehasish.jpg";
import member2 from "../assets/self photo/saptarshi.jpg";
import member3 from "../assets/self photo/bibhay.jpg";
import member4 from "../assets/self photo/bharghav.jpg";
import member5 from "../assets/self photo/arghya.jpg";

const team = [
  {
    name: "Snehasish Sarkar",
    role: "Backend Engineer",
    img: member1,
    link: "https://github.com/Snehasish001",
  },
  {
    name: "Saptarshi Chowdhury",
    role: "CEO",
    img: member2,
    link: "https://linkedin.com/",
  },
  {
    name: "Bibhay Lakra",
    role: "Frontend",
    img: member3,
    link: "https://github.com/",
  },
  {
    name: "Bhargav Sarkar",
    role: "Data Analyst",
    img: member4,
    link: "https://linkedin.com/",
  },
  {
    name: "Arghyadeep Singh",
    role: "Database Engineer",
    img: member5,
    link: "https://github.com/",
  },
];

const About = () => {
  return (
    <div className="about-container">

      {/* About Bike Finder */}
      <div className="about-section">
        <div className="about-text">
          <h2>About Bike Finder</h2>
          <p>
            Bike Finder is a one-stop solution for exploring, comparing, and discovering motorcycles from top brands. Built for users looking to make informed decisions, our app simplifies bike discovery with powerful filters and detailed comparisons.
          </p>
        </div>
        <img src={aboutImage} alt="Bike Finder" className="about-image" />
      </div>

      {/* Tech Stack */}
      <div className="tech-section">
        <div className="tech-logos-diamond">
          <img src={reactLogo} alt="React.js" className="logo logo-top" />
          <img src={restLogo} alt="REST API" className="logo logo-left" />
          <img src={djangoLogo} alt="Django" className="logo logo-right" />
          <img src={mysqlLogo} alt="MySQL" className="logo logo-bottom" />
        </div>

        <div className="tech-description">
          <h2>Tech Stack</h2>
          <p>
            We used <strong>React.js</strong> for the frontend, <strong>Django REST Framework</strong> for the backend, and <strong>MySQL</strong> as our primary database.  
            The frontend is deployed on <strong>Vercel</strong> and the backend on <strong>PythonAnywhere</strong>.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-cards">
          {team.map((member, index) => (
            <div className="team-card" key={index}>
              <img src={member.img} alt={member.name} />
              <h4>{member.name}</h4>
              <p>{member.role}</p>
              <a href={member.link} target="_blank" rel="noreferrer">Profile</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
