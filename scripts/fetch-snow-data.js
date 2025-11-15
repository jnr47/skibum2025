/**
 * Fetch Open-Meteo snow data for all ski resorts and generate static JSON
 * This script runs in GitHub Actions every 6 hours
 * 
 * UPDATED: Now uses Open-Meteo API for accurate worldwide snow forecasts
 * Open-Meteo provides better accuracy and global coverage compared to NOAA
 */

// Import resort data
const RESORTS = require('./resorts-data.js');

/**
 * Fetch Open-Meteo 7-day forecast
 * Open-Meteo provides hourly snowfall data globally
 */
async function fetchOpenMeteoForecast(lat, lng) {
  try {
    // Open-Meteo API endpoint
    // Parameters:
    // - latitude, longitude: resort coordinates
    // - hourly=snowfall: get hourly snowfall amounts
    // - forecast_days=7: get 7 days of forecast
    // - timezone=auto: use local timezone for the location
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=snowfall&forecast_days=7&timezone=auto`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Open-Meteo API failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if we have snowfall data
    if (!data.hourly || !data.hourly.snowfall) {
      return {
        snowfall_24hr: 0,
        snowfall_48hr: 0,
        snowfall_7day: 0,
        forecast_text: 'No forecast data available',
        last_updated: new Date().toISOString()
      };
    }
    
    // Open-Meteo returns hourly snowfall in cm
    // We need to:
    // 1. Sum the hourly values for 24hr, 48hr, and 7-day periods
    // 2. Convert from cm to inches (1 cm = 0.393701 inches)
    
    const snowfallHourly = data.hourly.snowfall; // Array of hourly values in cm
    const times = data.hourly.time; // Array of ISO timestamps
    
    // Calculate how many hours we need for each period
    // Open-Meteo gives us 168 hours (7 days) of data
    const hours24 = Math.min(24, snowfallHourly.length);
    const hours48 = Math.min(48, snowfallHourly.length);
    const hours168 = snowfallHourly.length; // Full 7 days
    
    // Sum snowfall for each period (values are in cm)
    let snowCm24hr = 0;
    let snowCm48hr = 0;
    let snowCm7day = 0;
    
    for (let i = 0; i < snowfallHourly.length; i++) {
      const snowfall = snowfallHourly[i] || 0; // Some values might be null
      
      if (i < hours24) {
        snowCm24hr += snowfall;
      }
      if (i < hours48) {
        snowCm48hr += snowfall;
      }
      snowCm7day += snowfall;
    }
    
    // Convert cm to inches (1 cm = 0.393701 inches)
    const snow24hr = snowCm24hr * 0.393701;
    const snow48hr = snowCm48hr * 0.393701;
    const snow7day = snowCm7day * 0.393701;
    
    // Create a simple forecast text based on the data
    let forecastText = 'No snow expected';
    if (snow24hr > 0) {
      forecastText = `${snow24hr.toFixed(1)}" expected in next 24 hours`;
    } else if (snow48hr > 0) {
      forecastText = `${snow48hr.toFixed(1)}" expected in next 48 hours`;
    } else if (snow7day > 0) {
      forecastText = `${snow7day.toFixed(1)}" expected in next 7 days`;
    }
    
    return {
      snowfall_24hr: parseFloat(snow24hr.toFixed(1)),
      snowfall_48hr: parseFloat(snow48hr.toFixed(1)),
      snowfall_7day: parseFloat(snow7day.toFixed(1)),
      forecast_text: forecastText,
      last_updated: new Date().toISOString()
    };
    
  } catch (error) {
    console.error(`Error fetching Open-Meteo data for ${lat},${lng}:`, error.message);
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
 * Add delay between requests to be respectful to Open-Meteo servers
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main function to fetch all data
 */
async function generateSnowData() {
  console.log(`Starting Open-Meteo data fetch for ${RESORTS.length} resorts...`);
  const results = [];
  
  for (let i = 0; i < RESORTS.length; i++) {
    const resort = RESORTS[i];
    console.log(`[${i + 1}/${RESORTS.length}] Fetching ${resort.name}...`);
    
    const data = await fetchOpenMeteoForecast(resort.lat, resort.lng);
    
    results.push({
      name: resort.name,
      lat: resort.lat,
      lng: resort.lng,
      ...data
    });
    
    // Add a small delay to avoid overwhelming servers
    // Open-Meteo is generous but we should still be respectful
    await delay(100);
  }
  
  const output = {
    generated_at: new Date().toISOString(),
    total_resorts: results.length,
    data_source: 'Open-Meteo',
    resorts: results
  };
  
  console.log(`\nData fetch complete!`);
  console.log(`- Total resorts: ${results.length}`);
  console.log(`- Successful: ${results.filter(r => !r.error).length}`);
  console.log(`- Failed: ${results.filter(r => r.error).length}`);
  
  // Log some stats
  const resortsWithSnow = results.filter(r => r.snowfall_7day > 0).length;
  console.log(`- Resorts with snow in 7-day forecast: ${resortsWithSnow}`);
  
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
    console.log(`🌍 Data source: Open-Meteo API (https://open-meteo.com)`);
    
  } catch (error) {
    console.error('❌ Error generating snow data:', error);
    process.exit(1);
  }
}

// Run the script
main();
