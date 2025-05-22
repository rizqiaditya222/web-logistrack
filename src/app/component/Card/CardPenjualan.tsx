"use client";
import React from "react";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
const CardPenjualan = () => {
  const [totalSales, setTotalSales] = useState("0");
  return (
    <div className="bg-green-100 rounded-xl p-4 flex items-center gap-3 w-80 shadow-xl">
      <div className="text-green-800">
        <ShoppingCart size={30} />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-green-900">{totalSales}</h2>
        <p className="text-sm text-green-800">Total Penjualan</p>
      </div>
    </div>
  );
};

export default CardPenjualan;
