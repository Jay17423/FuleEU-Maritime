import React, { useState } from "react";
import api from "../../infrastructure/apiClient";

interface CBRecord {
  shipId: string;
  year: number;
  cbGco2eq: number;
}

const BankingTab: React.FC = () => {
  const [shipId, setShipId] = useState("R001");
  const [year, setYear] = useState(2024);
  const [cb, setCb] = useState<CBRecord | null>(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const fetchCB = async () => {
    try {
      const res = await api.get(`/compliance/cb?shipId=${shipId}&year=${year}`);
      setCb(res.data.data);
      setMessage("Fetched current CB successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch CB");
    }
  };

  const bankSurplus = async () => {
    try {
      const res = await api.post("/compliance/banking/bank", {
        shipId,
        year,
        amount: parseFloat(amount),
      });
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage("Failed to bank surplus");
    }
  };

  const applyBanked = async () => {
    try {
      const res = await api.post("/compliance/banking/apply", {
        shipId,
        year,
        amount: parseFloat(amount),
      });
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage("Failed to apply banked balance");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-5">
      <h2 className="text-2xl font-semibold text-gray-800">Compliance Banking</h2>

      <div className="grid grid-cols-3 gap-3 items-end">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Ship ID</label>
          <input
            className="border rounded p-2"
            value={shipId}
            onChange={(e) => setShipId(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Year</label>
          <input
            className="border rounded p-2"
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
        </div>
        <button
          onClick={fetchCB}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded"
        >
          Fetch CB
        </button>
      </div>

      {cb && (
        <div className="p-4 border rounded bg-gray-50">
          <p className="text-gray-700"><strong>Ship ID:</strong> {cb.shipId}</p>
          <p className="text-gray-700"><strong>Year:</strong> {cb.year}</p>
          <p className="text-gray-700"><strong>Compliance Balance:</strong> {cb.cbGco2eq.toFixed(2)} gCO₂e</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 items-end">
        <div className="flex flex-col col-span-1">
          <label className="text-sm text-gray-600 mb-1">Amount</label>
          <input
            className="border rounded p-2"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          onClick={bankSurplus}
          className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded"
        >
          Bank Surplus
        </button>
        <button
          onClick={applyBanked}
          className="bg-yellow-500 hover:bg-yellow-600 transition text-white px-4 py-2 rounded"
        >
          Apply Banked
        </button>
      </div>

      {message && (
        <p className="text-sm text-gray-700 bg-gray-100 border p-3 rounded">
          {message}
        </p>
      )}
    </div>
  );
};

export default BankingTab;
