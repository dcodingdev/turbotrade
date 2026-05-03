---
wave: 1
depends_on: []
files_modified:
  - services/auth-service/src/modules/users/user.model.ts
  - services/order-service/src/modules/order.controller.ts
  - services/product-service/src/modules/reviews/review.model.ts
  - apps/web/src/app/(store)/account/layout.tsx
autonomous: true
---
# Phase 5: B2C Experience - Plan

## 1. Overview
Implementing the customer-facing "My Account" portal, verified product reviews, and real-time order history tracking.

## 2. Execution Waves

### Wave 1: Core Data Models & Profile API
**Goal:** Prepare Auth and Order services for customer data.

#### Task 1: Extend User Schema with Address
- **ID:** 05-W1-T1
- **read_first:** `services/auth-service/src/modules/users/user.model.ts`
- **action:** Add `address` field to `IUser` interface and `UserSchema` with `street`, `city`, `state`, `zip`, and `country`.
- **acceptance_criteria:** `User.findOne()` returns an object with a defined `address` property.

#### Task 2: Implement Customer Order History Endpoint
- **ID:** 05-W1-T2
- **read_first:** `services/order-service/src/modules/order.controller.ts`
- **action:** Add `getMyOrders` method to `OrderController` that filters by `req.user.id`. Add `GET /my-orders` route to `order.routes.ts`.
- **acceptance_criteria:** `GET /api/v1/orders/my-orders` returns orders for the logged-in user.

### Wave 2: Product Reviews Module (Backend)
**Goal:** Build the verified review system in `product-service`.

#### Task 1: Create Review Module
- **ID:** 05-W2-T1
- **read_first:** `services/product-service/src/modules/products/product.model.ts`
- **action:** Create `src/modules/reviews/review.model.ts` with `ReviewSchema` (product, customer, rating, comment, isVerified).
- **acceptance_criteria:** `Review` model is registered and exported.

#### Task 2: Implement Review Creation with Verification
- **ID:** 05-W2-T2
- **read_first:** `services/order-service/src/modules/order.model.ts`
- **action:** Create `POST /api/v1/products/:id/reviews`. Implement logic to verify the user has a "COMPLETED" order for the product before saving.
- **acceptance_criteria:** Review is only saved if verification passes; returns 403 otherwise.

### Wave 3: Account Hub & Profile UI
**Goal:** Build the frontend shell for customers.

#### Task 1: Account Layout & Dashboard
- **ID:** 05-W3-T1
- **read_first:** `apps/web/src/app/(vendor)/layout.tsx`
- **action:** Create `apps/web/src/app/(store)/account/layout.tsx` using `AuthGuard` (allowedRoles: CUSTOMER). Create `page.tsx` for the overview dashboard.
- **acceptance_criteria:** Navigating to `/account` shows the dashboard with customer name.

#### Task 2: Profile & Address Editor
- **ID:** 05-W3-T2
- **read_first:** `apps/web/src/app/(store)/register/page.tsx`
- **action:** Create `apps/web/src/app/(store)/account/profile/page.tsx`. Implement form with `name` and `address` fields using React Hook Form.
- **acceptance_criteria:** Submitting the form updates the user's name and address in `auth-service`.

### Wave 4: Order History & Review UI
**Goal:** Finalize the B2C feature set.

#### Task 1: Order History Table
- **ID:** 05-W4-T1
- **read_first:** `apps/web/src/app/(vendor)/vendor/inventory/page.tsx`
- **action:** Create `apps/web/src/app/(store)/account/orders/page.tsx`. Fetch data using a new `useCustomerOrders` hook. Display orders in a table with status badges.
- **acceptance_criteria:** Page lists all orders for the current user.

#### Task 2: Review Submission Form
- **ID:** 05-W4-T2
- **read_first:** `apps/web/src/modules/products/components/ProductForm.tsx`
- **action:** Create a `ReviewForm` component. Integrate it into the product detail page (or order history). Add verification badge if `isVerified` is true.
- **acceptance_criteria:** Users can submit ratings and comments; reviews appear on the product page.

## 3. Verification
- [ ] `npm run test` in microservices.
- [ ] End-to-end flow: Place order (manual DB state) -> View history -> Submit Review.

## 4. Requirement Traceability
- **CUST-01**: 05-W3-T1, 05-W3-T2
- **CUST-02**: 05-W1-T2, 05-W4-T1
- **CUST-03**: 05-W1-T1, 05-W3-T2
- **CUST-04**: 05-W2-T1, 05-W2-T2, 05-W4-T2
