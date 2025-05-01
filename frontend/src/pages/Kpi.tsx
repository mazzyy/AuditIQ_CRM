import React, { useState } from "react";
import Plot from "react-plotly.js";

// Mock data
const storeScores = [
  { store: "Store A", average_score: 85 },
  { store: "Store B", average_score: 78 },
  { store: "Store C", average_score: 92 },
  { store: "Store D", average_score: 74 },
];

const sectionFailRates = [
  { section: "Hygiene", fail_rate: 35 },
  { section: "Safety", fail_rate: 25 },
  { section: "Staff", fail_rate: 20 },
  { section: "Inventory", fail_rate: 20 },
];

const auditFrequency = [
  { date: "2025-04-21", count: 6 },
  { date: "2025-04-22", count: 4 },
  { date: "2025-04-23", count: 6 },
  { date: "2025-04-24", count: 6 },
  { date: "2025-04-25", count: 6 },
  { date: "2025-04-26", count: 5 },
  { date: "2025-04-27", count: 9 },
  { date: "2025-04-28", count: 7 },
  { date: "2025-04-29", count: 9 },
  { date: "2025-04-30", count: 3 },
];

const failingPoints = [
  { point: "Expired products", failures: 15 },
  { point: "Unclean surfaces", failures: 12 },
  { point: "Missing gloves", failures: 10 },
  { point: "Blocked exits", failures: 8 },
];

const companies = [
  { value: "ztech", label: "ZTech" },
  { value: "acme", label: "ACME" },
  { value: "buildco", label: "BuildCo" },
];

const users = [
  { value: "john", label: "John Doe" },
  { value: "jane", label: "Jane Smith" },
  { value: "sam", label: "Sam Wilson" },
];

export default function KPIsDashboard() {
  const [selectedCompany, setSelectedCompany] = useState("ztech");
  const [selectedUser, setSelectedUser] = useState("all");
  const [startDate, setStartDate] = useState("2025-04-21");
  const [endDate, setEndDate] = useState("2025-04-30");

  const filteredAuditFrequency = auditFrequency.filter((item) => {
    return item.date >= startDate && item.date <= endDate;
  });

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow p-6">
        <div className="mx-auto container">
          <div className="mb-2 text-gray-500 text-sm">
            <span className="text-indigo-600 hover:underline cursor-pointer">
              Dashboard
            </span>
            <span className="mx-2">/</span>
            <span>KPIs</span>
          </div>
          <h1 className="font-bold text-gray-800 text-3xl">KPIs</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="mx-auto container">
          {/* Filters */}
          <div className="bg-white shadow mb-8 p-6 rounded-lg">
            <h2 className="mb-4 font-semibold text-gray-700 text-xl">
              Filters
            </h2>
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              {/* Company Selector */}
              <div className="flex flex-col">
                <label
                  htmlFor="company-select"
                  className="mb-1 font-medium text-gray-600 text-sm"
                >
                  Company
                </label>
                <select
                  id="company-select"
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="p-2 border border-gray-300 focus:border-indigo-500 rounded-md focus:ring-indigo-500 w-full text-sm"
                >
                  {companies.map((company) => (
                    <option key={company.value} value={company.value}>
                      {company.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* User Selector */}
              <div className="flex flex-col">
                <label
                  htmlFor="user-select"
                  className="mb-1 font-medium text-gray-600 text-sm"
                >
                  User
                </label>
                <select
                  id="user-select"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="p-2 border border-gray-300 focus:border-indigo-500 rounded-md focus:ring-indigo-500 w-full text-sm"
                >
                  <option value="all">All Users</option>
                  {users.map((user) => (
                    <option key={user.value} value={user.value}>
                      {user.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Date */}
              <div className="flex flex-col">
                <label
                  htmlFor="start-date"
                  className="mb-1 font-medium text-gray-600 text-sm"
                >
                  Start Date
                </label>
                <input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="p-2 border border-gray-300 focus:border-indigo-500 rounded-md focus:ring-indigo-500 w-full text-sm"
                />
              </div>

              {/* End Date */}
              <div className="flex flex-col">
                <label
                  htmlFor="end-date"
                  className="mb-1 font-medium text-gray-600 text-sm"
                >
                  End Date
                </label>
                <input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="p-2 border border-gray-300 focus:border-indigo-500 rounded-md focus:ring-indigo-500 w-full text-sm"
                />
              </div>
            </div>
          </div>

          {/* Graphs: 2 Columns, 2 Graphs per Column */}
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
            {/* Left Column */}
            <div className="flex flex-col gap-8">
              {/* Average Score per Store */}
              <div className="bg-white shadow p-4 rounded-lg">
                <h2 className="mb-3 font-semibold text-lg">
                  Average Score per Store
                </h2>
                <Plot
                  data={[
                    {
                      x: storeScores.map((item) => item.store),
                      y: storeScores.map((item) => item.average_score),
                      type: "bar",
                      marker: { color: "#3f51b5" },
                    },
                  ]}
                  layout={{
                    title: "",
                    autosize: true,
                    margin: { t: 20, b: 60 },
                  }}
                  style={{ width: "100%", height: "300px" }}
                  useResizeHandler
                />
              </div>

              {/* Fail Rate per Section */}
              <div className="bg-white shadow p-4 rounded-lg">
                <h2 className="mb-3 font-semibold text-lg">
                  Fail Rate per Section (%)
                </h2>
                <Plot
                  data={[
                    {
                      labels: sectionFailRates.map((item) => item.section),
                      values: sectionFailRates.map((item) => item.fail_rate),
                      type: "pie",
                      marker: {
                        colors: ["#f44336", "#ffb300", "#4caf50", "#2196f3"],
                      },
                    },
                  ]}
                  layout={{
                    title: "",
                    autosize: true,
                    margin: { t: 20 },
                  }}
                  style={{ width: "100%", height: "300px" }}
                  useResizeHandler
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-8">
              {/* Audit Frequency Over Time */}
              <div className="bg-white shadow p-4 rounded-lg">
                <h2 className="mb-3 font-semibold text-lg">
                  Audit Frequency Over Time
                </h2>
                <Plot
                  data={[
                    {
                      x: filteredAuditFrequency.map((item) => item.date),
                      y: filteredAuditFrequency.map((item) => item.count),
                      type: "scatter",
                      mode: "lines+markers",
                      marker: { color: "#4caf50" },
                      line: { color: "#4caf50" },
                    },
                  ]}
                  layout={{
                    title: "",
                    autosize: true,
                    margin: { t: 20, b: 60 },
                    xaxis: { title: "Date" },
                    yaxis: { title: "Count" },
                  }}
                  style={{ width: "100%", height: "300px" }}
                  useResizeHandler
                />
              </div>

              {/* Top Failing Points */}
              <div className="bg-white shadow p-4 rounded-lg">
                <h2 className="mb-3 font-semibold text-lg">
                  Top Failing Points
                </h2>
                <Plot
                  data={[
                    {
                      x: failingPoints.map((item) => item.failures),
                      y: failingPoints.map((item) => item.point),
                      type: "bar",
                      orientation: "h",
                      marker: { color: "#ffb300" },
                    },
                  ]}
                  layout={{
                    title: "",
                    autosize: true,
                    margin: { t: 20, l: 150 },
                  }}
                  style={{ width: "100%", height: "300px" }}
                  useResizeHandler
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
