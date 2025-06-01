import '../styles/About.css';

const About = () => {
  const teamMembers = [
    {
      image: require('../assets/self photo/arghya.jpg'),
      name: 'Arghya',
      role: 'Frontend Developer',
      description: 'Specializes in creating responsive and interactive user interfaces using React.js'
    },
    {
      image: require('../assets/self photo/snehasis.jpg'),
      name: 'Snehasish',
      role: 'Lead Developer',
      description: 'Oversees the technical architecture and development of the project'
    },
    {
      image: require('../assets/self photo/saptarshi.jpg'),
      name: 'Saptarshi',
      role: 'Designer',
      description: 'Focuses on creating beautiful and functional design elements'
    },
    {
      image: require('../assets/self photo/bibhay.jpg'),
      name: 'Bibhay',
      role: 'UI/UX Designer',
      description: 'Creates intuitive and visually appealing designs for the best user experience'
    },
  ];

  return (
    <div className="about-container">
      <h1 className="about-title">Our Team</h1>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <div className="member-image">
              <img src={member.image} alt={member.name} />
            </div>
            <div className="member-info">
              <h2>{member.name}</h2>
              <h3>{member.role}</h3>
              <p>{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;