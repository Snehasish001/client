import { useState, useEffect } from 'react';
import { getData } from '../../Api';
import MotorcycleCard from './MotorcycleCard';
import '../styles/BikeList.css';
import '../styles/loading.css'; // Import the loading animation styles

const BikeList = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newLaunches, setNewLaunches] = useState([]);
  const [regularBikes, setRegularBikes] = useState([]);

  useEffect(() => {
    getData('api/get-bike/') // Keeping the API fetch logic as requested
      .then(data => {
        // Sort bikes by year in descending order
        const sortedBikes = [...data].sort((a, b) => b.year - a.year);

        // Get the newest year bikes as new launches
        const currentYear = new Date().getFullYear();
        const launches = sortedBikes.filter(bike => bike.year >= currentYear - 1);
        setNewLaunches(launches);

        // The rest are regular bikes
        const regular = sortedBikes.filter(bike => bike.year < currentYear - 1);
        setRegularBikes(regular);

        setBikes(data); // Keep the original data for reference if needed
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container"> {/* New container div */}
        <div className="loading"> {/* The animation HTML */}
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p>Loading Bikes</p> {/* The text below the animation */}
      </div>
    );
  }
  if (error) return <p>Error: {error}</p>;

  // Calculate how many bikes to show per row based on screen width
  // For simplicity, let's assume 4 bikes per row on desktop
  const bikesPerRow = 4;

  // Limit regular bikes to 2 rows (8 bikes)
  const regularBikesToShow = regularBikes.slice(0, bikesPerRow * 2);

  // Limit new launches to 2 rows (8 bikes)
  const newLaunchesToShow = newLaunches.slice(0, bikesPerRow * 2);

  return (
    <div className="bikes-container">
      <div className="regular-bikes-section">
        <h2 className="section-title">Popular Bikes</h2>
        <div className="bike-list">
          {regularBikesToShow.map(bike => (
            <MotorcycleCard
              key={bike.id}
              id={bike.id}
              image={bike.image1}
              name={bike.name}
              year={bike.year || '—'}
              category={bike.category || '—'}
              displacement={bike.displacement}
              description={bike.about || 'No description.'}
              price={bike.price}
              isTrending={false}
            />
          ))}
        </div>
      </div>

      {newLaunchesToShow.length > 0 && (
        <div className="new-launches-section">
          <h2 className="section-title">New Launches</h2>
          <div className="bike-list">
            {newLaunchesToShow.map(bike => (
              <MotorcycleCard
                key={bike.id}
                id={bike.id}
                image={bike.image1}
                name={bike.name}
                year={bike.year || '—'}
                category={bike.category || '—'}
                displacement={bike.displacement}
                description={bike.about || 'No description.'}
                price={bike.price}
                isTrending={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BikeList;