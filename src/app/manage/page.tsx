"use client";
import React, { useState, useEffect } from "react";
import CardPenjualan from "../component/Card/CardPenjualan";
import { Calendar, ShoppingCart, Search, DollarSign, TrendingUp, Filter, ChevronDown, RefreshCw } from "lucide-react";
import LoadingSpinner from "../component/LoadingSpinner";

type SaleItem = {
  id: string;
  product: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
  customer?: string;
  status: "completed" | "pending" | "canceled";
};

const sampleSales: SaleItem[] = [
  { id: "1", product: "Beras", quantity: 10, price: 15000, total: 150000, date: "2023-10-15", customer: "PT. Sejahtera", status: "completed" },
  { id: "2", product: "Minyak Goreng", quantity: 5, price: 20000, total: 100000, date: "2023-10-16", customer: "Toko Makmur", status: "completed" },
  { id: "3", product: "Gula Pasir", quantity: 8, price: 12500, total: 100000, date: "2023-10-14", customer: "Warung Jaya", status: "pending" },
  { id: "4", product: "Telur Ayam", quantity: 15, price: 2000, total: 30000, date: "2023-10-17", status: "completed" },
  { id: "5", product: "Mie Instan", quantity: 20, price: 3500, total: 70000, date: "2023-10-12", customer: "Distributor Timur", status: "completed" },
  { id: "6", product: "Sabun Mandi", quantity: 12, price: 5000, total: 60000, date: "2023-10-13", status: "canceled" },
  { id: "7", product: "Tepung Terigu", quantity: 7, price: 10000, total: 70000, date: "2023-10-11", customer: "Bakery Enak", status: "pending" },
];

// Calculate total sales amount
const calculateTotalSales = () => {
  return sampleSales
    .filter((sale) => sale.status === "completed")
    .reduce((sum, item) => sum + item.total, 0)
    .toLocaleString("id-ID");
};

const Manage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Filter sales based on search query and filters
  const filteredSales = sampleSales.filter((sale) => {
    // Search filter
    const matchesSearch = sale.product.toLowerCase().includes(searchQuery.toLowerCase()) || sale.customer?.toLowerCase().includes(searchQuery.toLowerCase()) || sale.id.toLowerCase().includes(searchQuery.toLowerCase());

    // Date filter
    const matchesDate = !dateFilter || sale.date.includes(dateFilter);

    // Status filter
    const matchesStatus = !statusFilter || sale.status === statusFilter;

    return matchesSearch && matchesDate && matchesStatus;
  });

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col px-10 py-6 h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Sales Management</h1>
        <p className="text-gray-600 mt-1">Track and analyze your sales performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <CardPenjualan totalSales={calculateTotalSales()} />

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 flex items-center gap-4 shadow-sm border border-purple-200 hover:shadow-md transition-shadow">
          <div className="bg-purple-200 text-purple-700 p-3 rounded-lg">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-purple-600 mb-1">Total Revenue</p>
            <h2 className="text-2xl font-bold text-gray-800">Rp {calculateTotalSales()}</h2>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-5 flex items-center gap-4 shadow-sm border border-amber-200 hover:shadow-md transition-shadow">
          <div className="bg-amber-200 text-amber-700 p-3 rounded-lg">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-amber-600 mb-1">This Month</p>
            <h2 className="text-2xl font-bold text-gray-800">{sampleSales.length} Sales</h2>
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-5 flex items-center gap-4 shadow-sm border border-cyan-200 hover:shadow-md transition-shadow">
          <div className="bg-cyan-200 text-cyan-700 p-3 rounded-lg">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-cyan-600 mb-1">Growth</p>
            <h2 className="text-2xl font-bold text-gray-800">+12.5%</h2>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <div className="flex items-center gap-2 mb-4 lg:mb-0">
            <h2 className="text-xl font-semibold text-gray-800">Sales Transactions</h2>
            <button onClick={handleRefresh} className="p-1.5 text-gray-500 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors focus:outline-none" title="Refresh">
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search transactions..."
                className="pl-9 pr-4 py-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-200">
                  <Calendar className="h-4 w-4" />
                  <span>Date</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <div className="relative">
                <select className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md appearance-none pr-8 focus:outline-none" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="canceled">Canceled</option>
                </select>
                <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 pointer-events-none text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">#ID</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Product</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Quantity</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Price</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Total</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Customer</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((sale) => (
                  <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-600">#{sale.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-green-100 rounded-md flex items-center justify-center mr-3">
                          <ShoppingCart className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="font-medium text-gray-700">{sale.product}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{sale.quantity}</td>
                    <td className="px-4 py-3 text-gray-600">Rp {sale.price.toLocaleString("id-ID")}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">Rp {sale.total.toLocaleString("id-ID")}</td>
                    <td className="px-4 py-3 text-gray-600">{sale.date}</td>
                    <td className="px-4 py-3 text-gray-600">{sale.customer || "-"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${sale.status === "completed" ? "bg-green-100 text-green-800" : sale.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                        {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100">View</button>
                        <button className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100">Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredSales.length === 0 && !isLoading && (
          <div className="text-center py-8">
            <p className="text-gray-500">No sales found. Try a different search term.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">
            Showing {filteredSales.length} of {sampleSales.length} transactions
          </p>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">Previous</button>
            <button className="px-3 py-1 rounded bg-blue-100 text-blue-600">1</button>
            <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">Next</button>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Analytics</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">Sales chart will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default Manage;
