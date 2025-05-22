export interface IProduct {
  _id?: string;
  sku: string;
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  location?: string;
  reorderLevel?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
