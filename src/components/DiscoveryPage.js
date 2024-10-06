import React, { useState, useEffect } from 'react';
import { getExoplanets } from '../api/exoplanetapi';
import Timeline from './Timeline';

const DiscoveryPage = () => {
  const [exoplanets, setExoplanets] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getExoplanets();
      setExoplanets(data);
      console.log("Fetched Exoplanet Data: ", data);  // Check API response
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="text-center mt-4 mb-4">
        {exoplanets.length ? (
          <h5 className="text-muted">{exoplanets.length} exoplanets found.</h5>
        ) : (
          <h5 className="text-muted">Loading exoplanet data...</h5>
        )}
      </div>
    </div>
  );
};

export default DiscoveryPage;
