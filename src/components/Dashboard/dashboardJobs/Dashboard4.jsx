import React, { useState } from "react";
import Bellicon from "./components/Bellicon";
import Comment from "./components/Comment";
import Sidebar from "./components/Sidebar";
import { Doughnut,Bar } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement,  CategoryScale,
  LinearScale,
  BarElement,
  Title,Tooltip, Legend } from "chart.js";
import Databar from "./components/Databar";
import Switch from "./components/Switch";
// import { Switch } from "@mui/material";

ChartJS.register(ArcElement,CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export default function Dashboard4() {
  const [searchtext,setSearchtext]=useState('')
  const [newjob,setNewjob]=useState(3000)
  const [totaljob,setTotaljob]=useState(5000)
  const [activejob,setActivejob]=useState(2000)
  const [expiredjob,setExpiredjob]=useState(4000)
  const [newjobper,setNewjobper]=useState(-2.3)
  const [totaljobper,setTotaljobper]=useState(8.3)
  const [activejobper,setActivejobper]=useState(4.3)
  const [expiredjobper,setExpiredjobper]=useState(1.3)
  const [notification,setNotification]=useState(1)
  const [jobposted,setJobposted]=useState(56789)
  const [candidate,setCandidate]=useState(56789)
  const [piechartdataArr] = useState([17, 11, 19]);
  const [barchartdataarr,setBarchartdataarr]=useState([{
    data1:[1800, 1400, 900, 1900, 1300],
    data2:[1300, 1119, 603, 1690, 1129]
  }])
  const [barchartlabel,setBarchartlabel]=useState(["2019", "2020","2021", "2022", "2023", "2024"])
  const [pichartlabel,setPiechartlabel] = useState([
    "Active Accounts",
    "Deactivated Account",
    "Verification Pending",
  ]);

  const piechartdata = {
    labels: pichartlabel,
    datasets: [
      {
        label: "Value",
        data: piechartdataArr,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const piechartoptions = {
    plugins: {
      legend: {
        display: false, 
      },
    },
  };

  const barchartdata = {
    labels: barchartlabel, // Categories
    datasets: [
      {
        label: "Dataset 1", // First bar
        data: barchartdataarr[0].data1, // Data for the first bar
        backgroundColor: "#59147E", // Bar color
        borderRadius:7,
        barThickness:14
      },
      {
        label: "Dataset 2", // Second bar
        data:barchartdataarr[0].data2 , // Data for the second bar
        backgroundColor: "#7F79C9", // Bar color
        borderRadius:7,
        barThickness:14,
      },
    ],
  };

  const barchartoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", 
        display:false// Position of the legend
      },
      title: {
        display: false,
        // Chart title
      },
    },
    scales: {
      x: {
        stacked: false, // Bars are side-by-side (not stacked)
        
      },
      y: {
        
        beginAtZero: true, // Y-axis starts from 0
        min: 0, // Set the minimum value of Y-axis
        max: 2000, // Set the maximum value of Y-axis
        ticks: {
          stepSize: 400, // Interval between ticks
        },
      },
    },
  };

  return (
    <div className="h-screen w-screen flex justify-center bg-gray-200 ">
      <div className="flex h-screen w-full bg-white">
        <Sidebar/>
        <div className="flex flex-col w-4/5 h-full bg-[#F0F0F0]">
          <div className="flex justify-between items-center p-3 shadow-md w-full h-15 bg-white">
            <div className="relative ">
              <img
                className="absolute top-[50%] translate-y-[-50%] left-3"
                src="magnifyglass.svg"
                alt=""
              />
              <input
                className="font-roboto text-sm border-1 border-gray-300 outline-none rounded-lg w-80 h-9 px-9"
                type="text"
                placeholder="Search Anything"
                onChange={(e)=>setSearchtext(e.target.value)}
                value={searchtext}
              />
            </div>
            <span className="flex gap-5">
              {/* <Switch/> */}
              <Switch/>
              <Comment />
              <Bellicon number={notification} />
              <img
                className="w-9 h-9 rounded-[50%] "
                src="logo.svg"
                alt=""
              />
            </span>
          </div>
          <div className="w-full flex flex-col justify-between flex-grow p-3">
            <p className="font-urbanist text-lg font-medium">
              Hello! TechnoHire
            </p>
            <p className="font-inter text-xl font-semibold">
              Dashboard - Job Posted
            </p>
            <div className="flex gap-3">
              <div className="relative w-1/5 p-2 h-25 flex flex-col justify-between flex-grow bg-white shadow-md rounded-lg">
                <p className="font-nunito-sans font-medium text-gray-500 text-[12px]">
                  New Job Posted
                </p>
                <p className="text-xl font-nunito-sans font-semibold mb-2">
                  {newjob}
                </p>
                <span className=" items-center w flex gap-1 font-nunito-sans font-medium text-gray-500  m-0 text-[10px]">
                  <img className="h-5 w-5" src={newjobper>0?"trendingup.svg":"trendingdown.svg"} alt="" />
                  <span style={{fontSize:'13px',color:newjobper>=0?"#00B69B":"red"}}>{newjobper>0?newjobper:-1*newjobper}%</span> {newjobper>=0?"Up till now":"Down from yesterday"}
                </span>
                <img
                  className="absolute h-11 w-11 top-3 right-3"
                  src="dashboard3left1.svg"
                  alt=""
                />
              </div>
              <div className="relative w-1/5 p-2 h-25 flex flex-col justify-between flex-grow  bg-white shadow-md rounded-lg">
                <p className="font-nunito-sans font-medium text-gray-500 text-[12px]">
                  Total Job Posted
                </p>
                <p className="text-xl font-nunito-sans font-semibold mb-2">
                  {totaljob}
                </p>
                <span className=" items-center flex gap-1 font-nunito-sans font-medium text-gray-500  m-0 text-[10px]">
                  <img className="h-5 w-5" src={totaljobper>0?"trendingup.svg":"trendingdown.svg"} alt="" />
                  <span style={{fontSize:'13px',color:totaljobper>=0?"#00B69B":"red"}}>{totaljobper>0?totaljobper:-1*totaljobper}%</span>Last updated on 12PM
                </span>
                <img
                  className="absolute h-11 w-11 top-3 right-3"
                  src="dashboard3left2.svg"
                  alt=""
                />
              </div>
              <div className="relative w-1/5 p-2 h-25 flex flex-col justify-between flex-grow  bg-white shadow-md rounded-lg">
                <p className="font-nunito-sans font-medium text-gray-500 text-[12px]">
                 Total Active Job
                </p>
                <p className="text-xl font-nunito-sans font-semibold mb-2">
                  {activejob}
                </p>
                <span className=" items-center flex gap-1 font-nunito-sans font-medium text-gray-500  m-0 text-[10px]">
                  <img className="h-5 w-5" src={activejobper>0?"trendingup.svg":"trendingdown.svg"} alt="" />
                  <span style={{fontSize:'13px',color:activejobper>=0?"#00B69B":"red"}}>{activejobper>0?activejobper:-1*activejobper}%</span> Last 24 Hours
                </span>
                <img
                  className="absolute h-11 w-11 top-3 right-3"
                  src="dashboard3left3.svg"
                  alt=""
                />
              </div>
              <div className="relative w-1/5 p-2 h-25 flex flex-col justify-between flex-grow  bg-white shadow-md rounded-lg">
                <p className="font-nunito-sans font-medium text-gray-500 text-[12px]">
                  Expired Job
                </p>
                <p className="text-xl font-nunito-sans font-semibold mb-2">
                  {expiredjob}
                </p>
                <span className="flex items-center gap-1 font-nunito-sans font-medium text-gray-500  m-0 text-[10px]">
                  <img className="h-5 w-5" src={expiredjobper>0?"trendingup.svg":"trendingdown.svg"} alt="" />
                  <span style={{fontSize:'13px',color:expiredjobper>=0?"#00B69B":"red"}}>{expiredjobper>0?expiredjobper:-1*expiredjobper}%</span> {expiredjobper>=0?"Up till now":"Down from yesterday"}
                </span>
                <img
                  className="absolute h-11 w-11 top-3 right-3"
                  src="dashboard3left4.svg"
                  alt=""
                />
              </div>
            </div>
            <div className="flex w-full gap-3">
              <div className="p-7 relative gap-5 flex-grow w-1/2 flex flex-col justify-center items-center bg-white shadow-md rounded-lg aspect-1/1 lg:aspect-auto">
              <p className=" absolute font-medium top-1 left-2 text-gray-500">Analytics</p>
                   <Bar className="mt-3 shadow-[0_0_20px_rgba(0,0,0,0.4)]" data={barchartdata} options={barchartoptions} />
                   <div className="w-full mb-[-12px] flex justify-center gap-14">
                      <div className="flex flex-col items-center">
                        <p className="text-gray-400 flex text-[13px] gap-3 items-center"><span className="w-2 h-2 rounded-[4px] bg-[#59147E]">.</span>Job Posted</p>
                        <p className="text-3xl text-[#59147E]">{jobposted}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-gray-400 flex text-[13px] gap-3 items-center"><span className="w-2 h-2 rounded-[4px] bg-[#7F79C9]">.</span>Candidate</p>
                        <p className="text-3xl text-[#7F79C9]">{candidate}</p>
                      </div>
                      
                   </div>
              </div>
              <div className="flex-grow relative flex justify-center items-center w-1/2 bg-white shadow-md rounded-lg aspect-1">
                <p className="absolute font-medium top-1 left-2  text-gray-500">Overview</p>
                <div className="w-2/5 flex gap-5 justify-center flex-col items-center ">
                  <Doughnut className="drop-shadow-lg" data={piechartdata} options={piechartoptions} />
                  <Databar
                    data={piechartdataArr}
                    label={pichartlabel}
                    color={piechartdata.datasets[0].backgroundColor}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-9 bg-white flex items-center px-5">
            <p className="text-[#000000A1] text-[10px]">Copyright © 2024 TechnoHire. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
