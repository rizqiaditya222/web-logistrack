import CardPenjualan from "./CardPenjualan";
import CardStock from "./CardStock";
import CardHabis from "./CardHabis";

const CardDashboard = () => {
  return (
     <div className="flex flex-col rounded-xl items-center justify-center h-[17.5rem] w-full  mt-[5rem] p-[2rem] bg-white shadow-2xl">
      <div>
        <h1 className="text-5xl">Dashboard</h1>
      </div>
      <div className="column items-center justify-center">
        <div className="flex gap-4 mt-10 mx-[1rem] w-full">
          <CardPenjualan />
          <CardStock />
          <CardHabis />
        </div>
      </div>
    </div>
  );
}

export default CardDashboard;