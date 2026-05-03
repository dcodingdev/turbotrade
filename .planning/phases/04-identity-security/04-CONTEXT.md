# CONTEXT: Phase 4 — Identity & Security

## 1. Domain
Establishing the frontend authentication foundation and Role-Based Access Control (RBAC) logic across the NexusMarket monorepo.

## 2. Requirements Locked (from SPEC.md / Discussion)
- [x] **R1**: Register and Login flows for Customers and Vendors.
- [x] **R2**: Frontend RBAC logic mapped to `auth-service` roles.
- [x] **R3**: Secure session management using HttpOnly cookies.
- [x] **R4**: Route protection using Next.js Middleware and Layout Guards.

## 3. Implementation Decisions

### 3.1 RBAC Strategy (Hybrid Defense)
- **Decision**: Implement a "Defense in Depth" approach using both Next.js Middleware and Layout-level Portal Guards.
- **Implementation**:
  - **Middleware (Primary)**: Intercept requests at the edge. Decode the JWT (without DB lookup) to verify role claims for protected paths (e.g., `/vendor/*`, `/admin/*`).
  - **Portal Guards (Secondary)**: Use layout-level wrappers (e.g., `(vendor)/layout.tsx`) to prevent rendering sensitive UI even if middleware is bypassed.
- **Benefit**: Prevents "flash of unauthorized content" and provides robust security at both network and application levels.

### 3.2 Session Management (HttpOnly)
- **Decision**: Use `HttpOnly`, `SameSite=Strict` cookies for session persistence.
- **Implementation**:
  - `auth-service` sets the `Set-Cookie` header on login/refresh.
  - **Token Rotation**: Frontend interceptors will handle `accessToken` expiration by hitting the `/refresh` endpoint to get new cookies/tokens.
  - **Security**: JavaScript cannot read these cookies, mitigating XSS risks.

### 3.3 Onboarding & Registration (Portal-Specific)
- **Decision**: Use dedicated, portal-specific registration flows to maximize conversion.
- **Flows**:
  - **Customer**: Lightweight signup (Email/Password or Social).
  - **Vendor**: Multi-step wizard to collect business-critical data (Shop Name, Tax ID, etc.) required by Phase 1.1/Payment-service.

### 3.4 UI Feedback (Masking & Opportunities)
- **Decision**: Tailor the response to unauthorized access based on the portal's sensitivity.
- **Behavior**:
  - **Admin Panel**: **404 Masking**. Users without admin roles see a "Page Not Found" to hide the management entry point.
  - **Vendor Dashboard**: **Inline Access Request**. Customers hitting vendor routes see an "Upgrade to Vendor" landing page/call-to-action.

## 4. Code Context & Integration
- **Backend Service**: `services/auth-service` (Express).
- **Backend Endpoint**: `/api/auth/login`, `/api/auth/register`, `/api/auth/refresh`.
- **Frontend App**: `apps/web` (Next.js App Router).
- **Integration Points**:
  - `apps/web/middleware.ts` (Next.js Middleware).
  - `apps/web/src/app/(vendor)/layout.tsx` (Portal Guard).
  - `apps/web/src/app/(admin)/layout.tsx` (Portal Guard).

## 5. Deferred Ideas
- **Biometric Auth**: Fingerprint/FaceID login for mobile users.
- **Hardware Keys**: FIDO2/WebAuthn support for Admin accounts.
- **Social Auth Providers**: Google/GitHub OAuth integration (to be added after core email/password flow is stable).
