/**
 * Fetch NOAA snow data for all ski resorts and generate static JSON
 * This script runs in GitHub Actions every 6 hours
 */

// Import resort data
const RESORTS = require('./resorts-data.js');

/**
 * Fetch NOAA 7-day forecast for a location
 */
async function fetchNOAAForecast(lat, lng) {
  try {
    // Step 1: Get the grid point
    const pointUrl = `https://api.weather.gov/points/${lat},${lng}`;
    const pointResponse = await fetch(pointUrl, {
      headers: { 'User-Agent': 'SkiBum.com Snow Tracker' }
    });
    
    if (!pointResponse.ok) {
      throw new Error(`Point API failed: ${pointResponse.status}`);
    }
    
    const pointData = await pointResponse.json();
    const forecastUrl = pointData.properties.forecast;
    
    // Step 2: Get the forecast
    const forecastResponse = await fetch(forecastUrl, {
      headers: { 'User-Agent': 'SkiBum.com Snow Tracker' }
    });
    
    if (!forecastResponse.ok) {
      throw new Error(`Forecast API failed: ${forecastResponse.status}`);
    }
    
    const forecastData = await forecastResponse.json();
    
    // Step 3: Calculate total snowfall from forecast
    let totalSnow = 0;
    const periods = forecastData.properties.periods || [];
    
    for (const period of periods) {
      const text = (period.detailedForecast || '').toLowerCase();
      
    // Look for snow measurements in the text - try multiple patterns
let snowMatch = null;

// Pattern 1: "5 inches of snow" or "5 to 8 inches of snow"
snowMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:to\s*(\d+(?:\.\d+)?)\s*)?(inch|inches|")\s+(?:of\s+)?snow/i);

// Pattern 2: "snow accumulation of 5 inches" or "snow accumulation of 1 to 2 inches"
if (!snowMatch) {
  snowMatch = text.match(/snow.*?accumulation.*?of\s+(\d+(?:\.\d+)?)\s*(?:to\s*(\d+(?:\.\d+)?)\s*)?(inch|inches|")/i);
}

// Pattern 3: "new snow 5 inches"
if (!snowMatch) {
  snowMatch = text.match(/new snow\s+(\d+(?:\.\d+)?)\s*(?:to\s*(\d+(?:\.\d+)?)\s*)?(inch|inches|")/i);
}

if (snowMatch) {
  const low = parseFloat(snowMatch[1]);
  const high = snowMatch[2] ? parseFloat(snowMatch[2]) : low;
  totalSnow += (low + high) / 2;
}
    
    return {
      snowfall_7day: parseFloat(totalSnow.toFixed(1)),
      forecast_text: periods[0]?.detailedForecast || 'No forecast available',
      last_updated: new Date().toISOString()
    };
    
  } catch (error) {
    console.error(`Error fetching NOAA data for ${lat},${lng}:`, error.message);
    return {
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
