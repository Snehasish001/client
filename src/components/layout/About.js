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
    name: "Saptarshi Chakraborty",
    role: "CEO",
    img: member2,
    link: "https://github.com/saptarshi222",
  },
  {
    name: "Bibhay Lakra",
    role: "Frontend Developer",
    img: member3,
    link: "https://www.linkedin.com/in/bibhay-lakra-b29004252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Bhargav Sarkar",
    role: "Data Analyst",
    img: member4,
    link: "https://www.linkedin.com/in/bhargab-sarkar-47a229374?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Arghyadeep Singh",
    role: "Database Engineer",
    img: member5,
    link: "https://in.linkedin.com/in/arghyadeep-singh",
  },
];

const About = () => {
  return (
    <div className="about-container">
      <div className="about-section">
        <h2>About Bike Finder</h2>
        <div className="about-content-row">
          <div className="about-text">
            <p>
              Bike Finder is a one-stop solution for exploring, comparing, and discovering motorcycles from top brands.
              Built for users looking to make informed decisions, our app simplifies bike discovery with powerful filters and detailed comparisons.
            </p><br></br>

            <p>
              Whether you're a seasoned rider or a first-time buyer, Bike Finder helps you navigate the wide range of models, features, and price points available in the market.
              With our intuitive interface, you can easily apply filters based on engine type, mileage, price, brand, and more to narrow down your options.
            </p><br></br>

            <p>
              Our comprehensive comparison tool allows side-by-side analysis of specifications, helping you weigh the pros and cons of each bike.
              We also provide expert reviews, user ratings, and real-time insights to guide your decision-making process.
            </p><br></br>

            <p>
              Bike Finder is regularly updated with the latest releases, ensuring that you're always aware of what's new in the biking world.
              From commuters to sports bikes, cruisers to electric models — we've got everything covered in one place.
            </p><br></br>
          </div>
          <img src={aboutImage} alt="Bike Finder" className="about-image" />
        </div>
      </div>

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
