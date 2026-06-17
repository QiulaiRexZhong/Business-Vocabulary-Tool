# Contributing to Business Vocabulary Tool

Thank you for your interest in contributing to the Business Vocabulary Tool! This document provides guidelines and instructions for contributing.

## How to Contribute

### 1. Fork and Clone

```bash
git clone https://github.com/YOUR_USERNAME/Business-Vocabulary-Tool.git
cd Business-Vocabulary-Tool
git remote add upstream https://github.com/QiulaiRexZhong/Business-Vocabulary-Tool.git
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes

- Follow the existing code style
- Add comments for complex logic
- Test your changes locally

### 4. Commit Your Changes

```bash
git add .
git commit -m "Add: description of your changes"
```

### 5. Push and Submit a Pull Request

```bash
git push origin feature/your-feature-name
```

## Types of Contributions

### Bug Reports

Submit issues with:
- Clear title and description
- Steps to reproduce
- Expected vs. actual behavior
- Environment details (OS, Node version, etc.)

### Feature Requests

Propose new features with:
- Clear use case
- Why it's needed
- Potential implementation approach

### Code Improvements

- Expand vocabulary database
- Add new scenarios
- Improve API documentation
- Optimize performance
- Add tests

## Vocabulary Database Expansion

To add new words to the vocabulary database:

1. Edit `src/routes/vocabulary.js`
2. Add entries following the existing format:

```javascript
'newword': {
  alternatives: ['alternative1', 'alternative2', 'alternative3'],
  partOfSpeech: 'noun/verb/adjective',
  examples: [
    'Example sentence 1',
    'Example sentence 2'
  ],
  mandarin: '中文翻译'
}
```

## Scenario Expansion

To add new practice scenarios:

1. Edit `src/routes/scenarios.js`
2. Add new scenario type with examples for each difficulty level
3. Include Mandarin translations

## Testing

Before submitting a PR:

```bash
npm test
```

## Code Style

- Use 2-space indentation
- Use camelCase for variables and functions
- Add JSDoc comments for public functions
- Keep lines under 100 characters when possible

## Pull Request Process

1. Update documentation as needed
2. Add tests for new functionality
3. Ensure all tests pass
4. Submit PR with clear description
5. Be responsive to review comments

## Questions?

Feel free to:
- Open an issue for discussion
- Ask in pull request comments
- Contact the maintainers

Thank you for contributing!
