# Security Policy

At Bhavesh Enterprises, maintaining the integrity and security of our industrial portal is a top priority. This policy outlines our supported versions and how to report vulnerabilities properly.

## Supported Versions

We actively provide security updates for the following versions:

| Version | Status |
|---------|--------|
| v1.x    | Supported |

## Reporting Vulnerabilities

If you identify a potential security issue, please practice **Responsible Disclosure**. Avoid disclosing vulnerabilities in public issues or community forums.

### Reporting Procedure
- **Direct Contact**: Email concerns to `admin@bhaveshenterprises.com`.
- **Details Needed**: Please include a clear description of the issue, steps to reproduce, and the potential impact on the system.
- **Encrypted Communication**: If you require PGP/GPG communication, please request our public key in your initial email.

### What to Expect
Upon receiving your report, we will:
1. **Acknowledge**: Respond to your initial report within 48 hours.
2. **Review**: Perform a technical assessment within 5 business days.
3. **Resolve**: Prioritize a patch based on the criticality of the bug. We aim for a 24-48 hour resolution for critical issues.

---

## Technical Safeguards

The platform is designed with a multi-layered security strategy:

- **Identity Management**: Secure JWT sessions via NextAuth.js with Bcrypt hashing for password storage.
- **Traffic Control**: Integrated rate limiting at the infrastructure level to prevent brute-force and resource exhaustion.
- **Request Integrity**: Mandatory Zod schema validation for all incoming API payloads.
- **Database Security**: Prisma-managed queries to prevent SQL injection and Supabase Row Level Security (RLS) for data isolation.
- **Storage Security**: Filename sanitization and extension whitelisting to prevent malicious file execution.

---

## Professional Standards

We routinely sweep our codebase for vulnerabilities using `npm audit` and automated dependency tracking. We recommend keeping your fork/deployment updated with the latest security patches from the `main` branch.

*Last updated: January 2026*
