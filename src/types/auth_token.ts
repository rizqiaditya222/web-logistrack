export interface IAuthToken {
  _id?: string;
  user: string;
  token: string;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
