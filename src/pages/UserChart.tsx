import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { User } from "../models/user.model";
import { Column } from "../components/Table";
import Button from "../components/Button";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  DoughnutController,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  DoughnutController
);

interface ProcessedData {
  label: string;
  count: number;
}

interface UserChartProps {
  userData: User[];
  columns: Column<User>[];
}

const processEmailDomains = (userData: User[]): ProcessedData[] => {
  const domainCounts: Record<string, number> = {};
  userData.forEach((item) => {
    const email = item.email || "Unknown";
    const domain = email.includes("@") ? email.split("@")[1] : "Unknown";
    domainCounts[domain] = (domainCounts[domain] || 0) + 1;
  });
  return Object.entries(domainCounts).map(([domain, count]) => ({
    label: domain,
    count,
  }));
};

const processAgeData = (userData: User[]): ProcessedData[] => {
  const ageRanges: Record<string, number> = {
    "20-29": 0,
    "30-39": 0,
    "40-49": 0,
    "50+": 0,
  };
  userData.forEach((item) => {
    const age = parseInt(item["age"], 10);
    if (age >= 20 && age <= 29) ageRanges["20-29"]++;
    else if (age >= 30 && age <= 39) ageRanges["30-39"]++;
    else if (age >= 40 && age <= 49) ageRanges["40-49"]++;
    else if (age >= 50) ageRanges["50+"]++;
  });

  return Object.entries(ageRanges)
    .filter(([_, count]) => count !== 0)
    .map(([range, count]) => ({
      label: range,
      count,
    }));
};

const processData = (userData: User[], column: string): ProcessedData[] => {
  if (column === "age") {
    return processAgeData(userData);
  }
  if (column === "email") {
    return processEmailDomains(userData);
  }
  const groupData: Record<string, number> = {};
  userData.forEach((item) => {
    const value = item[column] || "Unknown";
    if (groupData[value]) {
      groupData[value]++;
    } else {
      groupData[value] = 1;
    }
  });
  return Object.entries(groupData).map(([key, count]) => ({
    label: key,
    count,
  }));
};

const UserChart = ({ userData, columns }: UserChartProps) => {
  const [activeColumn, setActiveColumn] = useState<string>("email");
  const chartData = processData(userData, activeColumn);
  const data = {
    labels: chartData.map((item) => item.label),
    datasets: [
      {
        data: chartData.map((item) => item.count),
        backgroundColor: chartData.map(
          (_, index) => `hsl(${(index * 360) / chartData.length}, 50%, 70%)`
        ),
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },

      datalabels: {
        formatter: function (value: number) {
          return value;
        },
        color: "white",
        font: {
          weight: "bold",
          size: 14,
        },
        align: "center",
        anchor: "center",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      <div className="d-flex flex-row justify-center gap-3 mb-1">
        {columns
          .filter((col) => col.header.toLowerCase() !== "name")
          .map((col) => (
            <div key={col.accessor}>
              <Button onClick={() => setActiveColumn(col.accessor)}>
                {col.header}
              </Button>
            </div>
          ))}
      </div>
      <div style={{ width: "400px", height: "400px", margin:"auto" }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default UserChart;
