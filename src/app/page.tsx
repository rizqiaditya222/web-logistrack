import React from "react";
import CardPenjualan from "@/app/component/Card/CardPenjualan";
import CardStock from "@/app/component/Card/CardStock";
import CardHabis from "@/app/component/Card/CardHabis";
import CardProductStock from "./component/Card/CardProductStock";
import CardDashboard from "./component/Card/CardDashboard";

const Home = () => {
  return (
    <div className="flex flex-col px-10 py-6 h-full">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome to LogisTrack inventory management system</p>
      </div>

      <CardDashboard />

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Inventory Status</h2>
        <CardProductStock />
      </div>
    </div>
  );
};

export default Home;
