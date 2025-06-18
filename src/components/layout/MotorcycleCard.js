// src/components/Motorcycles/MotorcycleCard.js
import '../styles/MotorcycleCard.css';
import { useNavigate } from 'react-router-dom';

const MotorcycleCard = ({
  id,
  image,
  name,
  year,
  category,
  displacement,
  description,
  isTrending = false
}) => {
  const navigate = useNavigate();
  const base = process.env.REACT_APP_API_URL;

  const cardClick = (e) => {
    e.preventDefault();
    navigate(`/bike/${id}`);
  }

  return (
    <div className="bike-card" onClick={cardClick}>
      <div className="bike-image-wrapper">
        <img src={`${base}${image}`} alt={name} className="bike-image" />
        {isTrending && <span className="badge">Trending</span>}
      </div>

      <div className="bike-info">
        <div className="title-row">
          <h2 className="bike-title">{name}</h2>
          {displacement && (
            <span className="displacement-badge">{displacement} cc</span>
          )}
        </div>

        <p className="bike-meta">
          {year} &bull; {category}
        </p>

        <p className="bike-description">{description}</p>

        <div className="card-footer">
          <button
            className="details-button"
            // onClick={() => navigate(`/bike/${id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MotorcycleCard;
