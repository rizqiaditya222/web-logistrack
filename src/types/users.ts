export type UserRole = "admin" | "staff" | "manager";
export type UserStatus = "active" | "suspended" | "pending";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
