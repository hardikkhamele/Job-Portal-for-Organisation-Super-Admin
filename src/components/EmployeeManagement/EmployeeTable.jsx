import { MdOutlineSearch, MdDelete } from "react-icons/md";

const EmployeeTable = () => (
  <div className="bg-white p-4 shadow rounded my-4">
    <h3 className="font-bold">Employee Details</h3>
    <table className="w-full mt-2">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">ID</th>
          <th className="p-2">Employee Name</th>
          <th className="p-2">Role</th>
          <th className="p-2">Company</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {["#527269", "#748526", "#748526"].map((id, index) => (
          <tr key={index} className="border-b">
            <td className="p-2">{id}</td>
            <td className="p-2">{["Cameron", "Dustin", "Sarah"][index]}</td>
            <td className="p-2">
              {["HR", "Front End Developer", "UI/UX Designer"][index]}
            </td>
            <td className="p-2">
              {["Technokrate", "Google", "Instagram"][index]}
            </td>
            <td className="p-2">
              <button className="bg-red-500 text-white px-3 py-1 rounded">
                <MdDelete />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default EmployeeTable;
