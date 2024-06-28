import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar, Chart, Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ReactApexChart from "react-apexcharts";

import { MdMoneyOff, MdOutlineAttachMoney } from "react-icons/md";

export const Dashboard = () => {
  const [profit, setProfit] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const chartOptions = {
    chart: {
      type: "line",
    },
    series: [
      {
        name: "Profit",
        data: profit.map((ele) => ele.totalProfit),
      },
    ],
    xaxis: {
      categories: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
  };
  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const data = {
    labels: [
      `number Of Clients :${statistics.clientsCount}`,
      `number Of Employee :${statistics.employeeCount} `,
    ],
    datasets: [
      {
        label: "Count",
        data: [statistics.clientsCount, statistics.employeeCount],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  let data2 = {
    labels: [
      `paid OperationCount :${statistics.paidOperationCount}`,
      `unPaid OperationCount :${statistics.unPaidOperationCount}`,
    ],
    datasets: [
      {
        label: "Count",
        data: [statistics.paidOperationCount, statistics.unPaidOperationCount],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data3 = {
    labels,

    datasets: [
      {
        label: profit[0]?.year,
        data: profit.map((ele) => ele.totalProfit),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const data4 = {
    labels,

    datasets: [
      {
        label: profit[0]?.year,
        data: profit.map((ele) => ele.operationCount),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  async function getProfits() {
    let { data } = await axios.get(
      "https://companygradution.runasp.net/api/Operations/monthly-profits?year=2024"
    );
    setProfit(data);
  }
  async function getStatistics() {
    let { data } = await axios.get(
      "https://companygradution.runasp.net/api/Operations/Statistics"
    );
    setStatistics(data.data);
  }

  async function handleChange(year) {
    let { data } = await axios.get(
      `https://companygradution.runasp.net/api/Operations/monthly-profits?year=${year}`
    );
    setProfit(data);
  }

  useEffect(() => {
    getProfits();
    getStatistics();
  }, []);

  return (
    <div className="container mt-5  ">
      <h2 className="mb-4 mt-3">Report </h2>
      <div className="row justify-content- gx-5 gy-4">
        <div className="col-md-12 ">
          <div className="inner bg-white shadow-sm rounded-4 p-3 ">
            <h4>Total Profit</h4>
            <ReactApexChart
              options={chartOptions}
              series={chartOptions.series}
              type="line"
              height={350}
            />
          </div>
        </div>
        <div className="col-md-6 ">
          <div className="inner bg-white shadow-sm rounded-4 p-3 ">
            <h4 className="my-3">
              Total users :{" "}
              <span className="fw-bold fs-2 text-black">
                {" "}
                {statistics.clientsCount + statistics.paidOperationCount}{" "}
              </span>
            </h4>
            <div>
              <div style={{ width: "55%" }}>
                <Doughnut data={data} />
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center flex-wrap mt-4 ">
              <div class="my-2  d-flex  shadow  bg-white mt-2 rounded-3 col-5 p-3">
                <div class="report-agents-icons ">
                  <img
                    src="data:image/png;base64,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"
                    alt="logo"
                  />
                </div>
                <div className="mx-3">
                  <p class="d-flex flex-column  mb-2 report-subtitle d-flex align-items-center">
                    Users Count
                  </p>
                  <strong class="fw-bold">{statistics.clientsCount}</strong>
                </div>
              </div>
              <div class="my-2  d-flex  shadow  bg-white mt-2 rounded-3 col-6 p-3">
                <div class="report-agents-icons ">
                  <img
                    src="data:image/png;base64,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"
                    alt="logo"
                  />
                </div>
                <div className="mx-3">
                  <p class="d-flex flex-column  mb-2 report-subtitle d-flex align-items-center">
                    Users Employees
                  </p>
                  <strong class="fw-bold">{statistics.employeeCount}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6  ">
          <div className="inner  bg-white shadow-sm rounded-4 p-3 ">
            <h4 className="my-3">
              {" "}
              Total Operations :{" "}
              <span className="fw-bold fs-2 text-black">
                {" "}
                {statistics.paidOperationCount +
                  statistics.unPaidOperationCount}{" "}
              </span>
            </h4>

            <div className="" style={{ width: "55%" }}>
              <Pie data={data2} />
            </div>

            <div class="d-flex justify-content-between align-items-center flex-wrap mt-4 ">
              <div class="my-2  d-flex  shadow align-items-center  bg-white mt-2 rounded-3 col-5 py-3 px-2">
                <div class="report-agents-icons ">
                  <MdOutlineAttachMoney className="fs-2 text-success" />
                </div>
                <div className="mx-2">
                  <p class="d-flex flex-column  mb-2 report-subtitle d-flex align-items-center">
                    paid Operation Count
                  </p>
                  <strong class="fw-bold">
                    {statistics.paidOperationCount}
                  </strong>
                </div>
              </div>
              <div class="my-2  d-flex  shadow  bg-white mt-2  align-items-center rounded-3 col-6 p-3">
                <div class="report-agents-icons ">
                  <MdMoneyOff className="fs-2 text-secondary" />
                </div>
                <div className="mx-3">
                  <p class="d-flex flex-column  mb-2 report-subtitle d-flex align-items-center">
                    unpaid Operation Count
                  </p>
                  <strong class="fw-bold">
                    {statistics.unPaidOperationCount}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="inner  bg-white shadow-sm rounded-4 p-3">
            <div className="d-flex justify-content-between">
              <h4>Total Operation Count </h4>
              <select
                name="year"
                id=""
                onChange={(e) => {
                  handleChange(e.target.value);
                }}
                className="border rounded "
              >
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>
            <Bar options={options} data={data4} />
          </div>
        </div>
      </div>
    </div>
  );
};
