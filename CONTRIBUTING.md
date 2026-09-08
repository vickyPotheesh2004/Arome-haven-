# Contributing to Arome Haven

Thank you for your interest in contributing to Arome Haven! This document provides guidelines and instructions for contributing.

## 🌟 How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- Clear title and description
- Steps to reproduce the behavior
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (browser, OS, etc.)

**Example:**
```markdown
**Bug**: Swipe deck doesn't update after swipe

**Steps to Reproduce:**
1. Go to Menu page
2. Swipe a card right
3. Card remains visible

**Expected:** Card should be removed and next card shown
```

### Suggesting Features

Feature suggestions are welcome! Please provide:

- Use case for the feature
- Proposed solution
- Alternative solutions considered
- Additional context

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write/update tests
5. Ensure all tests pass and coverage is maintained
6. Commit with clear messages following [Conventional Commits](https://www.conventionalcommits.org/)
7. Push to your branch
8. Open a Pull Request

## 📋 Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Arome-haven-.git

# Navigate to project
cd Arome-haven-

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linter
npm run lint

# Type check
npm run typecheck

# Build for production
npm run build
```

## 🧪 Testing Guidelines

- Write tests for new features
- Maintain or improve code coverage
- Test edge cases and error conditions
- Use meaningful test descriptions

```typescript
// Good test example
describe('StoreContext', () => {
  it('should add item to cart with correct quantity', () => {
    // Arrange
    const product = mockProduct;
    
    // Act
    act(() => {
      result.current.addToCart(product);
    });
    
    // Assert
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(1);
  });
});
```

## 💻 Coding Standards

### TypeScript

- Use strict typing when possible
- Define interfaces for complex objects
- Use type aliases for union types

### React

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop typing

### Code Style

- Follow ESLint rules
- Use meaningful variable/function names
- Add comments for complex logic
- Keep lines under 120 characters

## 📝 Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(menu): add search functionality to menu page
fix(cart): resolve quantity update issue
test(context): add unit tests for StoreContext
docs(readme): update installation instructions
```

## 🔍 Code Review Process

All PRs require:
- ✅ Passing CI checks
- ✅ At least one approval
- ✅ Addressed review comments
- ✅ Updated documentation if needed

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## ❓ Questions?

Feel free to open an issue for any questions or discussions.
