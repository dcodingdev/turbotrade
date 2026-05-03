# Discussion Log: Phase 4 — Identity & Security

## Areas Explored

### 1. RBAC Strategy
- **Options presented**: Centralized Middleware, Portal Guards, Decentralized Hooks.
- **User Selection**: **Hybrid (Middleware + Portal Guards)**.
- **Rationale**: Defense in Depth. Middleware handles the network-level redirect (no flash of content), while Layout Guards ensure UI-level protection.

### 2. Session Management
- **Options presented**: HttpOnly Cookies vs LocalStorage.
- **User Selection**: **HttpOnly Cookies**.
- **Rationale**: Gold standard for security (XSS prevention). SameSite=Strict ensures CSRF protection. Token rotation flow via `/refresh`.

### 3. Onboarding & Registration
- **Options presented**: Dedicated pages vs Portal-specific wizards.
- **User Selection**: **Portal-Specific Flows**.
- **Rationale**: Separation of concerns. Customers want speed; Vendors need to provide business data for compliance and payments.

### 4. UI Feedback
- **Options presented**: Hard Redirect, 404 Masking, Inline Access Request.
- **User Selection**: **Mixed Strategy**.
  - Admin: 404 Masking (Security through obscurity).
  - Vendor: Inline Access Request (Growth opportunity/Up-selling).

## Deferred Ideas
- Biometric Auth.
- Hardware Keys (WebAuthn).
- Social Auth (deferred until email/password is stable).

---
*Log generated: 2026-05-03*
