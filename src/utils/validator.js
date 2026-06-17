// Input validation utilities

function validatePhrase(phrase) {
  if (!phrase || typeof phrase !== 'string') {
    return {
      valid: false,
      error: 'Phrase must be a non-empty string'
    };
  }
  return { valid: true };
}

function validateContext(context) {
  const validContexts = ['business_email', 'client_meeting', 'proposal', 'report', 'general'];
  if (context && !validContexts.includes(context)) {
    return {
      valid: false,
      error: `Invalid context. Must be one of: ${validContexts.join(', ')}`
    };
  }
  return { valid: true };
}

function validateDifficulty(difficulty) {
  const validLevels = ['beginner', 'intermediate', 'advanced'];
  if (difficulty && !validLevels.includes(difficulty)) {
    return {
      valid: false,
      error: `Invalid difficulty. Must be one of: ${validLevels.join(', ')}`
    };
  }
  return { valid: true };
}

function validateWord(word) {
  if (!word || typeof word !== 'string' || word.trim().length === 0) {
    return {
      valid: false,
      error: 'Word must be a non-empty string'
    };
  }
  return { valid: true };
}

module.exports = {
  validatePhrase,
  validateContext,
  validateDifficulty,
  validateWord
};
