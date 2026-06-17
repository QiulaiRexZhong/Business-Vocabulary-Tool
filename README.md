# Business Vocabulary Tool

A comprehensive language practice tool for expanding business vocabulary and formal English communication. This tool is designed for non-native English speakers who want to enhance their professional communication with clients by adopting more formal, sophisticated language patterns.

## Features

- **Vocabulary Expansion**: Generate formal alternatives to common English phrases
- **Client Communication Simulator**: Practice formal business communication scenarios
- **Phrase Bank**: Curated database of formal business expressions
- **RESTful API**: Easy integration with agents and external applications
- **Bilingual Support**: English-Mandarin translations for context

## Quick Start

### Prerequisites
- Node.js 14+ and npm
- Python 3.8+
- pip

### Installation

```bash
# Clone the repository
git clone https://github.com/QiulaiRexZhong/Business-Vocabulary-Tool.git
cd Business-Vocabulary-Tool

# Install Node.js dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt
```

### Running the Application

```bash
# Start the API server
npm start

# Server will run on http://localhost:5000
```

### API Endpoints

#### 1. Formal Phrase Generator
```bash
POST /api/formal-phrase
Content-Type: application/json

{
  "phrase": "thanks for your email",
  "context": "business_email"
}

Response:
{
  "original": "thanks for your email",
  "formalAlternatives": [
    "Thank you for your correspondence",
    "I appreciate your message",
    "Thank you for reaching out"
  ],
  "recommendedLevel": "formal"
}
```

#### 2. Client Communication Practice
```bash
POST /api/practice-scenario
Content-Type: application/json

{
  "scenario": "greeting",
  "difficulty": "advanced"
}

Response:
{
  "scenario": "greeting",
  "plainVersion": "Hey, how's it going?",
  "formalVersion": "Good morning, I hope this finds you well",
  "explanation": "Use formal greetings in client-facing communications",
  "vocabulary": ["correspondence", "endeavor", "facilitate"]
}
```

#### 3. Phrase Bank Query
```bash
GET /api/phrases?category=greetings&level=formal

Response:
{
  "category": "greetings",
  "level": "formal",
  "phrases": [
    {
      "english": "Good morning, I hope this finds you well",
      "mandarin": "早上好，希望您一切安好",
      "context": "formal_greeting",
      "usage": "Professional email opening"
    }
  ]
}
```

#### 4. Vocabulary Expansion
```bash
POST /api/vocabulary-builder
Content-Type: application/json

{
  "word": "help",
  "partOfSpeech": "verb"
}

Response:
{
  "word": "help",
  "formalAlternatives": [
    "assist",
    "facilitate",
    "provide support",
    "render assistance"
  ],
  "examples": [
    "We can assist you with this matter",
    "We aim to facilitate your success"
  ],
  "mandarin": "帮助"
}
```

## Project Structure

```
Business-Vocabulary-Tool/
├── server.js                 # Express API server
├── package.json             # Node.js dependencies
├── requirements.txt         # Python dependencies
├── README.md               # This file
├── data/
│   ├── phrases.json        # Phrase bank database
│   ├── scenarios.json      # Practice scenarios
│   └── vocabulary.json     # Vocabulary mappings
├── src/
│   ├── routes/
│   │   ├── formalPhrase.js
│   │   ├── scenarios.js
│   │   ├── phraseBank.js
│   │   └── vocabulary.js
│   ├── middleware/
│   │   └── errorHandler.js
│   └── utils/
│       ├── nlpProcessor.py
│       └── validator.js
└── tests/
    └── api.test.js
```

## Usage for Claude Code Agents

This tool is designed to be called by AI agents. Here's how to integrate it:

### Example Agent Call

```javascript
// In your agent code
const formalPhrase = await fetch('http://localhost:5000/api/formal-phrase', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phrase: 'we need to talk about this',
    context: 'client_meeting'
  })
});

const result = await formalPhrase.json();
console.log(result.formalAlternatives);
```

## Configuration

Create a `.env` file for configuration:

```
PORT=5000
ENVIRONMENT=development
LOG_LEVEL=info
```

## Development

```bash
# Run tests
npm test

# Start in development mode with hot reload
npm run dev

# Build production bundle
npm run build
```

## License

MIT

## Support

For issues, questions, or feature requests, please create an issue on GitHub.

## Author

Created for formal English language practice and professional communication enhancement.