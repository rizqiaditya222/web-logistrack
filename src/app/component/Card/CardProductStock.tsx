"use client";
import React from "react";
import { useState } from "react";

type ProductData = {
  name: string;
  stock: number;
  maxStock?: number;
};

type ProductStockCardProps = {
  title?: string;
  products?: ProductData[];
};
const CardProductStock = ({
  title = "Product Stock",
  products = [
  { name: "Beras", stock: 80 },
  { name: "Minyak Goreng", stock: 100 },
  { name: "Gula Pasir", stock: 130 },
  { name: "Telur Ayam", stock: 110 },
  { name: "Mie Instan", stock: 105 },
  { name: "Sabun Mandi", stock: 95 },
  { name: "Susu Kental", stock: 70 },
  { name: "Tepung Terigu", stock: 80 },
  { name: "Air Mineral", stock: 90 }
],
}: ProductStockCardProps) => {
  const [maxValue, setMaxValue] = useState(200);

  // Calculate the maximum width for the progress bars
  const calculateWidth = (value: number) => {
    return (value / maxValue) * 100;
  };
  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="space-y-3">
        {products.map((product, index) => (
          <div key={index} className="flex items-center">
            <div className="w-16 text-right mr-4 text-sm text-gray-600">
              {product.name}
            </div>
            <div className="flex-1 relative h-6 bg-gray-200 rounded-sm">
              <div
                className="absolute top-0 left-0 h-6 bg-blue-400 rounded-sm"
                style={{ width: `${calculateWidth(product.stock)}%` }}
              ></div>
            </div>
            <div className="ml-2 text-sm text-gray-600 w-8">
              {product.stock}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex">
        {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200].map(
          (value, index) => (
            <div
              key={index}
              className="flex-1 text-xs text-gray-500 text-center"
            >
              {value}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CardProductStock;
