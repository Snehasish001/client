import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HeroSection.css';
import { getData } from '../../Api';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchContainerRef = useRef(null);

  // Fetch all bikes for suggestions
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const data = await getData('api/get-bike/');
        setBikes(data);
      } catch (error) {
        console.error('Error fetching bikes:', error);
      }
    };
    fetchBikes();
  }, []);

  // Filter suggestions based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filteredBikes = bikes.filter(bike =>
      bike.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filteredBikes.slice(0, 5)); // Limit to 5 suggestions
  }, [searchTerm, bikes]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to a search results page or filter the bike list
      // For now, we'll just log the search term
      console.log('Searching for:', searchTerm);
      // You could implement navigation to a search results page like this:
      // navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleSuggestionClick = (bikeId) => {
    navigate(`/bike/${bikeId}`);
    setShowSuggestions(false);
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Find Your Dream Motorcycle</h1>
        <p>
          Find the perfect ride for your next adventure.
        </p>
        
        <div className="search-container" ref={searchContainerRef}>
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search your bike here, e.g. Royal Enfield Hunter 350"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                className="search-input"
              />
            </div>
            <button type="submit" className="search-button">Search</button>
          </form>
          
          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((bike) => (
                <li 
                  key={bike.id} 
                  onClick={() => handleSuggestionClick(bike.id)}
                  className="suggestion-item"
                >
                  <div className="suggestion-content">
                    <img 
                      src={`${process.env.REACT_APP_API_URL}${bike.image1}`} 
                      alt={bike.name} 
                      className="suggestion-image" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/40x40?text=No+Image';
                      }}
                    />
                    <div className="suggestion-details">
                      <span className="suggestion-name">{bike.name}</span>
                      <span className="suggestion-price">₹{parseInt(bike.price).toLocaleString()}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
