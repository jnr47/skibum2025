/**
 * Fetch NOAA snow data for all ski resorts and generate static JSON
 * This script runs in GitHub Actions every 6 hours
 * 
 * UPDATED: Now uses NOAA gridded forecast API for accurate numerical data
 * instead of parsing text forecasts
 */

// Import resort data
const RESORTS = require('./resorts-data.js');

/**
 * Fetch NOAA 7-day forecast using gridded data (NUMERICAL, not text)
 */
async function fetchNOAAForecast(lat, lng) {
  try {
    // Step 1: Get the grid point information
    const pointUrl = `https://api.weather.gov/points/${lat},${lng}`;
    const pointResponse = await fetch(pointUrl, {
      headers: { 'User-Agent': 'SkiBum.com Snow Tracker' }
    });
    
    if (!pointResponse.ok) {
      throw new Error(`Point API failed: ${pointResponse.status}`);
    }
    
    const pointData = await pointResponse.json();
    
    // Step 2: Get the gridded forecast URL (this has the numerical data)
    const gridId = pointData.properties.gridId;
    const gridX = pointData.properties.gridX;
    const gridY = pointData.properties.gridY;
    
    // This is the KEY CHANGE - we're using gridpoints, not forecast
    const gridUrl = `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}`;
    
    const gridResponse = await fetch(gridUrl, {
      headers: { 'User-Agent': 'SkiBum.com Snow Tracker' }
    });
    
    if (!gridResponse.ok) {
      throw new Error(`Grid API failed: ${gridResponse.status}`);
    }
    
    const gridData = await gridResponse.json();
    
    // Step 3: Extract snowfall data (actual numbers, not text!)
    const snowfallData = gridData.properties.snowfallAmount;
    
    if (!snowfallData || !snowfallData.values || snowfallData.values.length === 0) {
      // No snow in forecast
      return {
        snowfall_24hr: 0,
        snowfall_48hr: 0,
        snowfall_7day: 0,
        forecast_text: 'No snow expected',
        last_updated: new Date().toISOString()
      };
    }
    
    // Step 4: Calculate snowfall for different time periods
    // snowfallData.values is an array of {validTime, value} objects
    // validTime is in ISO 8601 duration format like "2024-11-14T18:00:00+00:00/PT1H"
    
    const now = new Date();
    const hour24 = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const hour48 = new Date(now.getTime() + 48 * 60 * 60 * 1000);
    const day7 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    let snow24hr = 0;
    let snow48hr = 0;
    let snow7day = 0;
    
    for (const entry of snowfallData.values) {
      // Parse the time period
      const timeParts = entry.validTime.split('/');
      const startTime = new Date(timeParts[0]);
      
      // Convert value from millimeters to inches
      // NOAA returns values in millimeters, we want inches
      const snowMM = entry.value || 0;
      const snowInches = snowMM * 0.0393701; // 1mm = 0.0393701 inches
      
      // Add to appropriate time buckets
      if (startTime <= day7) {
        snow7day += snowInches;
        
        if (startTime <= hour48) {
          snow48hr += snowInches;
          
          if (startTime <= hour24) {
            snow24hr += snowInches;
          }
        }
      }
    }
    
    // Get forecast text from the regular forecast endpoint (for display purposes)
    let forecastText = 'No forecast available';
    try {
      const forecastUrl = pointData.properties.forecast;
      const forecastResponse = await fetch(forecastUrl, {
        headers: { 'User-Agent': 'SkiBum.com Snow Tracker' }
      });
      
      if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json();
        const periods = forecastData.properties.periods || [];
        if (periods.length > 0) {
          forecastText = periods[0].detailedForecast;
        }
      }
    } catch (e) {
      // If forecast text fetch fails, that's okay - we have the numerical data
      console.log(`Could not fetch forecast text for ${lat},${lng}`);
    }
    
    return {
      snowfall_24hr: parseFloat(snow24hr.toFixed(1)),
      snowfall_48hr: parseFloat(snow48hr.toFixed(1)),
      snowfall_7day: parseFloat(snow7day.toFixed(1)),
      forecast_text: forecastText,
      last_updated: new Date().toISOString()
    };
    
  } catch (error) {
    console.error(`Error fetching NOAA data for ${lat},${lng}:`, error.message);
    return {
      snowfall_24hr: 0,
      snowfall_48hr: 0,
      snowfall_7day: 0,
      forecast_text: 'Data unavailable',
      last_updated: new Date().toISOString(),
      error: error.message
    };
  }
}

/**
 * Add delay between requests to be nice to NOAA servers
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main function to fetch all data
 */
async function generateSnowData() {
  console.log(`Starting data fetch for ${RESORTS.length} resorts...`);
  const results = [];
  
  for (let i = 0; i < RESORTS.length; i++) {
    const resort = RESORTS[i];
    console.log(`[${i + 1}/${RESORTS.length}] Fetching ${resort.name}...`);
    
    const data = await fetchNOAAForecast(resort.lat, resort.lng);
    
    results.push({
      name: resort.name,
      lat: resort.lat,
      lng: resort.lng,
      ...data
    });
    
    // Add a small delay to avoid overwhelming NOAA servers
    await delay(200);
  }
  
  const output = {
    generated_at: new Date().toISOString(),
    total_resorts: results.length,
    resorts: results
  };
  
  console.log(`\nData fetch complete!`);
  console.log(`- Total resorts: ${results.length}`);
  console.log(`- Successful: ${results.filter(r => !r.error).length}`);
  console.log(`- Failed: ${results.filter(r => r.error).length}`);
  
  return output;
}

/**
 * Write the JSON file
 */
async function main() {
  try {
    const fs = require('fs');
    const path = require('path');
    
    const data = await generateSnowData();
    
    // Write to the root directory
    const outputPath = path.join(__dirname, '..', 'snow-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    
    console.log(`\n✅ Snow data written to: ${outputPath}`);
    console.log(`📦 File size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);
    
  } catch (error) {
    console.error('❌ Error generating snow data:', error);
    process.exit(1);
  }
}

// Run the script
main();
