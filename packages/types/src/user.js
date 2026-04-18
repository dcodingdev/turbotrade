// export enum UserRole {
//   ADMIN = 'admin',
//   VENDOR = 'vendor',
//   CUSTOMER = 'customer'
// }
// export interface User {
//   id: string;
//   email: string;
//   name: string;
//   role: UserRole;
//   createdAt: Date;
// }
// // Ensure this is EXACTLY as named here
// export interface AuthResponse {
//   user: User;
//   token: string;
// }
// // roles (unchanged)
// export enum UserRole {
//   ADMIN = "admin",
//   VENDOR = "vendor",
//   CUSTOMER = "customer",
// }
// /**
//  * Full User (DB / API response)
//  */
// export interface User {
//   id: string;
//   email: string;
//   name: string;
//   role: UserRole;
//   createdAt: Date;
// }
// /**
//  * ✅ Auth User (JWT / req.user)
//  * Keep this minimal and fast
//  */
// export interface AuthUser {
//   id: string;
//   email: string;
//   name: string;
//   role: UserRole;
// }
// /**
//  * Auth response (login/signup)
//  */
// export interface AuthResponse {
//   user: User;
//   token: string;
// }
// roles (unchanged)
export var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["VENDOR"] = "vendor";
    UserRole["CUSTOMER"] = "customer";
})(UserRole || (UserRole = {}));
//# sourceMappingURL=user.js.map