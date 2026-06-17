# Agent Integration Guide

This document explains how to integrate the Business Vocabulary Tool with Claude Code agents and other AI systems.

## Overview

The Business Vocabulary Tool exposes a RESTful API that agents can call to:
- Convert plain English phrases to formal alternatives
- Get practice scenarios for client communication
- Query formal business phrases
- Expand vocabulary with formal alternatives

## Starting the Server

```bash
npm install
npm start
```

The server runs on `http://localhost:5000`

## API Endpoints for Agents

### 1. Formal Phrase Conversion

**Endpoint:** `POST /api/formal-phrase`

**Usage in Agent Code:**

```javascript
async function convertToFormalPhrase(plainPhrase, context = 'business') {
  const response = await fetch('http://localhost:5000/api/formal-phrase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phrase: plainPhrase,
      context: context
    })
  });
  return await response.json();
}

// Example usage
const result = await convertToFormalPhrase('thanks for your email', 'business_email');
console.log(result.formalAlternatives); // ['Thank you for your correspondence', ...]
```

### 2. Practice Scenarios

**Endpoint:** `POST /api/practice-scenario`

**Usage in Agent Code:**

```javascript
async function getPracticeScenario(scenarioType, difficulty = 'intermediate') {
  const response = await fetch('http://localhost:5000/api/practice-scenario', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      scenario: scenarioType,
      difficulty: difficulty
    })
  });
  return await response.json();
}

// Example usage
const scenario = await getPracticeScenario('email_response', 'advanced');
console.log(scenario.plainVersion);
console.log(scenario.formalVersion);
console.log(scenario.explanation);
```

### 3. Phrase Bank Query

**Endpoint:** `GET /api/phrases?category=greetings&level=formal`

**Usage in Agent Code:**

```javascript
async function getPhraseBank(category, level = 'formal') {
  const params = new URLSearchParams({ category, level });
  const response = await fetch(
    `http://localhost:5000/api/phrases?${params}`,
    { method: 'GET' }
  );
  return await response.json();
}

// Example usage
const phrases = await getPhraseBank('greetings', 'formal');
phrases.results.forEach(phrase => {
  console.log(`${phrase.english} (${phrase.mandarin})`);
});
```

### 4. Vocabulary Builder

**Endpoint:** `POST /api/vocabulary-builder`

**Usage in Agent Code:**

```javascript
async function getFormalAlternatives(word) {
  const response = await fetch('http://localhost:5000/api/vocabulary-builder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ word })
  });
  return await response.json();
}

// Example usage
const vocab = await getFormalAlternatives('help');
console.log(vocab.formalAlternatives); // ['assist', 'facilitate', ...]
console.log(vocab.examples);

// Batch processing
const batchResponse = await fetch('http://localhost:5000/api/vocabulary/batch', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    words: ['help', 'thanks', 'need', 'problem']
  })
});
const batchResult = await batchResponse.json();
```

## Integration Patterns

### Pattern 1: Real-time Phrase Enhancement

```javascript
async function enhanceUserCommunication(userMessage) {
  // Get formal alternatives
  const formalResponse = await fetch('http://localhost:5000/api/formal-phrase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phrase: userMessage,
      context: 'client_communication'
    })
  });
  
  const result = await formalResponse.json();
  return {
    original: result.original,
    suggestions: result.formalAlternatives,
    vocabulary: result.matchedVocabulary
  };
}
```

### Pattern 2: Practice-based Learning

```javascript
async function conductPracticeSession(difficulty) {
  // Get a practice scenario
  const scenarioResponse = await fetch('http://localhost:5000/api/practice-scenario', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      scenario: 'email_response',
      difficulty
    })
  });
  
  const scenario = await scenarioResponse.json();
  
  // Show plain version to user
  console.log('Plain version:', scenario.plainVersion);
  console.log('Formal version:', scenario.formalVersion);
  console.log('Explanation:', scenario.explanation);
  
  // Get feedback on user's attempt
  const feedbackResponse = await fetch(
    'http://localhost:5000/api/practice-scenario/submit',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenarioId: scenario.id,
        userAttempt: userResponse
      })
    }
  );
  
  return await feedbackResponse.json();
}
```

### Pattern 3: Vocabulary Building

```javascript
async function expandVocabulary(text) {
  // Extract words that might benefit from formalization
  const words = text.split(/\s+/);
  
  const vocabResponse = await fetch('http://localhost:5000/api/vocabulary/batch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ words })
  });
  
  const result = await vocabResponse.json();
  
  return {
    found: result.found,
    suggestions: result.results.filter(r => r.found)
  };
}
```

## Context Values

### Formal Phrase Contexts
- `business_email` - Professional email communication
- `client_meeting` - Client-facing meetings
- `proposal` - Business proposals
- `report` - Professional reports
- `general` - General business communication

### Scenario Types
- `greeting` - Initial greetings
- `email_response` - Email responses
- `meeting_request` - Requesting meetings
- `problem_statement` - Describing problems
- `offer_support` - Offering assistance
- `email_closing` - Closing emails
- `disagreement` - Professional disagreement
- `information_request` - Requesting information

### Difficulty Levels
- `beginner` - Basic formal language
- `intermediate` - Standard professional English
- `advanced` - Complex formal expressions

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `400` - Invalid request
- `404` - Resource not found
- `500` - Server error

Example error response:
```json
{
  "error": {
    "status": 400,
    "message": "Invalid request: phrase is required and must be a string",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

## Configuration

Set these environment variables in `.env`:

```
PORT=5000
ENVIRONMENT=development
LOG_LEVEL=info
```

## Rate Limiting

Currently, there are no rate limits. For production use, consider adding rate limiting middleware.

## Example: Complete Agent Workflow

```javascript
const VOCAB_API = 'http://localhost:5000/api';

class BusinessVocabularyAgent {
  async analyzeClientCommunication(userMessage) {
    // Step 1: Get formal alternatives
    const alternatives = await this.getFormalAlternatives(userMessage);
    
    // Step 2: Get practice scenario for improvement
    const scenario = await this.getPracticeScenario();
    
    // Step 3: Build vocabulary from the message
    const vocabulary = await this.expandVocabulary(userMessage);
    
    return {
      originalMessage: userMessage,
      suggestions: alternatives,
      practiceScenario: scenario,
      vocabularyOpportunities: vocabulary,
      recommendation: this.generateRecommendation(alternatives, scenario, vocabulary)
    };
  }

  async getFormalAlternatives(phrase) {
    const response = await fetch(`${VOCAB_API}/formal-phrase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phrase, context: 'client_communication' })
    });
    return await response.json();
  }

  async getPracticeScenario() {
    const response = await fetch(`${VOCAB_API}/practice-scenarios`);
    const data = await response.json();
    const scenarios = data.byDifficulty.intermediate;
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  }

  async expandVocabulary(text) {
    const words = text.split(/\s+/);
    const response = await fetch(`${VOCAB_API}/vocabulary/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ words })
    });
    return await response.json();
  }

  generateRecommendation(alternatives, scenario, vocabulary) {
    return {
      message: 'Here are ways to enhance your client communication',
      formalAlternatives: alternatives.formalAlternatives,
      practiceExample: `${scenario.plainVersion} → ${scenario.formalVersion}`,
      vocabularyTips: vocabulary.results.filter(r => r.found).slice(0, 3)
    };
  }
}

// Usage
const agent = new BusinessVocabularyAgent();
const result = await agent.analyzeClientCommunication('thanks for your email');
console.log(result);
```

## Testing the API

Use curl to test endpoints:

```bash
# Test formal phrase
curl -X POST http://localhost:5000/api/formal-phrase \
  -H "Content-Type: application/json" \
  -d '{"phrase":"thanks for your email","context":"business_email"}'

# Get vocabulary
curl http://localhost:5000/api/vocabulary/help

# Get phrases
curl "http://localhost:5000/api/phrases?category=greetings&level=formal"

# Get practice scenarios
curl http://localhost:5000/api/practice-scenarios

# Submit practice attempt
curl -X POST http://localhost:5000/api/practice-scenario/submit \
  -H "Content-Type: application/json" \
  -d '{"scenarioId":"s001","userAttempt":"Good morning, thank you for reaching out"}'
```

## Support

For issues or feature requests, create an issue on the GitHub repository.