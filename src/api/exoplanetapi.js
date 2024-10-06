// src/api/exoplanetAPI.js
import axios from 'axios';

export const getExoplanets = async () => {
  try {
    const response = await axios.get('https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&format=json');
    return response.data;
  } catch (error) {
    console.error("Error fetching exoplanet data", error);
    return [];
  }
};
