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
export enum UserRole {
  ADMIN = "admin",
  VENDOR = "vendor",
  CUSTOMER = "customer",
}

/**
 * Full User (DB / API response)
 */
export interface User {
  _id: string; // ✅ changed
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

/**
 * ✅ Auth User (JWT / req.user)
 */
export interface AuthUser {
  _id: string; // ✅ changed
  email: string;
  name: string;
  role: UserRole;
}

/**
 * Auth response (login/signup)
 */
export interface AuthResponse {
  user: User;
  token: string;
}