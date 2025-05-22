"use client";
import React from "react";

import { useState } from "react";
import { XCircle } from "lucide-react";
const CardHabis = () => {
  const [totalSales, setTotalSales] = useState("0");
  return (
    <div className="bg-red-100 rounded-xl p-4 flex items-center gap-3 w-80 shadow-xl">
      <div className="text-red-800">
        <XCircle size={30} />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-red-900">{totalSales}</h2>
        <p className="text-sm text-red-800">Stock Habis</p>
      </div>
    </div>
  );
};

export default CardHabis;
