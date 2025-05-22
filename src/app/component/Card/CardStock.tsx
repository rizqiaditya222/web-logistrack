"use client";
import React from "react";

import { useState } from "react";
import { Boxes } from "lucide-react";
const CardStock = () => {
  const [totalSales, setTotalSales] = useState("0");
  return (
    <div className="bg-blue-100 rounded-xl p-4 flex items-center gap-3 w-80 shadow-xl">
      <div className="text-blue-800">
        <Boxes size={30} />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-blue-900">{totalSales}</h2>
        <p className="text-sm text-blue-800">Total Stock</p>
      </div>
    </div>
  );
};

export default CardStock;
