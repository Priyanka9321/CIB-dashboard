import React, { useState } from 'react';

const ActiveMembers = () => {
  const initialData = [
    { srNo: 1, regNo: "MBR-512", name: "zoro", email: "monarchs836@gmail.com", mobile: "9810867106", regDate: "14-06-2025" },
    { srNo: 2, regNo: "MBR-510", name: "XYZ", email: "harshitsh66l1@gmail.com", mobile: "7878439974", regDate: "14-06-2025" },
    { srNo: 3, regNo: "MBR-509", name: "hhh", email: "nitishchandraroy@gmail.com", mobile: "7002341656", regDate: "14-06-2025" },
    { srNo: 4, regNo: "MBR-508", name: "Shebin", email: "shebin2bjoseh@gmail.com", mobile: "9873177307", regDate: "13-06-2025" },
    { srNo: 5, regNo: "MBR-507", name: "Sachin vishwesworrao gudade", email: "Sachingudade862@gmail.com", mobile: "9503465428", regDate: "12-06-2025" },
    { srNo: 6, regNo: "MBR-506", name: "SHAMIM ALI", email: "superadmin@ramon.com", mobile: "7002115673", regDate: "11-06-2025" },
    { srNo: 7, regNo: "MBR-505", name: "Riddhika jadhav", email: "riddhika.jadhav07@gmail.com", mobile: "8799092949", regDate: "11-06-2025" },
    { srNo: 8, regNo: "MBR-504", name: "Rajkumar", email: "wingosoft@gmail.com", mobile: "5566774488", regDate: "11-06-2025" },
    { srNo: 9, regNo: "MBR-503", name: "दिशा", email: "dishudevansh730@gmail.com", mobile: "8445444182", regDate: "11-06-2025" },
    { srNo: 10, regNo: "MBR-502", name: "Rajkumar", email: "kumarsh@gmail.com", mobile: "5544667788", regDate: "10-06-2025" },
    ...Array.from({ length: 333 }, (_, i) => ({
      srNo: i + 11,
      regNo: `MBR-${501 - i}`,
      name: `User ${i + 11}`,
      email: `user${i + 11}@example.com`,
      mobile: `900000${i + 11}`,
      regDate: "01-06-2025",
    })),
  ];

  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = initialData.filter(
      (item) =>
        item.regNo.toLowerCase().includes(term) ||
        item.name.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term)
    );
    setData(filtered);
    setCurrentPage(1);
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const totalEntries = data.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="p-2 max-w-full mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <select
            value={entriesPerPage}
            onChange={handleEntriesChange}
            className="border border-gray-300 rounded p-1 text-xs"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="ml-2 text-xs text-gray-600">entries per page</span>
        </div>
        <h2 className="text-lg font-bold">Active Member Data</h2>
        <div className="flex items-center">
          <label className="mr-2 text-xs text-gray-600">Search:</label>
          <input
            type="text"
            placeholder="Enter as Id No. Name Email Id"
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded p-1 text-xs w-48"
          />
        </div>
      </div>

      {/* Table without scroll */}
      <div>
        <table className="w-full border-collapse bg-gray-50 table-fixed">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-1 text-left text-xs font-semibold w-[5%]">Sr.No.</th>
              <th className="p-1 text-left text-xs font-semibold w-[30%]">Reg.No / NAME / EMAIL / Mobile</th>
              <th className="p-1 text-left text-xs font-semibold w-[10%]">Reg-Date</th>
              <th className="p-1 text-left text-xs font-semibold w-[30%]">View</th>
              <th className="p-1 text-left text-xs font-semibold w-[15%]">Action</th>
              <th className="p-1 text-left text-xs font-semibold w-[10%]">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={item.srNo}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="p-1 text-xs truncate">{item.srNo}</td>
                <td className="p-1 text-xs truncate">
                  {item.regNo} / {item.name} / {item.email} / {item.mobile}
                </td>
                <td className="p-1 text-xs truncate">{item.regDate}</td>
                <td className="p-1 text-xs flex flex-wrap gap-1">
                  <button className="bg-green-500 text-white px-2 py-0.5 rounded hover:bg-green-600 text-xs">
                    View
                  </button>
                  <button className="bg-green-500 text-white px-2 py-0.5 rounded hover:bg-green-600 text-xs">
                    Appt. Letter
                  </button>
                  <button className="bg-green-500 text-white px-2 py-0.5 rounded hover:bg-green-600 text-xs">
                    ID Card
                  </button>
                  <button className="bg-green-500 text-white px-2 py-0.5 rounded hover:bg-green-600 text-xs">
                    Receipt
                  </button>
                </td>
                <td className="p-1 text-xs flex flex-wrap gap-1">
                  <button className="bg-red-500 text-white px-2 py-0.5 rounded hover:bg-red-600 text-xs">
                    Deactivate
                  </button>
                  <button className="bg-red-500 text-white px-2 py-0.5 rounded hover:bg-red-600 text-xs">
                    Block
                  </button>
                </td>
                <td className="p-1 text-xs flex gap-1">
                  <button className="text-blue-500 hover:text-blue-700 text-sm">✏️</button>
                  <button className="text-red-500 hover:text-red-700 text-sm">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-3 gap-2">
        <span className="text-xs text-gray-600">
          Showing {startIndex + 1} to{" "}
          {endIndex > totalEntries ? totalEntries : endIndex} of {totalEntries} entries
        </span>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-0.5 border rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs">
          {currentPage}
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-0.5 border rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ActiveMembers;