const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const winston = require('winston');
require('express-async-errors');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Logger setup
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, { timestamp: new Date().toISOString() });
  next();
});

// Import routes
const formalPhraseRoutes = require('./src/routes/formalPhrase');
const scenarioRoutes = require('./src/routes/scenarios');
const phraseBankRoutes = require('./src/routes/phraseBank');
const vocabularyRoutes = require('./src/routes/vocabulary');

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/formal-phrase', formalPhraseRoutes);
app.use('/api/practice-scenario', scenarioRoutes);
app.use('/api/phrases', phraseBankRoutes);
app.use('/api/vocabulary', vocabularyRoutes);

// Root endpoint with API documentation
app.get('/', (req, res) => {
  res.json({
    name: 'Business Vocabulary Tool',
    version: '1.0.0',
    description: 'Formal English language practice and vocabulary expansion tool',
    endpoints: {
      health: '/health',
      formalPhrase: {
        method: 'POST',
        path: '/api/formal-phrase',
        description: 'Convert plain English to formal alternatives'
      },
      practiceScenario: {
        method: 'POST',
        path: '/api/practice-scenario',
        description: 'Get practice scenarios for client communication'
      },
      phraseBank: {
        method: 'GET',
        path: '/api/phrases',
        description: 'Query formal business phrases'
      },
      vocabulary: {
        method: 'POST',
        path: '/api/vocabulary-builder',
        description: 'Expand vocabulary with formal alternatives'
      }
    },
    documentation: 'See AGENT_INTEGRATION.md for detailed usage'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });
  
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message || 'Internal Server Error',
      timestamp: new Date().toISOString()
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      status: 404,
      message: `Route ${req.path} not found`,
      timestamp: new Date().toISOString()
    }
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Business Vocabulary Tool API started on port ${PORT}`);
  console.log(`\n🚀 API Server running at http://localhost:${PORT}`);
  console.log(`📚 Visit http://localhost:${PORT} for API documentation\n`);
});

module.exports = app;
