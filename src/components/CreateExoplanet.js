import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';

const CreateExoplanet = ({ onBack }) => {
  const [planetType, setPlanetType] = useState('Terrestrial');
  const [planetSize, setPlanetSize] = useState(1);
  const [atmosphere, setAtmosphere] = useState('Thin');
  const [temperature, setTemperature] = useState('Cold');
  const [orbit, setOrbit] = useState('Close');
  const mountRef = useRef(null);

  // Function to reset form values
  const resetForm = () => {
    setPlanetType('Terrestrial');
    setPlanetSize(1);
    setAtmosphere('Thin');
    setTemperature('Cold');
    setOrbit('Close');
  };

  // Function to visualize the created exoplanet
  const visualizeExoplanet = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    if (mountRef.current) {
      mountRef.current.innerHTML = ''; // Clear previous render
      mountRef.current.appendChild(renderer.domElement);
    }

    // Choose texture/color based on planet type
    const geometry = new THREE.SphereGeometry(planetSize, 32, 32);
    let material;
    if (planetType === 'Terrestrial') {
      material = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    } else if (planetType === 'Gas Giant') {
      material = new THREE.MeshBasicMaterial({ color: 0xFFD700 });
    } else if (planetType === 'Ice Giant') {
      material = new THREE.MeshBasicMaterial({ color: 0x87CEEB });
    } else {
      material = new THREE.MeshBasicMaterial({ color: 0x4682B4 });
    }
    
    const planet = new THREE.Mesh(geometry, material);
    scene.add(planet);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);
      planet.rotation.y += 0.01; // Rotation for some animation
      renderer.render(scene, camera);
    };
    animate();
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Create Your Own Exoplanet</h1>
      <form className="mt-4">
        {/* Planet Type */}
        <div className="form-group">
          <label htmlFor="planetType">Planet Type</label>
          <select
            id="planetType"
            className="form-control"
            value={planetType}
            onChange={(e) => setPlanetType(e.target.value)}
          >
            <option value="Terrestrial">Terrestrial</option>
            <option value="Gas Giant">Gas Giant</option>
            <option value="Ice Giant">Ice Giant</option>
            <option value="Water World">Water World</option>
          </select>
        </div>

        {/* Planet Size */}
        <div className="form-group">
          <label htmlFor="planetSize">Planet Size (Earth = 1)</label>
          <input
            type="number"
            id="planetSize"
            className="form-control"
            min="0.5"
            max="10"
            step="0.1"
            value={planetSize}
            onChange={(e) => setPlanetSize(Number(e.target.value))}
          />
        </div>

        {/* Atmosphere */}
        <div className="form-group">
          <label htmlFor="atmosphere">Atmosphere Type</label>
          <select
            id="atmosphere"
            className="form-control"
            value={atmosphere}
            onChange={(e) => setAtmosphere(e.target.value)}
          >
            <option value="Thin">Thin</option>
            <option value="Thick">Thick</option>
            <option value="None">None</option>
            <option value="Toxic">Toxic</option>
          </select>
        </div>

        {/* Temperature */}
        <div className="form-group">
          <label htmlFor="temperature">Planet Temperature</label>
          <select
            id="temperature"
            className="form-control"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          >
            <option value="Cold">Cold</option>
            <option value="Temperate">Temperate</option>
            <option value="Hot">Hot</option>
          </select>
        </div>

        {/* Orbit */}
        <div className="form-group">
          <label htmlFor="orbit">Orbit Distance</label>
          <select
            id="orbit"
            className="form-control"
            value={orbit}
            onChange={(e) => setOrbit(e.target.value)}
          >
            <option value="Close">Close</option>
            <option value="Moderate">Moderate</option>
            <option value="Far">Far</option>
          </select>
        </div>

        {/* Create Button */}
        <button
          type="button"
          className="btn btn-primary mt-4"
          onClick={visualizeExoplanet}
        >
          Create Exoplanet
        </button>
        <button
          type="button"
          className="btn btn-secondary mt-4 ml-3"
          onClick={resetForm}
        >
          Reset
        </button>
        <button
          type="button"
          className="btn btn-dark mt-4 ml-3"
          onClick={onBack}
        >
          Go Back to Home
        </button>
      </form>

      {/* Display the created exoplanet */}
      <div className="mt-5">
        <h2>Your Exoplanet</h2>
        <p><strong>Type:</strong> {planetType}</p>
        <p><strong>Size:</strong> {planetSize} Earth sizes</p>
        <p><strong>Atmosphere:</strong> {atmosphere}</p>
        <p><strong>Temperature:</strong> {temperature}</p>
        <p><strong>Orbit Distance:</strong> {orbit}</p>
      </div>

      {/* 3D Visualization Mount */}
      <div ref={mountRef} className="mt-5" style={{ width: '100%', height: '400px', backgroundColor: '#eaeaea' }}></div>
    </div>
  );
};

export default CreateExoplanet;
