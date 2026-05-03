# Phase 5: B2C Experience - Patterns

## 1. Backend Patterns

### 1.1 Controllers (Filtered Queries)
- **Target**: `order.controller.ts` (Get My Orders)
- **Analog**: `services/order-service/src/modules/order.controller.ts` (Already exists, needs enhancement).
- **Pattern**:
  ```typescript
  export const getMyOrders = async (req: Request, res: Response) => {
    const customerId = req.user.id; // From auth middleware
    const orders = await Order.find({ customer: customerId }).sort({ createdAt: -1 });
    res.json(orders);
  };
  ```

### 1.2 Schemas (Nested Objects)
- **Target**: `User` model address extension.
- **Analog**: `services/auth-service/src/modules/users/user.model.ts`
- **Pattern**:
  ```typescript
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    // ...
  }
  ```

## 2. Frontend Patterns

### 2.1 Hooks (Data Fetching)
- **Target**: `useCustomerOrders`
- **Analog**: `apps/web/src/modules/products/hooks/useProductMutations.ts` (or standard `useQuery` pattern).
- **Pattern**:
  ```typescript
  export const useCustomerOrders = () => {
    return useQuery({
      queryKey: ['orders', 'my-orders'],
      queryFn: () => orderClient.getMyOrders(),
    });
  };
  ```

### 2.2 Layouts (Protected Portals)
- **Target**: `apps/web/src/app/(store)/account/layout.tsx`
- **Analog**: `apps/web/src/app/(vendor)/layout.tsx`
- **Pattern**:
  ```tsx
  export default function AccountLayout({ children }) {
    return (
      <AuthGuard allowedRoles={[UserRole.CUSTOMER]}>
        <div className="account-layout">
          <AccountSidebar />
          <main>{children}</main>
        </div>
      </AuthGuard>
    );
  }
  ```

## 3. Integration Points
- **Middleware**: Use the shared `authenticate` middleware in microservices.
- **Shared Types**: Add `IReview` and `IAddress` to `packages/types`.

## PATTERN MAPPING COMPLETE
