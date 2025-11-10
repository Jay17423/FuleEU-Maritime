import React, { useEffect, useState } from "react";
import api from "../../infrastructure/apiClient";

interface RouteData {
  id: number;
  routeId: string;
  vesselType: string;
  fuelType: string;
  year: number;
  ghgIntensity: number;
  fuelConsumption: number;
  distance: number;
  totalEmissions: number;
}

const RoutesTab: React.FC = () => {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRoutes = async () => {
    try {
      const res = await api.get("/routes");
      setRoutes(res.data);
    } catch (err) {
      console.error("Error fetching routes:", err);
    } finally {
      setLoading(false);
    }
  };

  const setBaseline = async (id: number) => {
    await api.post(`/routes/${id}/baseline`);
    fetchRoutes();
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">All Routes</h2>

      <div className="bg-white shadow rounded p-4 overflow-x-auto">
        <table className="w-full text-sm border rounded">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border">Route ID</th>
              <th className="p-2 border">Vessel Type</th>
              <th className="p-2 border">Fuel Type</th>
              <th className="p-2 border">Year</th>
              <th className="p-2 border">GHG Intensity</th>
              <th className="p-2 border">Fuel (t)</th>
              <th className="p-2 border">Distance (km)</th>
              <th className="p-2 border">Emissions (t)</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((r) => (
              <tr key={r.id} className="text-center border-b">
                <td className="p-2 border">{r.routeId}</td>
                <td className="p-2 border">{r.vesselType}</td>
                <td className="p-2 border">{r.fuelType}</td>
                <td className="p-2 border">{r.year}</td>
                <td className="p-2 border">{r.ghgIntensity.toFixed(2)}</td>
                <td className="p-2 border">{r.fuelConsumption}</td>
                <td className="p-2 border">{r.distance}</td>
                <td className="p-2 border">{r.totalEmissions}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => setBaseline(r.id)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                  >
                    Set Baseline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoutesTab;