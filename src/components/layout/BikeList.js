import { useState, useEffect } from 'react';
import { getData } from '../../Api';
import MotorcycleCard from './MotorcycleCard';
import '../styles/BikeList.css';
import '../styles/loading.css'; 
const BikeList = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newLaunches, setNewLaunches] = useState([]);
  const [regularBikes, setRegularBikes] = useState([]);

  useEffect(() => {
    getData('api/get-bike/') 
      .then(data => {
        const sortedBikes = [...data].sort((a, b) => b.year - a.year);
        const currentYear = new Date().getFullYear();
        const launches = sortedBikes.filter(bike => bike.year >= currentYear - 1);
        setNewLaunches(launches);

        const regular = sortedBikes.filter(bike => bike.year < currentYear - 1);
        setRegularBikes(regular);

        setBikes(data);
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
      <div className="loading-container"> 
        <div className="loading"> 
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p>Loading Bikes</p> 
      </div>
    );
  }
  if (error) return <p>Error: {error}</p>;
  const bikesPerRow = 4;
  const regularBikesToShow = regularBikes.slice(0, bikesPerRow * 2);
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