import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../components/styles/BikeDetails.css';
import '../styles/loading.css'; 
import { getData } from '../../Api';

const BikeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    getData(`api/get-bike/${id}`)
      .then(data => {
        setBike(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

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
        <p>Loading bike details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">Error: {error}</div>
        <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="error-container">
        <div className="error-message">Bike not found.</div>
        <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }


  const images = [bike.image1, bike.image2, bike.image3, bike.image4].filter(Boolean);
  const base = process.env.REACT_APP_API_URL;

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };


  const handleStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  }

  const handleEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const distance = touchEndX.current - touchStartX.current;

    if (distance > 50) handlePrevImage(); 
    if (distance < -50) handleNextImage(); 
  }

  return (
    <div className="bike-details-container">
      <div className="bike-details-card">
        <div className="image-gallery">
          <div className="slider-container" onTouchStart={handleStart} onTouchEnd={handleEnd}>
            {images.length > 0 ? (
              <>
                <button className="slider-arrow prev" onClick={handlePrevImage}>❮</button>
                <img
                  src={`${base}${images[currentImageIndex]}`}
                  alt={bike.name}
                  className="main-image"
                />
                <button className="slider-arrow next" onClick={handleNextImage}>❯</button>
                <div className="slider-indicator">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            ) : (
              <div className="main-image placeholder" />
            )}
          </div>
          <div className="thumbnail-container">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={`${base}${img}`}
                alt={`Bike ${idx + 1}`}
                className={`thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(idx)}
              />
            ))}
          </div>
        </div>
        <div className="bike-info-section">
          <div className="bike-main-info">
            <h1 className="bike-name">{bike.name}</h1>
            <div className="bike-price">₹{parseInt(bike.price).toLocaleString()}</div>
          </div>

          <div className="bike-meta-info">
            <div className="meta-item">
              <span className="meta-label">Brand</span>
              <span className="meta-value">{bike.brand}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Displacement</span>
              <span className="meta-value">{bike.displacement} cc</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Max Power</span>
              <span className="meta-value">{bike.max_power}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Max Torque</span>
              <span className="meta-value">{bike.max_torque}</span>
            </div>
          </div>

          <button className="contact-dealer">Contact Dealer</button>
        </div>
      </div>

      <div className="overview-section">
        <h2>Overview</h2>
        <p>{bike.about || bike.overview || "No description available."}</p>
      </div>

      <div className="specs-section">
        <div className="engine-performance">
          <h3 className="section-title">Engine & Performance</h3>
          <div className="specs-grid">
            <div className="spec-row">
              <span className="spec-key">Displacement</span>
              <span className="spec-value">{bike.displacement} cc</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Max Power</span>
              <span className="spec-value">{bike.max_power}</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Max Torque</span>
              <span className="spec-value">{bike.max_torque}</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Top Speed</span>
              <span className="spec-value">{bike.top_speed} km/h</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Cooling System</span>
              <span className="spec-value">{bike.cooling_system || '-'}</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Cylinders</span>
              <span className="spec-value">{bike.cylinders || '-'}</span>
            </div>
          </div>
        </div>

        <div className="transmission-chassis">
          <h3 className="section-title">Transmission & Chassis</h3>
          <div className="specs-grid">
            <div className="spec-row">
              <span className="spec-key">Transmission</span>
              <span className="spec-value">{bike.transmission || '-'}</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Gear Shifting Pattern</span>
              <span className="spec-value">{bike.gear_shifting_pattern || '-'}</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Kerb Weight</span>
              <span className="spec-value">{bike.weight ? `${bike.weight} kg` : '-'}</span>
            </div>
          </div>
        </div>

        <div className="brakes-wheels">
          <h3 className="section-title">Brakes & Wheels</h3>
          <div className="specs-grid">
            <div className="spec-row">
              <span className="spec-key">Braking System</span>
              <span className="spec-value">{bike.braking_system || '-'}</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Front Brake Type</span>
              <span className="spec-value">{bike.front_brake_type || '-'}</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Rear Brake Type</span>
              <span className="spec-value">{bike.rear_brake_type || '-'}</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Wheel Type</span>
              <span className="spec-value">{bike.wheel_type || '-'}</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Tyre Type</span>
              <span className="spec-value">{bike.tyre_type || '-'}</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Radial Tyres</span>
              <span className="spec-value">{bike.radial_tyres ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>

        <div className="dimensions">
          <h3 className="section-title">Dimensions</h3>
          <div className="specs-grid">
            <div className="spec-row">
              <span className="spec-key">Fuel Tank Capacity</span>
              <span className="spec-value">{bike.fuel_tank_capacity ? `${bike.fuel_tank_capacity} L` : '-'}</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Mileage</span>
              <span className="spec-value">{bike.mileage_owner_reported ? `${bike.mileage_owner_reported} km/L` : '-'}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default BikeDetails;
