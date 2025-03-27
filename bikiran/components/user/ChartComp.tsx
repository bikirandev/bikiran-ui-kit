"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type ChartData = {
  name: string;
  income: number;
  expense: number;
  collection: number;
  amt: number;
};

const data: ChartData[] = [
  { name: "Jan", income: 4000, expense: 2400, collection: 8400, amt: 2400 },
  { name: "Feb", income: 3000, expense: 1398, collection: 2400, amt: 2210 },
  { name: "March", income: 2000, expense: 9800, collection: 5400, amt: 2290 },
  { name: "April", income: 2780, expense: 3908, collection: 2400, amt: 2000 },
  { name: "May", income: 1890, expense: 4800, collection: 8400, amt: 2181 },
  { name: "June", income: 2390, expense: 3800, collection: 1400, amt: 2500 },
  { name: "July", income: 3490, expense: 4300, collection: 2400, amt: 2100 },
  { name: "Aug", income: 1490, expense: 9300, collection: 2400, amt: 2100 },
  { name: "Sept", income: 8490, expense: 4300, collection: 2400, amt: 2100 },
];

const ChartComp: React.FC = () => {
  return (
    <ResponsiveContainer
      width="100%"
      height={350}
      className="bg-primary rounded-20 pt-12"
    >
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="expense"
          stroke="#F50303"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="income" stroke="#00B15B" />
        <Line type="monotone" dataKey="collection" stroke="#ae00b9" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartComp;
