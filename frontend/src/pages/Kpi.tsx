import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

// Define types for report data
interface StoreScore {
  store: string;
  average_score: number;
}

interface SectionFailRate {
  section: string;
  fail_rate: number;
}

interface AuditFrequency {
  date: string;
  count: number;
}

interface FailingPoint {
  point: string;
  failures: number;
}

// Mock data
const storeScores = [
  {"store": "Store A", "average_score": 85},
  {"store": "Store B", "average_score": 78},
  {"store": "Store C", "average_score": 92},
  {"store": "Store D", "average_score": 74}
];

const sectionFailRates = [
  {"section": "Hygiene", "fail_rate": 35},
  {"section": "Safety", "fail_rate": 25},
  {"section": "Staff", "fail_rate": 20},
  {"section": "Inventory", "fail_rate": 20}
];

const auditFrequency = [
  {"date": "2025-04-21", "count": 6},
  {"date": "2025-04-22", "count": 4},
  {"date": "2025-04-23", "count": 6},
  {"date": "2025-04-24", "count": 6},
  {"date": "2025-04-25", "count": 6},
  {"date": "2025-04-26", "count": 5},
  {"date": "2025-04-27", "count": 9},
  {"date": "2025-04-28", "count": 7},
  {"date": "2025-04-29", "count": 9},
  {"date": "2025-04-30", "count": 3}
];

const failingPoints = [
  {"point": "Expired products", "failures": 15},
  {"point": "Unclean surfaces", "failures": 12},
  {"point": "Missing gloves", "failures": 10},
  {"point": "Blocked exits", "failures": 8}
];

// Available companies and users
const companies = [
  { value: 'ztech', label: 'ZTech' },
  { value: 'acme', label: 'ACME' },
  { value: 'buildco', label: 'BuildCo' }
];

const users = [
  { value: 'john', label: 'John Doe' },
  { value: 'jane', label: 'Jane Smith' },
  { value: 'sam', label: 'Sam Wilson' }
];

// Define props for chart components
interface ChartProps {
  id: string;
  data: any[];
  xKey: string;
  yKey: string;
  title: string;
  color?: string;
}

interface PieChartProps {
  id: string;
  data: any[];
  labelKey: string;
  valueKey: string;
  title: string;
  colors?: string[];
}

// D3 Chart Components
const BarChart: React.FC<ChartProps> = ({ id, data, xKey, yKey, title, color = "#3f51b5" }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Get actual dimensions of the container
    const containerWidth = chartRef.current.clientWidth;
    const containerHeight = chartRef.current.clientHeight;
    
    // Clear previous chart
    d3.select(chartRef.current).selectAll("*").remove();
    
    // Setup dimensions with responsive margins
    const margin = { 
      top: 30, 
      right: Math.max(20, containerWidth * 0.05), 
      bottom: Math.max(40, containerHeight * 0.15), 
      left: Math.max(40, containerWidth * 0.08) 
    };
    
    const width = containerWidth;
    const height = containerHeight;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Add title
    svg.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text(title);
    
    // X scale
    const x = d3.scaleBand()
      .domain(data.map(d => d[xKey]))
      .range([0, innerWidth])
      .padding(0.3);
    
    // Y scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[yKey]) * 1.1 || 0])
      .range([innerHeight, 0]);
    
    // Add X axis
    svg.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .style("font-size", "10px")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");
    
    // Add Y axis
    svg.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .selectAll("text")
      .style("font-size", "10px");
    
    // Add bars
    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d[xKey]) || 0)
      .attr("y", d => y(d[yKey]))
      .attr("width", x.bandwidth())
      .attr("height", d => innerHeight - y(d[yKey]))
      .attr("fill", color);
  }, [data, xKey, yKey, title, color]);
  
  return <div id={id} ref={chartRef} className="chart-container"></div>;
};

const PieChart: React.FC<PieChartProps> = ({ id, data, labelKey, valueKey, title, colors = ["#f44336", "#ffb300", "#4caf50", "#2196f3"] }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Get actual dimensions of the container
    const containerWidth = chartRef.current.clientWidth;
    const containerHeight = chartRef.current.clientHeight;
    
    // Clear previous chart
    d3.select(chartRef.current).selectAll("*").remove();
    
    // Setup dimensions
    const width = containerWidth;
    const height = containerHeight;
    const margin = { 
      top: 30, 
      right: Math.max(20, width * 0.1), 
      bottom: Math.max(20, height * 0.1), 
      left: Math.max(20, width * 0.1) 
    };
    
    // Calculate radius based on available space
    const radius = Math.min(
      width - margin.left - margin.right, 
      height - margin.top - margin.bottom
    ) / 2;
    
    // Create SVG
    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", `translate(${width/2},${height/2})`);
    
    // Add title
    svg.append("text")
      .attr("x", 0)
      .attr("y", -height/2 + 15)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text(title);
    
    // Color scale
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d[labelKey]))
      .range(colors);
    
    // Compute the position of each group on the pie
    const pie = d3.pie<any>()
      .value(d => d[valueKey]);
    
    const arc = d3.arc<any>()
      .innerRadius(0)
      .outerRadius(radius * 0.8);
    
    // Build the pie chart
    svg.selectAll('pieces')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data[labelKey]) as string)
      .attr("stroke", "white")
      .style("stroke-width", "2px");
    
    // Add labels for larger screens
    if (width > 300) {
      const labelArc = d3.arc<any>()
        .innerRadius(radius * 0.5)
        .outerRadius(radius * 0.5);
      
      svg.selectAll('labels')
        .data(pie(data))
        .enter()
        .append('text')
        .text(d => `${d.data[labelKey]} (${d.data[valueKey]}%)`)
        .attr("transform", d => {
          const centroid = labelArc.centroid(d);
          return `translate(${centroid[0]},${centroid[1]})`;
        })
        .style("text-anchor", "middle")
        .style("font-size", "10px")
        .style("font-weight", "bold")
        .style("fill", "white");
    }
  }, [data, labelKey, valueKey, title, colors]);
  
  return <div id={id} ref={chartRef} className="chart-container"></div>;
};

const LineChart: React.FC<ChartProps> = ({ id, data, xKey, yKey, title, color = "#4caf50" }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Get actual dimensions of the container
    const containerWidth = chartRef.current.clientWidth;
    const containerHeight = chartRef.current.clientHeight;
    
    // Clear previous chart
    d3.select(chartRef.current).selectAll("*").remove();
    
    // Setup dimensions
    const width = containerWidth;
    const height = containerHeight;
    const margin = { 
      top: 30, 
      right: Math.max(20, width * 0.05), 
      bottom: Math.max(40, height * 0.15), 
      left: Math.max(40, width * 0.08) 
    };
    
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Add title
    svg.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text(title);
    
    // Parse dates
    const parsedData = data.map(d => ({
      ...d,
      parsedDate: new Date(d[xKey])
    }));
    
    // X scale
    const x = d3.scaleTime()
      .domain(d3.extent(parsedData, d => d.parsedDate) as [Date, Date])
      .range([0, innerWidth]);
    
    // Y scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(parsedData, d => d[yKey]) * 1.1 || 0])
      .range([innerHeight, 0]);
    
    // Format X axis to show day of week
    const formatDay = d3.timeFormat("%a %d");
    
    // Add X axis
    svg.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).tickFormat(formatDay as any).ticks(5))
      .selectAll("text")
      .style("text-anchor", "end")
      .style("font-size", "10px")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");
    
    // Add Y axis
    svg.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .selectAll("text")
      .style("font-size", "10px");
    
    // Add the line
    svg.append("path")
      .datum(parsedData)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 2)
      .attr("d", d3.line<any>()
        .x(d => x(d.parsedDate))
        .y(d => y(d[yKey]))
      );
    
    // Add the points
    svg.selectAll("dot")
      .data(parsedData)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.parsedDate))
      .attr("cy", d => y(d[yKey]))
      .attr("r", 5)
      .attr("fill", color);
  }, [data, xKey, yKey, title, color]);
  
  return <div id={id} ref={chartRef} className="chart-container"></div>;
};

const HorizontalBarChart: React.FC<ChartProps> = ({ id, data, xKey, yKey, title, color = "#ffb300" }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Get actual dimensions of the container
    const containerWidth = chartRef.current.clientWidth;
    const containerHeight = chartRef.current.clientHeight;
    
    // Clear previous chart
    d3.select(chartRef.current).selectAll("*").remove();
    
    // Setup dimensions
    const width = containerWidth;
    const height = containerHeight;
    const margin = { 
      top: 30, 
      right: Math.max(20, width * 0.05), 
      bottom: Math.max(20, height * 0.1), 
      left: Math.max(120, width * 0.25) 
    };
    
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Add title
    svg.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text(title);
    
    // X scale
    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[xKey]) * 1.1 || 0])
      .range([0, innerWidth]);
    
    // Y scale
    const y = d3.scaleBand()
      .domain(data.map(d => d[yKey]))
      .range([0, innerHeight])
      .padding(0.3);
    
    // Add X axis
    svg.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(5))
      .selectAll("text")
      .style("font-size", "10px");
    
    // Add Y axis
    svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "10px");
    
    // Add bars
    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("y", d => y(d[yKey]) as number)
      .attr("x", 0)
      .attr("height", y.bandwidth())
      .attr("width", d => x(d[xKey]))
      .attr("fill", color);
  }, [data, xKey, yKey, title, color]);
  
  return <div id={id} ref={chartRef} className="chart-container"></div>;
};

// Main Dashboard Component
export default function ResponsiveAuditDashboard() {
  // Filter states
  const [selectedCompany, setSelectedCompany] = useState('ztech');
  const [selectedUser, setSelectedUser] = useState('all');
  const [startDate, setStartDate] = useState('2025-04-21');
  const [endDate, setEndDate] = useState('2025-04-30');
  
  // Filtered data based on date range
  const filteredAuditFrequency = auditFrequency.filter(item => {
    const itemDate = item.date;
    return itemDate >= startDate && itemDate <= endDate;
  });
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white p-4 shadow">
        <div className="container mx-auto">
          <div className="text-sm text-gray-500 mb-2">
            <span className="text-indigo-600 hover:underline cursor-pointer">Dashboard</span>
            <span className="mx-2">/</span>
            <span>Reports</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Audit Reports</h1>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="container mx-auto">
          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Company Selector */}
              <div className="flex flex-col">
                <label htmlFor="company-select" className="text-sm font-medium text-gray-600 mb-1">
                  Company
                </label>
                <select
                  id="company-select"
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md text-sm w-full"
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
                <label htmlFor="user-select" className="text-sm font-medium text-gray-600 mb-1">
                  User
                </label>
                <select
                  id="user-select"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md text-sm w-full"
                >
                  <option value="all">All Users</option>
                  {users.map((user) => (
                    <option key={user.value} value={user.value}>
                      {user.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Date Range */}
              <div className="flex flex-col">
                <label htmlFor="start-date" className="text-sm font-medium text-gray-600 mb-1">
                  Start Date
                </label>
                <input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md text-sm w-full"
                />
              </div>
              
              <div className="flex flex-col">
                <label htmlFor="end-date" className="text-sm font-medium text-gray-600 mb-1">
                  End Date
                </label>
                <input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md text-sm w-full"
                />
              </div>
            </div>
          </div>
          
          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Average Score per Store */}
            <div className="bg-white p-4 rounded-lg shadow">
              <BarChart 
                id="store-scores-chart"
                data={storeScores} 
                xKey="store"
                yKey="average_score"
                title="Average Score per Store"
                color="#3f51b5"
              />
            </div>

            {/* Fail Rate per Section */}
            <div className="bg-white p-4 rounded-lg shadow">
              <PieChart 
                id="section-fail-rates-chart"
                data={sectionFailRates} 
                labelKey="section"
                valueKey="fail_rate"
                title="Fail Rate per Section (%)"
                colors={["#f44336", "#ffb300", "#4caf50", "#2196f3"]}
              />
            </div>

            {/* Audit Frequency Over Time */}
            <div className="bg-white p-4 rounded-lg shadow">
              <LineChart 
                id="audit-frequency-chart"
                data={filteredAuditFrequency} 
                xKey="date"
                yKey="count"
                title="Audit Frequency Over Time"
                color="#4caf50"
              />
            </div>

            {/* Top Failing Points */}
            <div className="bg-white p-4 rounded-lg shadow">
              <HorizontalBarChart 
                id="failing-points-chart"
                data={failingPoints} 
                xKey="failures"
                yKey="point"
                title="Top Failing Points"
                color="#ffb300"
              />
            </div>
          </div>
        </div>
      </main>
      
      {/* Global styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .chart-container {
            width: 100%;
            height: 300px;
            position: relative;
          }
        `
      }} />
    </div>
  );
}