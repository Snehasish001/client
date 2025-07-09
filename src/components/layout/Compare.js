import { useState, useEffect } from 'react';
import { getData } from '../../Api';
import '../styles/Compare.css';
import '../styles/loading.css'; 

const Compare = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBikes, setSelectedBikes] = useState([null, null]);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        setLoading(true);
        const res = await getData('api/get-bike/'); 
        setBikes(res);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBikes();
  }, []);

  const handleBikeSelect = (index, bikeId) => {
    const parsedId = parseInt(bikeId);
    const alreadySelected = selectedBikes.find((bike, i) => i !== index && bike?.id === parsedId);

    if (alreadySelected) {
      alert('You have already selected this bike in the other slot.');
      return;
    }

    const selectedBike = bikes.find(bike => bike.id === parsedId);
    const newSelectedBikes = [...selectedBikes];
    newSelectedBikes[index] = selectedBike;
    setSelectedBikes(newSelectedBikes);
  };

  const handleClearSelection = (index) => {
    const newSelectedBikes = [...selectedBikes];
    newSelectedBikes[index] = null;
    setSelectedBikes(newSelectedBikes);
  };

  const specs = [
    { label: 'Brand', key: 'brand' },
    { label: 'Price', key: 'price', format: value => `₹${parseInt(value).toLocaleString()}` },
    { label: 'Displacement', key: 'displacement', unit: 'cc' },
    { label: 'Max Power', key: 'max_power', unit: 'bhp' },
    { label: 'Max Torque', key: 'max_torque', unit: 'Nm' },
    { label: 'Mileage', key: 'mileage_owner_reported', unit: 'km/L' },
    { label: 'Fuel Tank Capacity', key: 'fuel_tank_capacity', unit: 'L' },
    { label: 'Weight', key: 'weight', unit: 'kg', highlightLowest: true },
    { label: 'Transmission', key: 'transmission' },
    {
      label: 'Braking System',
      key: 'braking_system',
      getRank: (value) => {
        if (!value) return 0;
        const val = value.toLowerCase();
        if (val.includes('dual')) return 3;
        if (val.includes('single')) return 2;
        if (val.includes('ibs')) return 1;
        return 0;
      }
    }
  ];


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
        <p>Loading Page</p>
      </div>
    );
  }
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="compare-container">
      <h3>Select Bikes to Compare</h3> 
      <div className="bike-selectors">
        {[0, 1].map(index => (
          <div key={index} className="bike-selector">
            <select
              value={selectedBikes[index]?.id || ''}
              onChange={(e) => handleBikeSelect(index, e.target.value)}
            >
              <option value="">Select Bike {index + 1}</option>
              {bikes.map(bike => (
                <option key={bike.id} value={bike.id}>{bike.name}</option>
              ))}
            </select>
            {selectedBikes[index] && (
              <button onClick={() => handleClearSelection(index)}>Clear</button>
            )}
          </div>
        ))}
      </div>

      {selectedBikes[0] && selectedBikes[1] ? (
        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Specification</th>
                {selectedBikes.map((bike, index) => (
                  <th key={index}>
                    <div className="bike-header">
                      <img
                        src={`${process.env.REACT_APP_API_URL}${bike.image1}`}
                        alt={bike.name}
                        className="bike-thumbnail"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/200x150?text=No+Image';
                        }}
                      /> 
                      <h3>{bike.name}</h3>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map((spec, index) => {
                const values = selectedBikes.map(bike => bike ? bike[spec.key] : null);
                const isPrice = spec.key === 'price';

                let highlightIndexes = [];

                if (spec.getRank) {
                  const ranks = values.map(v => spec.getRank(v));
                  const maxRank = Math.max(...ranks);
                  highlightIndexes = ranks.map(r => r === maxRank);
                } else {
                      const numericValues = values.map(v => parseFloat(v));
                      const filteredValues = numericValues.filter(v => !isNaN(v));
                      const targetValue = spec.highlightLowest
                        ? Math.min(...filteredValues)
                        : Math.max(...filteredValues);
                      highlightIndexes = numericValues.map(v =>
                        !isNaN(v) && !isPrice && v === targetValue
                      );
                }

                return (
                  <tr key={index}>
                    <td className="spec-label">{spec.label}</td>
                    {values.map((value, bikeIndex) => {
                      const formattedValue = spec.format
                        ? spec.format(value)
                        : spec.unit
                        ? `${value} ${spec.unit}`
                        : value;

                      const highlight = highlightIndexes[bikeIndex];

                      return (
                        <td
                          key={bikeIndex}
                          className={highlight ? 'spec-difference' : ''}
                        >
                          {formattedValue || '-'}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="select-prompt">
          <p>Please select two bikes to compare</p>
        </div>
      )}
    </div>
  );
};

export default Compare;
