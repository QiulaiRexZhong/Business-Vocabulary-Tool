# Setup and Installation Guide

## Prerequisites

- **Node.js**: v14 or higher
- **npm**: v6 or higher
- **Python**: v3.8 or higher (optional, for future NLP enhancements)
- **pip**: Python package manager (optional)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/QiulaiRexZhong/Business-Vocabulary-Tool.git
cd Business-Vocabulary-Tool
```

### 2. Install Node.js Dependencies

```bash
npm install
```

### 3. (Optional) Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 4. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` if needed:

```
PORT=5000
ENVIRONMENT=development
LOG_LEVEL=info
NODE_ENV=development
```

### 5. Start the Server

```bash
npm start
```

You should see:

```
🚀 API Server running at http://localhost:5000
📚 Visit http://localhost:5000 for API documentation
```

### 6. Verify Installation

Open your browser or use curl to test the API:

```bash
curl http://localhost:5000/
```

You should get a JSON response with API information.

## Development Mode

To run the server with automatic restart on file changes:

```bash
npm run dev
```

This requires `nodemon` to be installed (already included in dependencies).

## Testing the API

### Test Formal Phrase Endpoint

```bash
curl -X POST http://localhost:5000/api/formal-phrase \
  -H "Content-Type: application/json" \
  -d '{"phrase":"thanks for your email","context":"business_email"}'
```

### Test Practice Scenario Endpoint

```bash
curl -X POST http://localhost:5000/api/practice-scenario \
  -H "Content-Type: application/json" \
  -d '{"scenario":"greeting","difficulty":"intermediate"}'
```

### Test Phrase Bank Endpoint

```bash
curl "http://localhost:5000/api/phrases?category=greetings&level=formal"
```

### Test Vocabulary Builder Endpoint

```bash
curl -X POST http://localhost:5000/api/vocabulary/builder \
  -H "Content-Type: application/json" \
  -d '{"word":"help"}'
```

## Project Structure

```
Business-Vocabulary-Tool/
├── server.js                      # Main Express server
├── package.json                   # Node dependencies
├── requirements.txt               # Python dependencies
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore rules
├── README.md                      # Project overview
├── SETUP.md                       # This file
├── AGENT_INTEGRATION.md           # Agent integration guide
├── src/
│   ├── routes/
│   │   ├── formalPhrase.js        # Formal phrase conversion
│   │   ├── scenarios.js           # Practice scenarios
│   │   ├── phraseBank.js          # Phrase bank queries
│   │   └── vocabulary.js          # Vocabulary expansion
│   ├── middleware/
│   │   └── errorHandler.js        # Error handling
│   └── utils/
│       └── validator.js           # Input validation
└── tests/
    └── api.test.js                # API tests
```

## Troubleshooting

### Port Already in Use

If port 5000 is already in use, change it in `.env`:

```
PORT=5001
```

Then start the server again.

### Module Not Found

If you get "module not found" errors:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Permission Denied

On Linux/Mac, if you get permission errors:

```bash
sudo npm install -g npm
npm install
```

## Production Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables for Production

```
PORT=5000
ENVIRONMENT=production
LOG_LEVEL=error
NODE_ENV=production
```

### Using PM2 (Process Manager)

```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start server.js --name "vocab-tool"

# View logs
pm2 logs vocab-tool

# Restart
pm2 restart vocab-tool
```

## Support

For issues or questions, please open an issue on GitHub:
https://github.com/QiulaiRexZhong/Business-Vocabulary-Tool/issues
