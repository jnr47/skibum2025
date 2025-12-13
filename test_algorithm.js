#!/usr/bin/env node
/**
 * SkiBum Decision Algorithm - Test with Real Data
 */

const fs = require('fs');

// Load your real merged data
const resorts = JSON.parse(fs.readFileSync('final_resorts.json', 'utf8'));

console.log(`\n🎿 Loaded ${resorts.length} resorts with complete data\n`);

/**
 * Calculate snow score based on recent snowfall
 */
function calculateSnowScore(resort) {
    const snow24h = resort.snow_24h || 0;
    const snow48h = resort.snow_48h || 0;
    const snow7day = resort.snow_7day || 0;
    
    // Thresholds for "good" conditions
    const EXCELLENT_24H = 12;  // 12+ inches = epic
    const GOOD_24H = 6;        // 6-12 inches = great
    const EXCELLENT_7DAY = 36;
    const GOOD_7DAY = 18;
    
    // Calculate sub-scores (0-10 scale)
    let score24h = 0;
    if (snow24h >= EXCELLENT_24H) score24h = 10;
    else if (snow24h >= GOOD_24H) score24h = 5 + (5 * (snow24h - GOOD_24H) / (EXCELLENT_24H - GOOD_24H));
    else score24h = Math.min(10, (5 * snow24h) / GOOD_24H);
    
    let score7day = 0;
    if (snow7day >= EXCELLENT_7DAY) score7day = 10;
    else if (snow7day >= GOOD_7DAY) score7day = 5 + (5 * (snow7day - GOOD_7DAY) / (EXCELLENT_7DAY - GOOD_7DAY));
    else score7day = Math.min(10, (5 * snow7day) / GOOD_7DAY);
    
    // Weighted average: 60% on 24h, 40% on 7-day forecast
    const totalScore = (score24h * 0.6 + score7day * 0.4);
    
    return Math.min(10, totalScore);
}

/**
 * Calculate pass score
 */
function calculatePassScore(resort, userPasses) {
    if (!userPasses || userPasses.length === 0) return 5; // Neutral if no passes
    
    const resortPasses = resort.passes || [];
    const hasMatch = userPasses.some(pass => resortPasses.includes(pass));
    
    return hasMatch ? 10 : 0;
}

/**
 * Calculate parking score (already 0-10)
 */
function calculateParkingScore(resort) {
    return resort.parking_score || 0;
}

/**
 * Main recommendation function
 */
function recommendResorts(userInput) {
    const {
        passes = [],
        weights = {
            snow: 0.4,      // 40% - snow conditions
            pass: 0.2,      // 20% - pass ownership  
            parking: 0.4    // 40% - parking (important for vanlifers!)
        }
    } = userInput;
    
    console.log('📊 User Preferences:');
    console.log(`   Passes: ${passes.join(', ') || 'None'}`);
    console.log(`   Weights: Snow ${weights.snow*100}% | Pass ${weights.pass*100}% | Parking ${weights.parking*100}%`);
    console.log('');
    
    // Score each resort
    const scoredResorts = resorts
        .filter(r => r.coordinates) // Only resorts with coordinates
        .map(resort => {
            const snowScore = calculateSnowScore(resort);
            const passScore = calculatePassScore(resort, passes);
            const parkingScore = calculateParkingScore(resort);
            
            const totalScore = (
                snowScore * weights.snow +
                passScore * weights.pass +
                parkingScore * weights.parking
            );
            
            return {
                ...resort,
                scores: {
                    snow: snowScore,
                    pass: passScore,
                    parking: parkingScore,
                    total: totalScore
                }
            };
        });
    
    // Sort by total score
    scoredResorts.sort((a, b) => b.scores.total - a.scores.total);
    
    return scoredResorts.slice(0, 5);
}

/**
 * Pretty print recommendations
 */
function printRecommendations(recommendations, title) {
    console.log('\n' + '='.repeat(80));
    console.log(`🏔️  ${title}`);
    console.log('='.repeat(80));
    
    recommendations.forEach((resort, index) => {
        const rank = index + 1;
        const scores = resort.scores;
        const passes = resort.passes?.join(', ') || 'Independent';
        
        console.log(`\n${rank}. ${resort.name} - ${scores.total.toFixed(1)}/10`);
        console.log(`   🎟️  Passes: ${passes}`);
        console.log(`   ❄️  Snow: ${scores.snow.toFixed(1)}/10 (24h: ${resort.snow_24h}"  | 7day: ${resort.snow_7day}")`);
        console.log(`   🅿️  Parking: ${scores.parking.toFixed(1)}/10 - ${resort.parking_policy.substring(0, 60)}...`);
        console.log(`   🎯 Pass Match: ${scores.pass.toFixed(1)}/10`);
    });
    
    console.log('\n' + '='.repeat(80));
}

// ============================================================================
// TEST CASES
// ============================================================================

console.log('🎿 SKIBUM DECISION ALGORITHM - REAL DATA TEST\n');

// Test 1: Ikon pass holder who prioritizes good parking
console.log('\n' + '='.repeat(80));
console.log('TEST 1: Ikon Pass Holder + Vanlifer (Parking Priority)');
console.log('='.repeat(80));

const test1 = recommendResorts({
    passes: ['Ikon'],
    weights: {
        snow: 0.3,
        pass: 0.2,
        parking: 0.5  // Parking is most important!
    }
});

printRecommendations(test1, 'TOP 5 - VANLIFER MODE');

// Test 2: Powder chaser with Epic pass
console.log('\n\n' + '='.repeat(80));
console.log('TEST 2: Epic Pass Holder + Powder Chaser (Snow Priority)');
console.log('='.repeat(80));

const test2 = recommendResorts({
    passes: ['Epic'],
    weights: {
        snow: 0.6,      // Snow is most important!
        pass: 0.3,
        parking: 0.1
    }
});

printRecommendations(test2, 'TOP 5 - POWDER CHASE MODE');

// Test 3: Multiple passes, balanced priorities
console.log('\n\n' + '='.repeat(80));
console.log('TEST 3: Ikon + Epic Pass Holder (Balanced)');
console.log('='.repeat(80));

const test3 = recommendResorts({
    passes: ['Ikon', 'Epic'],
    weights: {
        snow: 0.4,
        pass: 0.3,
        parking: 0.3
    }
});

printRecommendations(test3, 'TOP 5 - BALANCED MODE');

console.log('\n✅ Algorithm testing complete!\n');