import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../../Api';
import '../styles/CategoryDetails.css';
import '../styles/loading.css';
import MotorcycleCard from './MotorcycleCard';

const CategoryDetails = () => {
  const { categoryName } = useParams();
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const categoryInfo = {
    street: { displayName: 'Street' },
    sport: { displayName: 'Sport' },
    adventure: { displayName: 'Adventure' },
    cruiser: { displayName: 'Cruiser' },
    supersport: { displayName: 'SuperSport' },
    retro: { displayName: 'Retro' },
    tourer: { displayName: 'Tourer' },
    dirt: { displayName: 'Dirt' },
  };

  useEffect(() => {
    const categoryKey = categoryName.toLowerCase();

    const categoryEntry = categoryInfo[categoryKey];
    if (!categoryEntry) {
      setError('Invalid category');
      setLoading(false);
      return;
    }

    const apiCategory = categoryEntry.displayName;
    console.log("apiCategory");
    console.log(`api/get-bike/category/${apiCategory}`);
    setLoading(true);
    getData(`api/get-bike/category/${apiCategory}/`)
      .then(data => {
        setBikes(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load bikes');
        setLoading(false);
      });
  }, [categoryName]);



  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <p>Loading Bikes</p>
      </div>
    );
  }

  const categoryKey = categoryName.toLowerCase();
  const displayName = categoryInfo[categoryKey]?.displayName || categoryName;

  return (
    <div className="category-details-container">
      <div className="category-header">
        <h1>{displayName}</h1>
        <p className="category-description">
          Browse all bikes in the {displayName} category.
        </p>
      </div>

      <div className="bikes-grid">
        {bikes.map(bike => (
          <MotorcycleCard
            key={bike.id}
            id={bike.id}
            image={bike.image1}
            name={bike.name}
            year={bike.year}
            category={bike.category}
            displacement={bike.displacement}
            description={bike.about || bike.description || 'No description.'}
            price={bike.price}
          />
        ))}
      </div>

      {bikes.length === 0 && (
        <div className="no-bikes">No bikes found for {displayName}.</div>
      )}
    </div>
  );
};

export default CategoryDetails;
