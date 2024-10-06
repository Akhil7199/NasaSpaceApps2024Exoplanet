// src/pages/ExoplanetDashboard.js
import React from 'react';
import DiscoveryPage from '../components/DiscoveryPage';
import Exoplanet3D from '../components/Exoplanet3D';

const ExoplanetDashboard = () => {
  return (
    <div>
      <DiscoveryPage />  {/* Shows timeline visualization */}
      <Exoplanet3D />    {/* Shows 3D exoplanet model */}
    </div>
  );
};

export default ExoplanetDashboard;
