# Contributing to BioMarine-AI

Thank you for your interest in contributing to BioMarine-AI! This document provides guidelines and instructions for contributing to the project.

## 🌟 Ways to Contribute

There are many ways you can contribute to BioMarine-AI:

- **Report Bugs**: Help us identify and fix bugs
- **Suggest Features**: Propose new features or enhancements
- **Improve Documentation**: Enhance docs, fix typos, add examples
- **Submit Code**: Fix bugs, implement features, improve performance
- **Review Pull Requests**: Help review and test PRs from other contributors
- **Share Knowledge**: Write tutorials, create demos, share use cases

## 🐛 Reporting Bugs

Before creating a bug report, please check the [existing issues](https://github.com/AyushChoudhary6/biomarine-ai/issues) to avoid duplicates.

### How to Report a Bug

1. **Use the Bug Report Template**: When creating an issue, select the bug report template
2. **Provide a Clear Title**: Use a descriptive title that summarizes the issue
3. **Describe the Bug**: Explain what happened and what you expected to happen
4. **Steps to Reproduce**: Provide detailed steps to reproduce the issue
5. **Environment Details**: Include your OS, browser, Node.js version, etc.
6. **Screenshots**: Add screenshots if applicable
7. **Error Messages**: Include any error messages or logs

### Bug Report Example

```markdown
**Title**: Image upload fails on Safari browser

**Description**: When uploading an image in the Data Upload page, the upload fails silently on Safari.

**Steps to Reproduce**:
1. Open the app in Safari (v16.0)
2. Navigate to /upload
3. Select an image file
4. Click "Upload"
5. No error message appears, but upload doesn't complete

**Expected Behavior**: Image should upload successfully with progress indicator

**Environment**:
- OS: macOS 13.0
- Browser: Safari 16.0
- Node.js: v18.16.0

**Screenshots**: [Attach screenshot]
```

## ✨ Suggesting Features

We welcome feature suggestions! Before creating a feature request:

1. Check existing issues and discussions
2. Consider if it aligns with the project's goals
3. Think about how it benefits users

### How to Suggest a Feature

1. **Use the Feature Request Template**: Select the feature request template
2. **Clear Description**: Explain the feature and its benefits
3. **Use Cases**: Describe scenarios where this feature would be useful
4. **Alternatives**: Mention any alternative solutions you've considered
5. **Additional Context**: Add mockups, examples, or references

## 💻 Code Contributions

### Getting Started

1. **Fork the Repository**
   ```bash
   git clone https://github.com/AyushChoudhary6/biomarine-ai.git
   cd biomarine-ai
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Workflow

1. **Make Your Changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Keep changes focused and atomic

2. **Test Your Changes**
   ```bash
   npm run dev        # Test locally
   npm run build      # Test production build
   npm run lint       # Check code quality
   ```

3. **Commit Your Changes**
   - Use [Conventional Commits](https://www.conventionalcommits.org/)
   - Write clear, descriptive commit messages
   
   ```bash
   git add .
   git commit -m "feat: add species filter to dashboard"
   ```

4. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template
   - Request reviews

### Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

**Format**: `<type>(<scope>): <description>`

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without changing functionality
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates
- `ci`: CI/CD configuration changes

**Examples**:
```bash
feat(dashboard): add real-time species count widget
fix(upload): resolve image preprocessing issue on mobile
docs(readme): update installation instructions
style(components): format code with Prettier
refactor(aiModel): optimize classification algorithm
perf(images): implement lazy loading for gallery
test(utils): add unit tests for aiModel utilities
chore(deps): update React to v19.1.1
ci(workflows): add automated security scanning
```

### Code Style Guidelines

#### JavaScript/React

- Use functional components with hooks
- Use meaningful variable and function names
- Keep components small and focused (under 300 lines)
- Extract reusable logic into custom hooks
- Use PropTypes or TypeScript for type checking
- Add JSDoc comments for complex functions

**Good Example**:
```javascript
/**
 * Classify marine species from an image
 * @param {File} imageFile - The image file to classify
 * @returns {Promise<Object>} Classification results with species and confidence
 */
const classifySpecies = async (imageFile) => {
  try {
    const preprocessed = await preprocessImage(imageFile)
    const results = await model.predict(preprocessed)
    return formatResults(results)
  } catch (error) {
    logger.error('Classification failed', error)
    throw new Error('Failed to classify species')
  }
}
```

#### CSS/Tailwind

- Use Tailwind utility classes
- Create custom classes for repeated patterns
- Follow mobile-first approach
- Use semantic class names for custom CSS

```javascript
// Good: Clear, semantic classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-gray-900">Species Name</h2>
</div>

// Bad: Unclear, too many classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
```

### Pull Request Guidelines

#### Before Submitting

- [ ] Code follows project style guidelines
- [ ] All tests pass locally
- [ ] No linting errors
- [ ] Documentation updated (if needed)
- [ ] Changes are well-tested
- [ ] Commits follow conventional commits format
- [ ] Branch is up-to-date with main

#### PR Title

Use the same format as commit messages:
- `feat: add species comparison feature`
- `fix: resolve memory leak in image processor`
- `docs: update API documentation`

#### PR Description

Provide a clear description:

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Added species comparison widget
- Implemented side-by-side view
- Updated dashboard layout
- Added unit tests

## Testing
- Tested on Chrome, Firefox, Safari
- Verified mobile responsiveness
- Checked accessibility with screen reader

## Screenshots
[Add screenshots if applicable]

## Related Issues
Closes #123
Relates to #456
```

#### Review Process

1. **Automated Checks**: CI/CD pipeline runs automatically
2. **Code Review**: Maintainers review your code
3. **Feedback**: Address any comments or requested changes
4. **Approval**: Once approved, maintainers will merge

### Testing

#### Manual Testing

1. **Functionality**: Verify all features work as expected
2. **Edge Cases**: Test with invalid inputs, empty states
3. **Browser Compatibility**: Test on Chrome, Firefox, Safari
4. **Responsive Design**: Test on mobile, tablet, desktop
5. **Performance**: Check for memory leaks, slow operations

#### Writing Tests (Future)

When test infrastructure is added:

```javascript
// Example unit test
describe('Marine Species Classifier', () => {
  it('should classify mackerel with high confidence', async () => {
    const classifier = new MarineSpeciesClassifier()
    await classifier.loadModel()
    
    const result = await classifier.classifyImage(mackerelImage)
    
    expect(result.species).toBe('Indian Mackerel')
    expect(result.confidence).toBeGreaterThan(0.8)
  })
})
```

## 📚 Documentation

### Updating Documentation

- Keep README.md up-to-date
- Document new features
- Add code examples
- Update API documentation
- Fix typos and improve clarity

### Documentation Style

- Use clear, concise language
- Include code examples
- Add screenshots for UI features
- Explain why, not just what
- Keep it beginner-friendly

## 🎨 Design Guidelines

### UI/UX Principles

- **Consistency**: Follow existing design patterns
- **Accessibility**: Use semantic HTML, ARIA labels
- **Responsiveness**: Mobile-first approach
- **Performance**: Optimize images, lazy load components
- **Feedback**: Provide loading states, error messages

### Color Scheme

- Primary: Blue ocean colors
- Secondary: Marine green/teal
- Accents: Coral/orange for highlights
- Text: High contrast for readability

## 🔒 Security

### Reporting Security Issues

**DO NOT** create public issues for security vulnerabilities.

Instead, email security concerns to the maintainers privately.

### Security Best Practices

- Never commit secrets or API keys
- Validate and sanitize user inputs
- Use HTTPS for all external requests
- Keep dependencies up-to-date
- Follow OWASP security guidelines

## 📝 License

By contributing to BioMarine-AI, you agree that your contributions will be licensed under the MIT License.

## 🤝 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, nationality, personal appearance, race, religion, or sexual identity.

### Our Standards

**Positive Behavior**:
- Being respectful and inclusive
- Accepting constructive criticism
- Focusing on what's best for the community
- Showing empathy towards others

**Unacceptable Behavior**:
- Harassment or discriminatory comments
- Personal attacks
- Publishing private information
- Any unprofessional conduct

### Enforcement

Violations should be reported to project maintainers. All complaints will be reviewed and investigated.

## 💬 Questions?

- **GitHub Discussions**: Ask questions and share ideas
- **Issues**: For bug reports and feature requests
- **Email**: Contact maintainers directly

## 🙏 Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to BioMarine-AI! 🌊🐠
