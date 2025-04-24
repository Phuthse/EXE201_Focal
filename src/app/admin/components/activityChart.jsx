import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import rentalApi from "../../api/rentalApi";
import equipmentApi from "../../api/equipmentApi";
import dayjs from "dayjs";

export default function ActivityChart() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      setLoading(true);
      const [rentalRes, equipmentRes] = await Promise.all([
        rentalApi.getAllRental(),
        equipmentApi.getAllEquipments(),
      ]);

      const rentals = rentalRes?.data?.data || [];
      const equipments = equipmentRes?.data?.data || [];

      const equipmentRateMap = {};
      equipments.forEach((eq) => {
        equipmentRateMap[eq.equipmentId] = eq.dailyRate;
      });

      const revenueByWeek = {};

      rentals
        .filter((r) => r.status === "APPROVED")
        .forEach((r) => {
          const start = dayjs(r.startDate);
          const end = dayjs(r.endDate);
          const days = end.diff(start, "day") + 1;
          const dailyRate = equipmentRateMap[r.equipment.equipmentId] || 0;
          const totalRevenue = days * dailyRate;

          const weekStart = start.startOf("week");
          const weekEnd = weekStart.add(6, "day");
          const weekLabel = `${weekStart.format(
            "DD/MM/YYYY"
          )} - ${weekEnd.format("DD/MM/YYYY")}`;

          if (revenueByWeek[weekLabel]) {
            revenueByWeek[weekLabel] += totalRevenue;
          } else {
            revenueByWeek[weekLabel] = totalRevenue;
          }
        });

      const formattedChartData = Object.entries(revenueByWeek)
        .map(([week, value]) => ({
          week,
          value,
        }))
        .sort((a, b) => {
          const aDate = dayjs(a.week.split(" - ")[0], "DD/MM/YYYY");
          const bDate = dayjs(b.week.split(" - ")[0], "DD/MM/YYYY");
          return aDate.isAfter(bDate) ? 1 : -1;
        });

      setChartData(formattedChartData);
    } catch (error) {
      console.error("❌ Lỗi khi fetch dữ liệu activity:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <div className="text-center text-gray-600">Đang tải...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        Doanh Thu Theo Tuần (Số liệu không thực tế do quá trình TEST WEB)
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="week"
            interval={0}
            angle={-15}
            textAnchor="end"
            height={80}
          />
          <YAxis
            width={100}
            tickFormatter={(value) => value.toLocaleString("vi-VN")}
          />
          <Tooltip formatter={(value) => `${value.toLocaleString()} VND`} />
          <Bar dataKey="value" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
