import React from 'react';

const ExoplanetNarrative = ({ onBack }) => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Journey Through the Exoplanets</h1>
      <div className="narrative-section text-center mb-4">
        <p className="narrative-intro">
          Join us on a fascinating journey to explore planets beyond our solar system, known as exoplanets. These distant worlds orbit stars millions of light-years away and come in all shapes and sizes, from massive gas giants to Earth-like planets.
        </p>
        
        {/* 3D Model */}
        <div className="text-center mb-4">
          <img 
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnl0OXZhZWI4Mm9hczNtdHZoMzh3Z3BmbXI2eTd2anNxNmt4cWc5aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oxHQeOMK3n5tDY4Gk/giphy.webp" 
            width="100%" 
            className="img-fluid"
            height="500px"/>
          <p className="text-muted">3D model of an exoplanet orbiting a star</p>
        </div>
        
        <p>
          Exoplanets form in protoplanetary disks, swirling rings of gas and dust around young stars. Over time, gravity pulls the dust together, creating planetesimals, which eventually form planets. These planets vary greatly in size and composition. 
        </p>
        
        {/* GIF Example */}
        <div className="text-center mb-4">
          <img 
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDlkbWJxZzd5aXpoM2lod2kwMWc4eGNyZWQ1c2VsN21pb3BmbjBxYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26ufkqtCTNTRHQbxC/giphy.webp" 
            alt="Exoplanet Formation" 
            width="60%" 
            className="img-fluid" />
          <p className="text-muted">An artist's impression of an exoplanet forming in space.</p>
        </div>
        
        <h3>Types of Exoplanets</h3>
        <ul className="list-group mb-4">
          <li className="list-group-item">
            <strong>Terrestrial Planets:</strong> Rocky planets similar to Earth. These are composed mainly of rock and metal.
          </li>
          <li className="list-group-item">
            <strong>Gas Giants:</strong> Huge planets primarily made of hydrogen and helium, like Jupiter and Saturn.
          </li>
          <li className="list-group-item">
            <strong>Ice Giants:</strong> Massive planets with thick atmospheres containing water, ammonia, and methane.
          </li>
        </ul>
        
        <p>
          Some exoplanets lie in the "habitable zone," where conditions may allow liquid water, a key ingredient for life. This is why scientists are particularly interested in Earth-sized exoplanets in these zones.
        </p>
      </div>

      <button className="btn btn-secondary mt-4" onClick={onBack}>Go Back to Home</button>
    </div>
  );
};

export default ExoplanetNarrative;
