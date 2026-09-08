# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of Arome Haven seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do NOT report security vulnerabilities through public GitHub issues.**

### How to Report

1. **Email**: Send an email to [kpotheeshvignesh@gmail.com](mailto:kpotheeshvignesh@gmail.com) with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Any suggested fixes (if applicable)

2. **GitHub Private Vulnerability Reporting**: 
   - Go to the repository's Security tab
   - Click "Report a vulnerability"
   - Provide detailed information

### What to Expect

- We will acknowledge your report within **48 hours**
- We will provide a preliminary assessment within **5 business days**
- We will keep you informed of our progress
- We request that you give us reasonable time to fix the issue before disclosing it publicly

### Security Best Practices

#### For Contributors

- Never commit sensitive data (API keys, passwords, tokens)
- Use environment variables for configuration
- Keep dependencies updated
- Follow secure coding practices

#### Current Security Measures

- ✅ Dependencies regularly audited via Dependabot
- ✅ CI/CD pipeline includes security scanning
- ✅ No hardcoded secrets in source code
- ✅ Input validation on all user-facing components
- ✅ HTTPS-only for production deployments

### Security Updates

Security updates are released as patch versions. Users are encouraged to:
- Enable Dependabot notifications
- Regularly update to the latest version
- Monitor the CHANGELOG.md for security-related updates

### Known Limitations

As a frontend-focused application:
- API key management relies on proper environment configuration
- Third-party service security (Google AI, etc.) is outside our direct control
- Client-side validation should be supplemented with server-side checks in production

## Security Contact

For any security-related questions or concerns:
- Email: kpotheeshvignesh@gmail.com
- Please use encrypted communication for sensitive information

---

*Last updated: January 2025*
