import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";

import { motion } from "framer-motion";

import {
  FaHeartbeat,
  FaTint,
  FaUsers,
  FaChartLine,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Analytics() {

  const [donors, setDonors] = useState([]);

  // FETCH DONORS
  const fetchDonors = async () => {
    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/donors/"
      );

      const data = await response.json();

      setDonors(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  // TOTAL DONORS
  const totalDonors = donors.length;

  // TOTAL CITIES
  const totalCities = [
    ...new Set(donors.map((d) => d.city))
  ].length;

  // BLOOD GROUP COUNTS
  const bloodGroupMap = {};

  donors.forEach((donor) => {

    const group = donor.blood_group || "Unknown";

    if (bloodGroupMap[group]) {
      bloodGroupMap[group] += 1;
    } else {
      bloodGroupMap[group] = 1;
    }

  });

  // PIE CHART DATA
  const bloodData = Object.keys(bloodGroupMap).map(
    (group) => ({
      name: group,
      value: bloodGroupMap[group],
    })
  );

  // AI PRIORITY DONORS
  const priorityDonors = donors.filter(
    (donor) => donor.blood_group === "O-"
  ).length;

  // MONTHLY MOCK GROWTH
  // (later connect with timestamps)
  const monthlyData = [
    { month: "Jan", donors: 5 },
    { month: "Feb", donors: 12 },
    { month: "Mar", donors: 20 },
    { month: "Apr", donors: 35 },
    { month: "May", donors: 48 },
    { month: "Jun", donors: totalDonors },
  ];

  // DEMO AI PREDICTION
  const emergencyData = [
    { day: "Mon", requests: 4 },
    { day: "Tue", requests: 8 },
    { day: "Wed", requests: 6 },
    { day: "Thu", requests: 10 },
    { day: "Fri", requests: 7 },
    { day: "Sat", requests: 12 },
    { day: "Sun", requests: 9 },
  ];

  const COLORS = [
    "#ef4444",
    "#dc2626",
    "#f87171",
    "#991b1b",
    "#7f1d1d",
    "#b91c1c",
    "#fb7185",
    "#fecaca",
  ];
// CITY HEATMAP DATA
const cityMap = {};

donors.forEach((donor) => {

  const city = donor.city || "Unknown";

  if (cityMap[city]) {
    cityMap[city] += 1;
  } else {
    cityMap[city] = 1;
  }

});

const heatmapData = Object.keys(cityMap).map(
  (city) => ({
    city,
    donors: cityMap[city],
  })
);
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 ml-64 p-8">

        {/* NAVBAR */}
        <Navbar />

        {/* TITLE */}
        <div className="mb-10">

          <h1 className="text-5xl font-black bg-gradient-to-r from-red-400 to-red-700 bg-clip-text text-transparent">
            Real-Time Analytics
          </h1>

          <p className="text-slate-400 mt-3 text-lg">
            Live blood donor insights powered by Blood Bond AI.
          </p>

        </div>

        {/* TOP STATS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          {/* TOTAL DONORS */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-red-600 to-red-800 p-7 rounded-3xl shadow-2xl"
          >

            <div className="flex justify-between items-center mb-4">

              <FaUsers className="text-4xl" />

              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                Live
              </span>

            </div>

            <h3 className="text-white/80">
              Total Donors
            </h3>

            <p className="text-5xl font-black mt-2">
              {totalDonors}
            </p>

          </motion.div>

          {/* CITIES */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/5 border border-white/10 p-7 rounded-3xl shadow-2xl"
          >

            <div className="flex justify-between items-center mb-4">

              <FaMapMarkerAlt className="text-4xl text-red-400" />

              <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                Cities
              </span>

            </div>

            <h3 className="text-slate-400">
              Active Cities
            </h3>

            <p className="text-5xl font-black mt-2 text-red-400">
              {totalCities}
            </p>

          </motion.div>

          {/* BLOOD GROUPS */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/5 border border-white/10 p-7 rounded-3xl shadow-2xl"
          >

            <div className="flex justify-between items-center mb-4">

              <FaTint className="text-4xl text-red-400" />

              <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                Blood
              </span>

            </div>

            <h3 className="text-slate-400">
              Blood Groups
            </h3>

            <p className="text-5xl font-black mt-2 text-red-400">
              {bloodData.length}
            </p>

          </motion.div>

          {/* PRIORITY */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/5 border border-white/10 p-7 rounded-3xl shadow-2xl"
          >

            <div className="flex justify-between items-center mb-4">

              <FaHeartbeat className="text-4xl text-green-400" />

              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                AI
              </span>

            </div>

            <h3 className="text-slate-400">
              O- Priority Donors
            </h3>

            <p className="text-5xl font-black mt-2 text-green-400">
              {priorityDonors}
            </p>

          </motion.div>

        </div>

        {/* CHARTS */}
        <div className="grid xl:grid-cols-2 gap-8 mb-10">

          {/* PIE CHART */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
          >

            <h2 className="text-2xl font-black mb-6 text-red-400">
              Blood Group Distribution
            </h2>

            <div className="h-[350px]">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={bloodData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    label
                  >

                    {bloodData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </motion.div>

          {/* BAR CHART */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
          >

            <h2 className="text-2xl font-black mb-6 text-red-400">
              Donor Growth
            </h2>

            <div className="h-[350px]">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={monthlyData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#333"
                  />

                  <XAxis
                    dataKey="month"
                    stroke="#999"
                  />

                  <YAxis stroke="#999" />

                  <Tooltip />

                  <Bar
                    dataKey="donors"
                    fill="#ef4444"
                    radius={[10, 10, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </motion.div>

        </div>

        {/* AI PREDICTION */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl mb-10"
        >

          <h2 className="text-2xl font-black mb-6 text-red-400">
            Emergency Prediction Model
          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={emergencyData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#333"
                />

                <XAxis
                  dataKey="day"
                  stroke="#999"
                />

                <YAxis stroke="#999" />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="requests"
                  stroke="#ef4444"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </motion.div>

        {/* HEATMAP */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl mb-10"
        >

          <h2 className="text-3xl font-black text-red-400 mb-6">
            📍 Donor Density Heatmap
          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart
                layout="vertical"
                data={heatmapData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#333"
                />

                <XAxis
                  type="number"
                  stroke="#999"
                />

                <YAxis
                  type="category"
                  dataKey="city"
                  stroke="#999"
                />

                <Tooltip />

                <Bar
                  dataKey="donors"
                  fill="#ef4444"
                  radius={[0,10,10,0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </motion.div>

        {/* AI INSIGHTS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-red-700 to-red-900 p-7 rounded-3xl shadow-2xl"
          >

            <h2 className="text-2xl font-black mb-4">
              AI Insight
            </h2>

            <p className="text-red-100 leading-8">
              Highest registered blood group:
              {" "}
              <span className="font-bold">
                {
                  bloodData.sort(
                    (a, b) => b.value - a.value
                  )[0]?.name
                }
              </span>
            </p>

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/5 border border-white/10 p-7 rounded-3xl shadow-2xl"
          >

            <h2 className="text-2xl font-black mb-4 text-green-400">
              Smart Matching
            </h2>

            <p className="text-slate-300 leading-8">
              Blood Bond AI processed
              {" "}
              <span className="font-bold text-green-400">
                {totalDonors}
              </span>
              {" "}
              live donor records.
            </p>

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/5 border border-white/10 p-7 rounded-3xl shadow-2xl"
          >

            <h2 className="text-2xl font-black mb-4 text-blue-400">
              Prediction Engine
            </h2>

            <p className="text-slate-300 leading-8">
              AI predicts increased emergency demand
              during weekends and late nights.
            </p>

          </motion.div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;