import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";

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
    setCandidateSummary([
      { title: "Total Candidate", value: "15k", updated: "Today Morning", color: "red", icon: faUsers },
      { title: "New Candidates", value: "8k", updated: "Yesterday", color: "blue", icon: faUserPlus },
      { title: "Active Candidates", value: "1.2k", updated: "2 Days Ago", color: "green", icon: faUserCheck },
      { title: "Inactive Candidates", value: "6.8k", updated: "Today Morning", color: "yellow", icon: faUserSlash }
    ]);

    setRequests([
      { name: "John Doe", qualification: "B.Tech in Computer Science", profileImage: "https://megikevents.com/wp-content/uploads/2017/10/speaker3-min.jpg" },
      { name: "Jane Smith", qualification: "MBA in HR", profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo_R_vlnUz9UhylMPCccagw4dMqhbs4UMPAA&s" },
      { name: "Jane Smith", qualification: "MBA in HR", profileImage: "https://sosafe-awareness.com/sosafe-files/uploads/2022/08/author-profile-picture.png" }
    ]);

    setCandidateDetails([
      { id: 527269, name: "Damon", qualification: "B.Sc Physics", documents: "Resume.pdf", mobile: "+91 12345 67890", profileImage: "https://megikevents.com/wp-content/uploads/2017/10/speaker3-min.jpg" },
      { id: 748526, name: "Mathew", qualification: "Front End Developer", documents: "Work Experience.pdf", mobile: "+91 12345 67890", profileImage: "https://sosafe-awareness.com/sosafe-files/uploads/2022/08/author-profile-picture.png" },
      { id: 748527, name: "Eva", qualification: "UI/UX Intern", documents: "Intern Certificate.pdf", mobile: "+91 12345 67890", profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo_R_vlnUz9UhylMPCccagw4dMqhbs4UMPAA&s" }
    ]);

    setOverviewData([
      { year: "2020-2021", value: 3 },
      { year: "2021-2022", value: 5 },
      { year: "2022-2023", value: 7 },
      { year: "2023-2024", value: 9 }
    ]);
  }, []);

  const chartData = {
    labels: overviewData.map(d => d.year),
    datasets: [
      {
        label: "Candidates Overview",
        data: overviewData.map(d => d.value * 1000),
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
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, grid: { display: false } }
    }
  };

  return (
    <div className="bg-gray-100 p-4">

      {/* SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {candidateSummary.map((item, index) => (
          <div key={index} className="flex justify-between items-center p-6 bg-white shadow-md rounded-lg">
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="text-xl font-bold">{item.value}</p>
              <p className="text-sm text-gray-500 flex items-center">
                <FontAwesomeIcon icon={faClockRotateLeft} className="mr-2 text-green-400" />
                {item.updated}
              </p>
            </div>
            <div className={`bg-${item.color}-100 p-2 rounded-full`}>
              <FontAwesomeIcon icon={item.icon} className={`text-${item.color}-500`} />
            </div>
          </div>
        ))}
      </div>

      {/* REQUESTS + CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl shadow-md">
          {requests.map((req, i) => (
            <div key={i} className="flex justify-between p-3 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <img src={req.profileImage} className="w-12 h-12 rounded-full" />
                <div>
                  <h4>{req.name}</h4>
                  <p className="text-sm">{req.qualification}</p>
                </div>
              </div>
              <div className="flex gap-2">
   <Link to="/candidateProfile" className="bg-purple-300 px-3 py-2 rounded-md">
  View Details
</Link>


<Link
  to="/VerificationCandiate"
  className="bg-green-300 px-3 py-2 rounded-md"
>
  Approve
</Link>

              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md h-64">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* 🔥 UPDATED TABLE (FIGMA STYLE) */}
      <div className="bg-white mt-6 p-5 rounded-xl shadow-md">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 text-gray-600">
              <th className="py-3">ID</th>
              <th>Candidate Name</th>
              <th>Qualification</th>
              <th>Documents</th>
              <th>Mobile</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {candidateDetails.map(d => (
              <tr key={d.id} className="border-b border-slate-100">
                <td className="py-4 text-gray-500">#{d.id}</td>

                <td className="flex items-center gap-3 py-4">
                  <img
                    src={d.profileImage}
                    className="w-10 h-10 rounded-full"
                    alt=""
                  />
                  <span className="font-medium">{d.name}</span>
                </td>

                <td className="text-gray-600">{d.qualification}</td>
                <td className="text-gray-600">{d.documents}</td>
                <td className="text-gray-600">{d.mobile}</td>

                <td className="flex justify-center gap-4 py-4">
                  <FontAwesomeIcon icon={faEdit} className="cursor-pointer" />
                  <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Candidate;
