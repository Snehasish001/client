import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getData } from '../../Api';
import '../styles/BrandDetails.css';
import '../styles/loading.css';
import MotorcycleCard from './MotorcycleCard';

const brandMapping = {
  hero: 'Hero MotoCorp',
  'royal-enfield': 'Royal Enfield',
  yamaha: 'Yamaha',
  ktm: 'KTM',
  bajaj: 'Bajaj',
  ducati: 'Ducati',
  bmw: 'BMW',
  kawasaki: 'Kawasaki',
};

const brandInfo = {
  yamaha: {
    name: 'Yamaha',
    description:
      'Yamaha Motor Company is a Japanese manufacturer known for producing motorcycles, marine products, and other motorized vehicles.',
  },
  hero: {
    name: 'Hero MotoCorp',
    description:
      'Hero MotoCorp is an Indian multinational motorcycle and scooter manufacturer headquartered in New Delhi, India.',
  },
  ktm: {
    name: 'KTM',
    description:
      'KTM AG is an Austrian motorcycle and sports car manufacturer known for their off-road motorcycles and high-performance street bikes.',
  },
  'royal-enfield': {
    name: 'Royal Enfield',
    description:
      'Royal Enfield is an Indian multinational motorcycle manufacturing company, known for its classic-styled motorcycles.',
  },
  bajaj: {
    name: 'Bajaj',
    description:
      'Bajaj Auto is an Indian multinational manufacturer of motorcycles, three-wheelers and quadricycles.',
  },
  ducati: {
    name: 'Ducati',
    description:
      'Ducati Motor Holding S.p.A. is an Italian motorcycle manufacturing company known for high-performance motorcycles.',
  },
  bmw: {
    name: 'BMW',
    description:
      'BMW Motorrad is the motorcycle division of BMW, known for producing premium motorcycles with advanced technology.',
  },
  kawasaki: {
    name: 'Kawasaki',
    description:
      'Kawasaki Heavy Industries Motorcycle & Engine is a Japanese manufacturer of motorcycles, known for their powerful sports bikes.',
  },
};

const BrandDetails = () => {
  const { brandId } = useParams();
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const brandDisplayName = brandMapping[brandId];

  // Scroll to top when brandId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [brandId]);

  useEffect(() => {
    if (!brandDisplayName) return;

    setLoading(true); // ✅ fix: avoid blank screen on back

    getData('api/get-bike/')
      .then((data) => {
        const brandBikes = data.filter((bike) => bike.brand === brandDisplayName);
        setBikes(brandBikes);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [brandDisplayName]);

  if (!brandInfo[brandId]) {
    return <div className="brand-not-found">Brand not found</div>;
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

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="brand-details-container">
      <div className="brand-header">
        <h1>{brandInfo[brandId].name}</h1>
        <p className="brand-description">{brandInfo[brandId].description}</p>
      </div>

      {bikes.length === 0 ? (
        <div className="no-bikes">No bikes found for {brandInfo[brandId].name}.</div>
      ) : (
        <div className="bikes-grid">
          {bikes.map((bike) => (
            <Link
              key={bike.id}
              to={`/bike/${bike.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <MotorcycleCard
                id={bike.id}
                image={bike.image1}
                name={bike.name}
                year={bike.year}
                category={bike.category}
                displacement={bike.displacement}
                description={bike.about || bike.description || 'No description available.'}
                price={bike.price}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandDetails;
