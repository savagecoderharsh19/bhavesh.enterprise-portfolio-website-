# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 1.x.x   | ✅ Actively supported |

## Reporting a Vulnerability

We take security seriously at Bhavesh Enterprises. If you discover a security vulnerability, please follow responsible disclosure practices.

### How to Report

1. **Do NOT** create a public GitHub issue for security vulnerabilities
2. Email security concerns to: **admin@bhaveshenterprises.com**
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 5 business days
- **Resolution Timeline**: Depends on severity
  - Critical: 24-48 hours
  - High: 7 days
  - Medium: 30 days
  - Low: 90 days

### Security Measures Implemented

This application implements the following security controls:

#### Authentication & Authorization
- JWT-based session management via NextAuth.js
- Role-based access control (RBAC)
- Secure password hashing with bcryptjs
- Protected admin routes via middleware

#### Input Validation
- Zod schema validation on all API endpoints
- Prisma ORM for parameterized queries (SQL injection prevention)
- File upload validation (type, extension, size)
- Filename sanitization

#### Rate Limiting
- Form submissions: 5 requests/minute per IP
- File uploads: 10 requests/minute per IP
- Proper 429 responses with Retry-After headers

#### Security Headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy (restricted)
- X-Powered-By header disabled

#### Data Protection
- Environment variables excluded from VCS
- Row Level Security (RLS) on database
- CSV injection prevention in exports
- No sensitive data in client bundles

## Security Updates

Security patches are released as soon as possible after verification. We recommend:

1. Keep dependencies updated (`npm audit fix`)
2. Monitor GitHub security advisories
3. Enable Dependabot alerts on your fork
4. Subscribe to Next.js security announcements

## Third-Party Dependencies

We regularly audit our dependencies using:
- `npm audit`
- GitHub Dependabot
- Snyk (optional)

Current status: **0 known vulnerabilities**

---

*Last updated: January 2026*
