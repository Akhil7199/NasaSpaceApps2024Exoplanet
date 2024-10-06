import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import axios from 'axios';
import Quiz from './quiz';
import ExoplanetNarrative from './ExoplanetNarrative.js';
import CreateExoplanet from './CreateExoplanet.js';

const Exoplanet3D = () => {
  const mountRef = useRef();
  const [exoplanets, setExoplanets] = useState([]);
  const [selectedExoplanet, setSelectedExoplanet] = useState(null);
  const planetObjects = useRef([]);
  const [planetDetails, setPlanetDetails] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showNarrative, setShowNarrative] = useState(false);
  const [showCreateExoplanet, setShowCreateExoplanet] = useState(false);

  // Function to return to exoplanet selection after quiz finishes
  const handleQuizFinish = () => {
    setShowQuiz(false); // Show the exoplanet view again
  };

  // Texture loader
  const textureLoader = new THREE.TextureLoader();
  const rockyTexture = textureLoader.load('/rocky.jpg');
  const gaseousTexture = textureLoader.load('/gas.png');
  const icyTexture = textureLoader.load('/icey.jpg');

  
  // Fetch exoplanet data from NASA API
  useEffect(() => {
    const fetchExoplanets = async () => {
      const response = await axios.get(
        'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&format=json'
      );
      setExoplanets(response.data.slice(0, 15)); // Limit to 15 exoplanets
    };
    fetchExoplanets();
  }, []);

 // Initialize 3D Scene
useEffect(() => {
  // Return early if there's no selected exoplanet or the mount ref is not ready
  if (!selectedExoplanet || !mountRef.current) return;

  // Initialize Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000);

  // Check if the mount ref exists and append the renderer to it
  if (mountRef.current) {
    mountRef.current.appendChild(renderer.domElement);
  }

  // Initialize Orbit Controls for 3D interaction
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.zoomSpeed = 1.2;
  controls.enablePan = true;

  // Lighting
  const pointLight1 = new THREE.PointLight(0xffffff, 5, 1000);
  const ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(pointLight1, ambientLight);

  // Add Parent Planet (the Star)
  const starGeometry = new THREE.SphereGeometry(8, 64, 64);
  const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const star = new THREE.Mesh(starGeometry, starMaterial);
  scene.add(star);

  // Render the selected exoplanet orbiting the star
  const exoplanetSize = selectedExoplanet['koi_prad'] ? selectedExoplanet['koi_prad'] * 0.5 : 1;

  // Texture and material selection logic for the exoplanet
  let texture = rockyTexture; // Default rocky texture
  if (selectedExoplanet.koi_teq < 200) {
    texture = icyTexture; // Icy planet
  } else if (exoplanetSize > 2) {
    texture = gaseousTexture; // Gaseous planet
  }

  const planetGeometry = new THREE.SphereGeometry(exoplanetSize, 32, 32);
  const planetMaterial = new THREE.MeshStandardMaterial({ map: texture });
  const exoplanet = new THREE.Mesh(planetGeometry, planetMaterial);
  scene.add(exoplanet);

  // Set up orbit for exoplanet around the star
  const orbitRadius = 20;
  let orbitAngle = 0;

  // Animation loop to simulate orbit
  const animate = () => {
    requestAnimationFrame(animate);
    orbitAngle += 0.01; // Controls the orbit speed
    exoplanet.position.set(
      orbitRadius * Math.cos(orbitAngle),
      0,
      orbitRadius * Math.sin(orbitAngle)
    );
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  camera.position.z = 100;

  // Clean-up logic
  return () => {
    if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
      mountRef.current.removeChild(renderer.domElement);
    }
  };
}, [selectedExoplanet]);

  // Function to update selected exoplanet and show details
  const handleExoplanetSelection = (e) => {
    const planet = exoplanets[e.target.value];
    setSelectedExoplanet(planet);
    setPlanetDetails({
      name: planet.kepler_name || 'Unnamed Exoplanet',
      radius: planet.koi_prad || 'Unknown',
      period: planet.koi_period || 'Unknown',
      temperature: planet.koi_teq || 'Unknown',
      disposition: planet.koi_disposition || 'Unknown'
    });
  };

  return (
    <>
      {showNarrative ? (
        <ExoplanetNarrative onBack={() => setShowNarrative(false)} />
      ) : showCreateExoplanet ? (  
        <CreateExoplanet onBack={() => setShowCreateExoplanet(false)} />
      ) : (
        <>
          {/* Header */}
          <header className="bg-dark text-white py-4">
            <div className="container text-center">
              <h1 className="display-4">NASA SpaceApps Challenge 2024</h1>
              <h2 className="display-4">Exoplanet Discovery Dashboard</h2>
              <p className="lead">By Team: Into the Stars (ITS)</p>
            </div>
          </header>

          <div className="container text-center mt-5">
            <p className="lead mb-4">Explore the fascinating world of exoplanets!</p>

            {/* Loading Spinner */}
            {exoplanets.length === 0 ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                {showQuiz ? (
                  <Quiz onQuizFinish={handleQuizFinish} />
                ) : (
                  <>
                    <button
                      className="btn btn-primary mb-4"
                      onClick={() => setShowQuiz(true)}
                    >
                      Take the Quiz
                    </button>

                    <button
  className="btn btn-success mb-4"
  onClick={() => setShowCreateExoplanet(true)}
>
  Create Your Own Exoplanet
</button>


                    {/* Button to navigate to the narrative page */}
                    <button
                      className="btn btn-info mb-4"
                      onClick={() => setShowNarrative(true)}
                    >
                      Learn About Exoplanets
                    </button>

                    {/* Exoplanet Dropdown */}
                    <div className="form-group">
                      <label htmlFor="exoplanetSelect" className="font-weight-bold">
                        Select an Exoplanet:
                      </label>
                      <select
                        className="form-control"
                        id="exoplanetSelect"
                        onChange={handleExoplanetSelection}
                      >
                        <option value="">Select an Exoplanet</option>
                        {exoplanets.map((planet, index) => (
                          <option key={index} value={index}>
                            {planet.kepler_name || 'Unnamed Exoplanet'}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Exoplanet Details */}
                    {planetDetails && (
                      <div className="mt-4">
                        <h3>Selected Exoplanet Details:</h3>
                        <ul className="list-group">
                          <li className="list-group-item">
                            <strong>Name:</strong> {planetDetails.name}
                          </li>
                          <li className="list-group-item">
                            <strong>Radius:</strong> {planetDetails.radius} R_Earth
                          </li>
                          <li className="list-group-item">
                            <strong>Orbital Period:</strong>{' '}
                            {planetDetails.period} days
                          </li>
                          <li className="list-group-item">
                            <strong>Equilibrium Temperature:</strong>{' '}
                            {planetDetails.temperature} K
                          </li>
                          <li className="list-group-item">
                            <strong>Disposition:</strong>{' '}
                            {planetDetails.disposition}
                          </li>
                        </ul>
                      </div>
                    )}

                    {/* 3D Visualization */}
                    <div
                      ref={mountRef}
                      className="mt-4"
                      style={{ width: '100%', height: '600px', backgroundColor: '#f8f9fa' }}
                    ></div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <footer className="bg-dark text-white py-3 mt-5">
            <div className="container text-center">
              <p>Developed by Akhil Kumar and Thrisha D</p>
            </div>
          </footer>
        </>
      )}
    </>
  );
};

export default Exoplanet3D;
