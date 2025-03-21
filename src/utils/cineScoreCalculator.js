/**
 * Calculates the CineScore based on ratings from different platforms
 * 
 * @param {Object} ratings - Object containing ratings from different platforms
 * @param {Object} options - Options for calculation (audienceFocused)
 * @returns {Object} - CineScore and calculation details
 */
export const calculateCineScore = (ratings, options = { audienceFocused: false }) => {
    // Default weights for critic-focused scoring
    let weights = {
      imdb: 0.40,
      rottenTomatoes: {
        tomatometer: 0.35,
      },
      metacritic: {
        metascore: 0.25,
      }
    };
  
    // Adjust weights if audience-focused
    if (options.audienceFocused) {
      weights = {
        imdb: 0.60,
        rottenTomatoes: {
          tomatometer: 0.20,
        },
        metacritic: {
          metascore: 0.20,
        }
      };
    }
  
    // Initialize variables for weighted sum calculation
    let weightedSum = 0;
    let totalWeight = 0;
    const usedSources = [];
    const normalizedScores = {};
  
    // Process IMDB rating
    if (ratings.imdb && ratings.imdb.rating) {
      // IMDB is already on a 0-10 scale
      const imdbScore = parseFloat(ratings.imdb.rating);
      weightedSum += imdbScore * weights.imdb;
      totalWeight += weights.imdb;
      usedSources.push('IMDB');
      normalizedScores.imdb = imdbScore;
    }
  
    // Process Rotten Tomatoes ratings
    if (ratings.rottenTomatoes) {
      // Tomatometer (convert from 0-100% to 0-10)
      if (ratings.rottenTomatoes.tomatometer) {
        const tomatoScore = parseFloat(ratings.rottenTomatoes.tomatometer) / 10;
        weightedSum += tomatoScore * weights.rottenTomatoes.tomatometer;
        totalWeight += weights.rottenTomatoes.tomatometer;
        usedSources.push('Rotten Tomatoes');
        normalizedScores.tomatometer = tomatoScore;
      }
    }
  
    // Process Metacritic ratings
    if (ratings.metacritic) {
      // Metascore (convert from 0-100 to 0-10)
      if (ratings.metacritic.metascore) {
        const metaScore = parseFloat(ratings.metacritic.metascore) / 10;
        weightedSum += metaScore * weights.metacritic.metascore;
        totalWeight += weights.metacritic.metascore;
        usedSources.push('Metacritic');
        normalizedScores.metascore = metaScore;
      }
    }
  
    // Calculate final score if we have at least one valid rating
    let cineScore = 0;
    if (totalWeight > 0) {
      // Normalize by the total weight used
      cineScore = weightedSum / totalWeight;
      
      // Round to one decimal place
      cineScore = Math.round(cineScore * 10) / 10;
    }
  
    return {
      score: cineScore,
      normalizedScores,
      usedSources,
      audienceFocused: options.audienceFocused,
      reliability: calculateReliability(usedSources.length)
    };
  };
  
  /**
   * Calculates the reliability of the CineScore based on number of sources
   * 
   * @param {number} sourceCount - Number of rating sources used
   * @returns {string} - Reliability level (low, medium, high)
   */
  const calculateReliability = (sourceCount) => {
    if (sourceCount >= 3) return 'high';
    if (sourceCount >= 2) return 'medium';
    return 'low';
  };