"use client";
import React, { useState, useEffect } from "react";
import CardProductStock from "../component/Card/CardProductStock";
import CardStock from "../component/Card/CardStock";
import { Boxes, Search, Plus, ArrowUpDown, Filter, RefreshCw } from "lucide-react";
import { IStockMovement } from "@/types/stock_movement";
import LoadingSpinner from "../component/LoadingSpinner";

type ProductItem = {
  id: string;
  name: string;
  stock: number;
  unit: string;
  category: string;
  lastUpdated: string;
};

const sampleProducts: ProductItem[] = [
  { id: "1", name: "Beras", stock: 80, unit: "kg", category: "Sembako", lastUpdated: "2023-10-15" },
  { id: "2", name: "Minyak Goreng", stock: 100, unit: "liter", category: "Sembako", lastUpdated: "2023-10-16" },
  { id: "3", name: "Gula Pasir", stock: 130, unit: "kg", category: "Sembako", lastUpdated: "2023-10-14" },
  { id: "4", name: "Telur Ayam", stock: 110, unit: "kg", category: "Protein", lastUpdated: "2023-10-17" },
  { id: "5", name: "Mie Instan", stock: 105, unit: "pcs", category: "Makanan", lastUpdated: "2023-10-12" },
  { id: "6", name: "Sabun Mandi", stock: 95, unit: "pcs", category: "Kebersihan", lastUpdated: "2023-10-13" },
  { id: "7", name: "Susu Kental", stock: 70, unit: "kaleng", category: "Minuman", lastUpdated: "2023-10-11" },
  { id: "8", name: "Tepung Terigu", stock: 80, unit: "kg", category: "Bahan Masak", lastUpdated: "2023-10-10" },
  { id: "9", name: "Air Mineral", stock: 90, unit: "dus", category: "Minuman", lastUpdated: "2023-10-09" },
];

const sampleMovements: IStockMovement[] = [
  { _id: "1", product: "Beras", type: "in", quantity: 50, date: new Date("2023-10-15"), note: "Restok bulanan" },
  { _id: "2", product: "Minyak Goreng", type: "out", quantity: 20, date: new Date("2023-10-16"), note: "Penjualan" },
  { _id: "3", product: "Telur Ayam", type: "in", quantity: 30, date: new Date("2023-10-17"), note: "Restok" },
  { _id: "4", product: "Gula Pasir", type: "out", quantity: 15, date: new Date("2023-10-14"), note: "Penjualan" },
  { _id: "5", product: "Sabun Mandi", type: "in", quantity: 40, date: new Date("2023-10-13"), note: "Restok" },
];

export const Stock = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("products");
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const filteredProducts = sampleProducts.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase()));

  const filteredMovements = sampleMovements.filter((movement) => movement.product.toLowerCase().includes(searchQuery.toLowerCase()) || movement.note?.toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col px-10 py-6 h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Stock Management</h1>
        <p className="text-gray-600 mt-1">Monitor and manage your inventory levels</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-1">
          <CardStock />
        </div>
        <div className="lg:col-span-3">
          <CardProductStock title="Current Stock Levels" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <div className="flex gap-2 mb-4 lg:mb-0">
            <button onClick={() => setActiveTab("products")} className={`px-4 py-2 font-medium rounded-md transition-colors focus:outline-none ${activeTab === "products" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`}>
              Products
            </button>
            <button
              onClick={() => setActiveTab("movements")}
              className={`px-4 py-2 font-medium rounded-md transition-colors focus:outline-none ${activeTab === "movements" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`}
            >
              Stock Movements
            </button>
            <button onClick={handleRefresh} className="p-2 text-gray-500 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors focus:outline-none" title="Refresh">
              <RefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          </div>

          <div className="flex gap-2 w-full lg:w-auto">
            <div className="relative flex-grow lg:flex-grow-0">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-9 pr-4 py-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <button onClick={handleAddClick} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <Plus size={18} />
              <span>Add</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : activeTab === "products" ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Product Name</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                    <div className="flex items-center gap-1">
                      Stock <ArrowUpDown size={16} className="cursor-pointer" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Unit</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Category</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Last Updated</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                          <Boxes className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-700">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock < 50 ? "bg-red-100 text-red-800" : product.stock < 100 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{product.unit}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">{product.category}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{product.lastUpdated}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100">Edit</button>
                        <button className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100">Move</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Product</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Type</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Quantity</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Note</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovements.map((movement) => (
                  <tr key={movement._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">{movement.product}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${movement.type === "in" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{movement.type === "in" ? "Stock In" : "Stock Out"}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{movement.quantity}</td>
                    <td className="px-4 py-3 text-gray-600">{movement.date.toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-gray-600">{movement.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredProducts.length === 0 && activeTab === "products" && (
          <div className="text-center py-8">
            <p className="text-gray-500">No products found. Try a different search term.</p>
          </div>
        )}

        {filteredMovements.length === 0 && activeTab === "movements" && (
          <div className="text-center py-8">
            <p className="text-gray-500">No stock movements found. Try a different search term.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">
            Showing {activeTab === "products" ? filteredProducts.length : filteredMovements.length} of {activeTab === "products" ? sampleProducts.length : sampleMovements.length} items
          </p>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">Previous</button>
            <button className="px-3 py-1 rounded bg-blue-100 text-blue-600">1</button>
            <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stock;
