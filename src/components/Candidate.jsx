import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2"; // Use Line chart

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUserSlash,
  faUserCheck,
  faEdit,
  faTrash,
  faUserPlus,
  faClockRotateLeft
} from "@fortawesome/free-solid-svg-icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const Candidate = () => {
  const [candidateSummary, setCandidateSummary] = useState([]);
  const [requests, setRequests] = useState([]);
  const [candidateDetails, setCandidateDetails] = useState([]);
  const [overviewData, setOverviewData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setCandidateSummary([
        {
          title: "Total Candidate",
          value: "15k",
          updated: "Today Morning",
          color: "red",
          icon: faUsers
        },
        {
          title: "New Candidates",
          value: "8k",
          updated: "Yesterday",
          color: "blue",
          icon: faUserPlus
        },
        {
          title: "Active Candidates",
          value: "1.2k",
          updated: "2 Days Ago",
          color: "green",
          icon: faUserCheck
        },
        {
          title: "Inactive Candidates",
          value: "6.8k",
          updated: "Today Morning",
          color: "yellow",
          icon: faUserSlash
        }
      ]);
      setRequests([
        {
          name: "John Doe",
          qualification: "B.Tech in Computer Science",
          profileImage: "https://via.placeholder.com/50"
        },
        {
          name: "Jane Smith",
          qualification: "MBA in HR",
          profileImage: "https://via.placeholder.com/50"
        },
        {
          name: "Jane Smith",
          qualification: "MBA in HR",
          profileImage: "https://via.placeholder.com/50"
        }
      ]);
      setCandidateDetails([
        {
          id: 1,
          name: "John Doe",
          qualification: "B.Tech",
          documents: "Verified",
          mobile: "123-456-7890",
          profileImage: ""
        },
        {
          id: 2,
          name: "Kusuma",
          qualification: "MBA",
          documents: "Pending",
          mobile: "987-654-3210",
          profileImage: ""
        },
        {
          id: 3,
          name: "Smith",
          qualification: "MBA",
          documents: "Pending",
          mobile: "987-654-3210",
          profileImage: ""
        }
      ]);
      setOverviewData([
        { year: "2020-2021", value: 3 },
        { year: "2021-2022", value: 5 },
        { year: "2022-2023", value: 7 },
        { year: "2023-2024", value: 9 }
      ]);
    };

    fetchData();
  }, []);

  const chartData = {
    labels: overviewData.map((data) => data.year),
    datasets: [
      {
        label: "Candidates Overview",
        data: overviewData.map((data) => data.value * 1000),
        borderColor: "rgba(52, 8, 77, 0.92)",
        backgroundColor: "rgba(148, 0, 211, 0.2)",
        fill: true,
        tension: 0.4,
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Value: ${tooltipItem.raw} (${tooltipItem.raw / 1000}k)`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Fiscal Year"
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: "Number of Candidates"
        },
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `${value / 1000}k`;
          }
        },
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div>
      <div className=" flex">
        <div className="flex flex-col w-[100%] ">
          <div className="main-container flex flex-col h-fit w-full p-4 space-y-4  bg-gray-100">
            <div className="flex flex-col items-start  ">
              <h1 className="text-lg text-black font-semibold">
                Hello! TechnoHire
              </h1>
              <h4 className="text-2xl font-bold mt-2">Candidate Management</h4>
            </div>

            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
              {candidateSummary.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-6 bg-white shadow-md rounded-lg"
                >
                  <div className="flex flex-col justify-center items-left">
                    <p className="text-sm text-gray-500">{item.title}</p>
                    <p className="text-xl font-bold text-gray-800">
                      {item.value}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <FontAwesomeIcon
                        icon={faClockRotateLeft}
                        size="lg"
                        className="text-green-400 mr-2"
                      />
                      {item.updated}
                    </p>
                  </div>
                  <div className={`bg-${item.color}-100 rounded-full p-2`}>
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={`text-${item.color}-500`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="container-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Requests Section */}
              <div className="requests bg-white p-4    rounded-xl shadow-md overflow-hidden">
                <div className="flex items-center justify-between ">
                  <Link to="/candidate-profile">
                    <h3 className="text-lg font-semibold mb-2">
                      Verification Requests - Candidate
                    </h3>
                  </Link>
                  <button className="text-slate-600 font-semibold text-sm hover:text-slate-900">
                    View More
                  </button>
                </div>
                <div className="space-y-4 mt-4">
                  {requests.map((req, index) => (
                    <div
                      key={index}
                      className="flex flex-wrap justify-between p-3  border-b-2  "
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={req.profileImage}
                          alt="Candidate"
                          className="rounded-full w-12 h-12 border"
                        />
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {req.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {req.qualification}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3 space-x-2 mt-2 lg:mt-0">
                        <Link
                          to="/VerificationCandiate"
                          className="px-3 text-center pt-3  bg-purple-300 text-purple-800 font-bold rounded-md text-sm w-full lg:w-auto hover:text-purple-900 hover:bg-purple-400"
                        >
                          View Details
                        </Link>
                        <Link
                          to="/candidateProfile"
                          className="px-3 text-center pt-3  bg-green-300 text-green-800 font-bold rounded-md text-sm w-full lg:w-auto hover:text-green-900 hover:bg-green-400"
                        >
                          Approve
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overview Section */}
              <div className=" bg-white p-4 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold">
                  Candidate Yearly Overview
                </h3>
                <div className="mt-4 h-60">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* Container 4 */}
            <div className="mt-2 md:mt-4 lg:mt-8 rounded-xl shadow-md p-5 border bg-white">
              <h3 className="text-lg text-slate-700 font-semibold">
                Candidate Details
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full mt-4 border-collapse text-center min-w-max">
                  <thead>
                    <tr className="bg-white">
                      <th className="p-2 border-b-2">ID</th>
                      <th className="p-2 border-b-2">Candidate Name</th>
                      <th className="p-2 border-b-2">Qualification</th>
                      <th className="p-2 border-b-2">Documents</th>
                      <th className="p-2 border-b-2">Mobile</th>
                      <th className="p-2 border-b-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidateDetails.map((detail) => (
                      <tr key={detail.id} className="border-b">
                        <td className="p-2">#{detail.id}</td>
                        <td className="p-2  ">
                          <div className="flex items-center justify-start gap-3  ">
                            {detail.profileImage ? (
                              <img
                                src={detail.profileImage}
                                className="w-10 h-10 rounded-full "
                                alt="Profile"
                              />
                            ) : (
                              <span className="w-10 h-10 flex items-center justify-center bg-purple-300 rounded-full text-purple-800">
                                {detail.name[0]}
                              </span>
                            )}
                            <span className="whitespace-nowrap">
                              {detail.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          {detail.qualification}
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          {detail.documents}
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          {detail.mobile}
                        </td>
                        <td className="p-2 flex items-center justify-center space-x-4">
                          <Link
                            to=""
                            className="hover:text-purple-700 transition-transform transform hover:scale-110"
                          >
                            <FontAwesomeIcon icon={faEdit} size="lg" />
                          </Link>
                          <button className="text-red-500 hover:text-red-700 transition-transform transform hover:scale-110">
                            <FontAwesomeIcon icon={faTrash} size="lg" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Candidate;
