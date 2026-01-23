import { MdDelete, MdEdit } from "react-icons/md";

const employees = [
  {
    id: "#527269",
    name: "Cameron",
    role: "HR",
    company: "Technokrate",
    mobile: "+91 12345 67890",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cameron_Boyce_in_october_2017.jpg/250px-Cameron_Boyce_in_october_2017.jpg",
  },
  {
    id: "#748526",
    name: "Dustin",
    role: "Front End Developer",
    company: "Google",
    mobile: "+91 12345 67890",
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3enBDMWogVuwb9qwTtxG9MuogwaNyiclFQA&s",
  },
  {
    id: "#748526",
    name: "Sarah",
    role: "UI/UX Designer",
    company: "Instagram",
    mobile: "+91 12345 67890",
    photo: "https://img.freepik.com/free-photo/beautiful-smiling-model-with-afro-curls-hairstyle-dressed-summer-hipster-white-dress_158538-802.jpg",
  },
];

const EmployeeTable = () => (
  <div className="bg-white p-6 rounded-lg mt-6">
    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">Employee Details</h3>
      <button className="text-purple-500 text-sm">View More</button>
    </div>

    <table className="w-full">
      <thead>
        <tr className="text-left text-sm text-gray-500 border-b">
          <th className="pb-3">ID</th>
          <th className="pb-3">Employee Name</th>
          <th className="pb-3">Role</th>
          <th className="pb-3">Company</th>
          <th className="pb-3">Mobile</th>
          <th className="pb-3 text-right">Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp, index) => (
          <tr key={index} className="border-b last:border-none">
            <td className="py-4 text-gray-600">{emp.id}</td>

            <td className="py-4">
              <div className="flex items-center gap-3">
                <img
                  src={emp.photo}
                  alt={emp.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="font-medium">{emp.name}</span>
              </div>
            </td>

            <td className="py-4 text-gray-600">{emp.role}</td>
            <td className="py-4 text-gray-600">{emp.company}</td>
            <td className="py-4 text-gray-600">{emp.mobile}</td>

            <td className="py-4 text-right space-x-3">
              <button className="text-black">
                <MdEdit size={18} />
              </button>
              <button className="text-red-500">
                <MdDelete size={18} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;
