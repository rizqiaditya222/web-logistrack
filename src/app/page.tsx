

import React from "react";
import CardPenjualan from "@/app/component/Card/CardPenjualan";
import CardStock from "@/app/component/Card/CardStock";
import CardHabis from "@/app/component/Card/CardHabis";
import CardProductStock from "./component/Card/CardProductStock";
import CardDashboard from "./component/Card/CardDashboard";

const Home = () => {
  return(
      <div className="flex flex-col mx-[5rem] bg-white h-screen">
        <CardDashboard/>
        <div className="mt-10">
        <CardProductStock />

        </div>
      </div>
    
  )
}

export default Home;
