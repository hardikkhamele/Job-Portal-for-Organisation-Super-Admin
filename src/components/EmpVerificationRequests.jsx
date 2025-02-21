const EmpVerificationRequests = () => (
  <div className="bg-white p-4 shadow rounded w-1/2">
    <div className="flex justify-between items-center">
      <h3 className="font-bold">Verification Requests - Employee</h3>
      <button className="text-purple-500">View More</button>
    </div>
    <ul>
      {["Cameron", "Sarah", "Jason", "Daniel", "Lily"].map((name, index) => (
        <li key={index} className="flex justify-between py-2 border-b">
          <span>{name}</span>
          <div className="space-x-2">
            <button className="bg-purple-500 text-white px-3 py-1 rounded">
              View
            </button>
            <button className="bg-green-500 text-white px-3 py-1 rounded">
              Approve
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default EmpVerificationRequests;
