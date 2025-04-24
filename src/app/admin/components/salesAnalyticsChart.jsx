import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import rentalApi from "../../api/rentalApi";

export default function RentalStatusAnalytics() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      setLoading(true);
      const rentalRes = await rentalApi.getAllRental();
      const rentals = rentalRes?.data?.data || [];

      // Đếm số lượng mỗi status
      const statusMap = rentals.reduce((acc, rental) => {
        acc[rental.status] = (acc[rental.status] || 0) + 1;
        return acc;
      }, {});

      // Convert sang array cho biểu đồ
      const chartArray = Object.entries(statusMap).map(([status, count]) => ({
        status,
        count,
      }));

      setChartData(chartArray);
    } catch (err) {
      console.error("❌ Lỗi khi fetch rental status:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center text-gray-600">Đang tải dữ liệu...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Thống Kê Đơn Thuê (Số liệu không thực tế do quá trình TEST WEB)</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#60a5fa" name="Số lượng đơn" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
