const EmpVerificationRequests = () => {
  const employees = [
    {
      name: "Cameron",
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cameron_Boyce_in_october_2017.jpg/250px-Cameron_Boyce_in_october_2017.jpg",
    },
    {
      name: "Sarah",
      photo:
        "https://img.freepik.com/free-photo/beautiful-smiling-model-with-afro-curls-hairstyle-dressed-summer-hipster-white-dress_158538-802.jpg",
    },
    {
      name: "Jason",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3enBDMWogVuwb9qwTtxG9MuogwaNyiclFQA&s",
    },
    {
      name: "Daniel",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzYys0Fj_bAxlpeHtSssfQlwkFPhk_bSbLfw&s",
    },
    {
      name: "Lily",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlYNO6dZWtLvCIQ7uijv1tyF_RMgdioOG3WQ&s",
    },
  ];

  return (
    <div className="bg-white p-4 rounded w-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold">Verification Requests - Employee</h3>
        <button className="text-purple-500 text-sm">View More</button>
      </div>

      <ul>
        {employees.map((emp, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-3 border-b border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden">
                <img
                  src={emp.photo}
                  alt={emp.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-medium">{emp.name}</span>
            </div>

            <div className="space-x-2">
              <button className="bg-purple-200 text-purple-700 px-3 py-1 rounded text-sm">
                View Details
              </button>
              <button className="bg-green-200 text-green-700 px-3 py-1 rounded text-sm">
                Approve
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmpVerificationRequests;
