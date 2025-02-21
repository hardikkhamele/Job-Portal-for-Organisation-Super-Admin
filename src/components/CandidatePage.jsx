import React, { useState } from "react";
import Bellicon from "./Bellicon";
import Comment from "./Comment";
import Sidebar from "./Sidebar";
import { Doughnut, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import Databar from "./Databar";
import Switch from "./Switch";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function CandidatePage() {
  const [searchtext, setSearchtext] = useState("");
  const [newcandidate, setNewcandidate] = useState(12);
  const [totalcandidate, setTotalcandidate] = useState(2000);
  const [activecandidate, setActivecandidate] = useState(400);
  const [candidatehired, setCandidatehired] = useState(1000);
  const [newcandidateper, setNewcandidateper] = useState(-2.3);
  const [totalcandidateper, setTotalcandidateper] = useState(8.3);
  const [activecandidateper, setActivecandidateper] = useState(-4.3);
  const [candidatehiredper, setCandidatehiredper] = useState(1.3);
  const [notification, setNotification] = useState(4);
  const [jobposted, setJobposted] = useState(278532);
  const [candidate, setCandidate] = useState(2000);
  const [piechartdataArr] = useState([17, 11, 19]);
  const [barchartdataarr, setBarchartdataarr] = useState([
    {
      data1: [1800, 1400, 900, 1900, 1300, 1800],
      data2: [1300, 1119, 603, 1690, 1129, 1650]
    }
  ]);
  const [barchartlabel, setBarchartlabel] = useState([
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024"
  ]);
  const [piechartlabel, setPiechartlabel] = useState([
    "Active Accounts",
    "Deactivated Account",
    "Verification Pending"
  ]);

  const piechartdata = {
    labels: piechartlabel,
    datasets: [
      {
        label: "Value",
        data: piechartdataArr,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)"
        ],
        borderWidth: 1
      }
    ]
  };
  const piechartoptions = {
    plugins: {
      legend: {
        display: false
      }
    }
  };

  const barchartdata = {
    labels: barchartlabel, // Categories
    datasets: [
      {
        label: "Dataset 1", // First bar
        data: barchartdataarr[0].data1, // Data for the first bar
        backgroundColor: "#59147E", // Bar color
        borderRadius: 7,
        barThickness: 14
      },
      {
        label: "Dataset 2", // Second bar
        data: barchartdataarr[0].data2, // Data for the second bar
        backgroundColor: "#7F79C9", // Bar color
        borderRadius: 7,
        barThickness: 14
      }
    ]
  };

  const barchartoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false // Position of the legend
      },
      title: {
        display: false,
        text: "Double Bar Chart Example" // Chart title
      }
    },
    scales: {
      x: {
        stacked: false // Bars are side-by-side (not stacked)
      },
      y: {
        beginAtZero: true, // Y-axis starts from 0
        min: 0, // Set the minimum value of Y-axis
        max: 2000, // Set the maximum value of Y-axis
        ticks: {
          stepSize: 400 // Interval between ticks
        }
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col w-full h-full mb-5 bg-[#F0F0F0]">
        <p className="font-urbanist text-lg font-medium">Hello! TechnoHire</p>
        <p className="font-inter text-xl font-semibold">
          Dashboard - Candidate
        </p>
        <div className="flex gap-3">
          <div className="relative w-1/5 p-2 h-25 flex flex-col justify-between flex-grow bg-white shadow-md rounded-lg">
            <p className="font-nunito-sans font-medium text-gray-500 text-[12px]">
              New Candidate
            </p>
            <p className="text-xl font-nunito-sans font-semibold mb-2">
              {newcandidate}
            </p>
            <span className=" items-center w flex gap-1 font-nunito-sans font-medium text-gray-500  m-0 text-[10px]">
              <img
                className="h-5 w-5"
                src={
                  newcandidateper > 0 ? "trendingup.svg" : "trendingdown.svg"
                }
                alt=""
              />
              <span
                style={{
                  fontSize: "13px",
                  color: newcandidateper >= 0 ? "#00B69B" : "red"
                }}
              >
                {newcandidateper > 0 ? newcandidateper : -1 * newcandidateper}%
              </span>{" "}
              {newcandidateper >= 0 ? "Up till now" : "Down from yesterday"}
            </span>
            <img
              className="absolute h-11 w-11 top-3 right-3"
              src="dashboard3left1.svg"
              alt=""
            />
          </div>
          <div className="relative w-1/5 p-2 h-25 flex flex-col justify-between flex-grow  bg-white shadow-md rounded-lg">
            <p className="font-nunito-sans font-medium text-gray-500 text-[12px]">
              Total Candidate
            </p>
            <p className="text-xl font-nunito-sans font-semibold mb-2">
              {totalcandidate}
            </p>
            <span className=" items-center flex gap-1 font-nunito-sans font-medium text-gray-500  m-0 text-[10px]">
              <img
                className="h-5 w-5"
                src={
                  totalcandidateper > 0 ? "trendingup.svg" : "trendingdown.svg"
                }
                alt=""
              />
              <span
                style={{
                  fontSize: "13px",
                  color: totalcandidateper >= 0 ? "#00B69B" : "red"
                }}
              >
                {totalcandidateper > 0
                  ? totalcandidateper
                  : -1 * totalcandidateper}
                %
              </span>
              Last updated on 12PM
            </span>
            <img
              className="absolute h-11 w-11 top-3 right-3"
              src="dashboard3left2.svg"
              alt=""
            />
          </div>
          <div className="relative w-1/5 p-2 h-25 flex flex-col justify-between flex-grow  bg-white shadow-md rounded-lg">
            <p className="font-nunito-sans font-medium text-gray-500 text-[12px]">
              Active Candidate
            </p>
            <p className="text-xl font-nunito-sans font-semibold mb-2">
              {activecandidate}
            </p>
            <span className=" items-center flex gap-1 font-nunito-sans font-medium text-gray-500  m-0 text-[10px]">
              <img
                className="h-5 w-5"
                src={
                  activecandidateper > 0 ? "trendingup.svg" : "trendingdown.svg"
                }
                alt=""
              />
              <span
                style={{
                  fontSize: "13px",
                  color: activecandidateper >= 0 ? "#00B69B" : "red"
                }}
              >
                {activecandidateper > 0
                  ? activecandidateper
                  : -1 * activecandidateper}
                %
              </span>{" "}
              Last 24 Hours
            </span>
            <img
              className="absolute h-11 w-11 top-3 right-3"
              src="dashboard3left3.svg"
              alt=""
            />
          </div>
          <div className="relative w-1/5 p-2 h-25 flex flex-col justify-between flex-grow  bg-white shadow-md rounded-lg">
            <p className="font-nunito-sans font-medium text-gray-500 text-[12px]">
              Candidate Hired
            </p>
            <p className="text-xl font-nunito-sans font-semibold mb-2">
              {candidatehired}
            </p>
            <span className="flex items-center gap-1 font-nunito-sans font-medium text-gray-500  m-0 text-[10px]">
              <img
                className="h-5 w-5"
                src={
                  candidatehiredper > 0 ? "trendingup.svg" : "trendingdown.svg"
                }
                alt=""
              />
              <span
                style={{
                  fontSize: "13px",
                  color: candidatehiredper >= 0 ? "#00B69B" : "red"
                }}
              >
                {candidatehiredper > 0
                  ? candidatehiredper
                  : -1 * candidatehiredper}
                %
              </span>{" "}
              {candidatehiredper >= 0 ? "Up till now" : "Down from yesterday"}
            </span>
            <img
              className="absolute h-11 w-11 top-3 right-3"
              src="dashboard3left4.svg"
              alt=""
            />
          </div>
        </div>
        <div className="flex w-full gap-3">
          <div className="p-7 relative gap-5 flex-grow mt-10 mb-0 w-1/2 flex flex-col justify-center items-center bg-white shadow-md rounded-lg aspect-1/1 lg:aspect-auto">
            <p className=" absolute font-medium top-1 left-2 text-gray-500">
              Analytics
            </p>
            <Bar
              className=" mt-0 lg:mt-3 shadow-[0_0_20px_rgba(0,0,0,0.4)]"
              data={barchartdata}
              options={barchartoptions}
            />
            <div className="w-full mb-[-12px] flex justify-center gap-14">
              <div className="flex flex-col items-center">
                <p className="text-gray-400 flex text-[13px] gap-3 items-center">
                  <span className="w-2 h-2 rounded-[4px] bg-[#59147E]">.</span>
                  Job Posted
                </p>
                <p className="text-3xl text-[#59147E]">{jobposted}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-gray-400 flex text-[13px] gap-3 items-center">
                  <span className="w-2 h-2 rounded-[4px] bg-[#7F79C9]">.</span>
                  Candidate
                </p>
                <p className="text-3xl text-[#7F79C9]">{candidate}</p>
              </div>
            </div>
          </div>
          <div className="flex-grow relative mt-10 mb-0 flex justify-center items-center w-1/2 bg-white shadow-md rounded-lg aspect-1">
            <p className="absolute font-medium top-1 left-2 text-gray-500">
              Overview
            </p>
            <div className="w-2/5 flex gap-5 justify-center flex-col items-center ">
              <Doughnut
                className="drop-shadow-lg"
                data={piechartdata}
                options={piechartoptions}
              />
              <Databar
                data={piechartdataArr}
                label={piechartlabel}
                color={piechartdata.datasets[0].backgroundColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
