/**
 * API Tests for Business Vocabulary Tool
 * Run with: npm test
 */

const request = require('supertest');
const app = require('../server');

describe('Business Vocabulary Tool API', () => {
  
  describe('Health Check', () => {
    it('should return healthy status', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('healthy');
    });
  });

  describe('Root Endpoint', () => {
    it('should return API documentation', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('Business Vocabulary Tool');
      expect(res.body.endpoints).toBeDefined();
    });
  });

  describe('Formal Phrase Endpoint', () => {
    it('should convert plain phrase to formal alternatives', async () => {
      const res = await request(app)
        .post('/api/formal-phrase')
        .send({
          phrase: 'thanks for your email',
          context: 'business_email'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.original).toBe('thanks for your email');
      expect(Array.isArray(res.body.formalAlternatives)).toBe(true);
      expect(res.body.formalAlternatives.length).toBeGreaterThan(0);
    });

    it('should return error for invalid phrase', async () => {
      const res = await request(app)
        .post('/api/formal-phrase')
        .send({});
      
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('Practice Scenario Endpoint', () => {
    it('should return practice scenario', async () => {
      const res = await request(app)
        .post('/api/practice-scenario')
        .send({
          scenario: 'greeting',
          difficulty: 'intermediate'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.plainVersion).toBeDefined();
      expect(res.body.formalVersion).toBeDefined();
      expect(res.body.explanation).toBeDefined();
    });

    it('should return error for invalid scenario', async () => {
      const res = await request(app)
        .post('/api/practice-scenario')
        .send({
          scenario: 'nonexistent'
        });
      
      expect(res.statusCode).toBe(404);
    });
  });

  describe('Phrase Bank Endpoint', () => {
    it('should return phrases for category', async () => {
      const res = await request(app)
        .get('/api/phrases?category=greetings&level=formal');
      
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.results)).toBe(true);
      expect(res.body.count).toBeGreaterThan(0);
    });

    it('should return all phrases without filters', async () => {
      const res = await request(app).get('/api/phrases');
      
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.results)).toBe(true);
    });
  });

  describe('Vocabulary Endpoint', () => {
    it('should return vocabulary alternatives for word', async () => {
      const res = await request(app)
        .post('/api/vocabulary/builder')
        .send({ word: 'help' });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.word).toBe('help');
      expect(Array.isArray(res.body.formalAlternatives)).toBe(true);
      expect(res.body.examples).toBeDefined();
    });

    it('should handle batch vocabulary requests', async () => {
      const res = await request(app)
        .post('/api/vocabulary/batch')
        .send({ words: ['help', 'thanks', 'nonexistent'] });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.results).toBeDefined();
      expect(res.body.results.length).toBe(3);
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for unknown route', async () => {
      const res = await request(app).get('/api/unknown');
      expect(res.statusCode).toBe(404);
    });
  });
});

// Export for testing frameworks
module.exports = app;
