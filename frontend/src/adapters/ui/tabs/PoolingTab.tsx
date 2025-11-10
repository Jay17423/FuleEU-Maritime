import React, { useState } from "react";
import api from "../../infrastructure/apiClient";

interface PoolMember {
  shipId: string;
  cbBefore?: number;
  cbAfter?: number;
}

const PoolingTab: React.FC = () => {
  const [year, setYear] = useState(2025);
  const [members, setMembers] = useState<PoolMember[]>([
    { shipId: "R004" },
    { shipId: "R005" },
  ]);
  const [result, setResult] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const addMember = () => {
    setMembers([...members, { shipId: "" }]);
  };

  const updateMember = (index: number, value: string) => {
    const updated = [...members];
    updated[index].shipId = value;
    setMembers(updated);
  };

  const createPool = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await api.post("/pools", { year, members });
      setResult(res.data);
      setMessage("Pool created successfully!");
    } catch (err: any) {
      console.error("Error creating pool:", err);
      const msg =
        err.response?.data?.message ||
        "Failed to create pool (check if total CB >= 0)";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Pooling (Article 21)</h2>

      <div className="bg-white shadow rounded p-4 space-y-4">
        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border p-2 rounded w-24"
            placeholder="Year"
          />
          <button
            onClick={addMember}
            className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-2 rounded"
          >
            + Add Member
          </button>
        </div>

        <div className="space-y-2">
          {members.map((m, i) => (
            <input
              key={i}
              value={m.shipId}
              onChange={(e) => updateMember(i, e.target.value)}
              placeholder={`Ship ID #${i + 1}`}
              className="border p-2 rounded w-40"
            />
          ))}
        </div>

        <button
          onClick={createPool}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Pool"}
        </button>

        {message && (
          <p
            className={`mt-3 p-2 rounded text-sm border ${
              message.includes("success")
                ? "bg-green-100 text-green-700 border-green-300"
                : "bg-red-100 text-red-700 border-red-300"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      {result && (
        <div className="bg-white shadow rounded p-4 space-y-4">
          <h3 className="text-lg font-semibold">Pool Summary (Year {year})</h3>
          <div className="text-sm space-y-1">
            <p><strong>Pool ID:</strong> {result.poolId}</p>
            <p><strong>Total CB:</strong> {result.totalCB?.toFixed?.(2) ?? result.totalCB}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Ship ID</th>
                  <th className="p-2 border">CB Before</th>
                  <th className="p-2 border">CB After</th>
                </tr>
              </thead>
              <tbody>
                {result.members.map((m: any) => (
                  <tr key={m.shipId} className="text-center border-b">
                    <td className="p-2 border">{m.shipId}</td>
                    <td
                      className={`p-2 border ${
                        m.cbBefore >= 0 ? "text-green-700" : "text-red-600"
                      }`}
                    >
                      {m.cbBefore.toFixed(2)}
                    </td>
                    <td
                      className={`p-2 border ${
                        m.cbAfter >= 0 ? "text-green-700" : "text-red-600"
                      }`}
                    >
                      {m.cbAfter.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className={`p-3 text-center rounded font-medium ${
              result.totalCB >= 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            Pool Sum Indicator: {result.totalCB >= 0 ? "✅ Valid Pool" : "❌ Invalid Pool"}
          </div>
        </div>
      )}
    </div>
  );
};

export default PoolingTab;