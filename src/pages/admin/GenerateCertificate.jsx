import React, { useState } from 'react';

const GenerateCertificate = () => {
  const initialData = [
    { srNo: 1, regNo: "MBR-512", name: "zoro", email: "monarchs836@gmail.com", mobile: "9810867106", regDate: "14-06-2025", verifyDate: "14-06-2025", status: "Active" },
    { srNo: 2, regNo: "MBR-510", name: "XYZ", email: "harshitsh66l1@gmail.com", mobile: "7878439974", regDate: "14-06-2025", verifyDate: "15-06-2025", status: "Active" },
    { srNo: 3, regNo: "MBR-509", name: "hhh", email: "nitishchandraroy@gmail.com", mobile: "7002341656", regDate: "14-06-2025", verifyDate: "15-06-2025", status: "Active" },
    { srNo: 4, regNo: "MBR-508", name: "Shebin", email: "shebin2bjoseh@gmail.com", mobile: "9873177307", regDate: "13-06-2025", verifyDate: "13-06-2025", status: "Active" },
    { srNo: 5, regNo: "MBR-507", name: "Sachin vishwesworrao gudade", email: "Sachingudade862@gmail.com", mobile: "9503465428", regDate: "12-06-2025", verifyDate: "13-06-2025", status: "Active" },
    { srNo: 6, regNo: "MBR-506", name: "SHAMIM ALI", email: "superadmin@ramon.com", mobile: "7002115673", regDate: "11-06-2025", verifyDate: "13-06-2025", status: "Active" },
    { srNo: 7, regNo: "MBR-505", name: "Riddhika Jadhav", email: "riddhika.jadhav07@gmail.com", mobile: "8799092949", regDate: "11-06-2025", verifyDate: "15-06-2025", status: "Active" },
    { srNo: 8, regNo: "MBR-504", name: "Rajkumar", email: "wingosoft@gmail.com", mobile: "5566774488", regDate: "11-06-2025", verifyDate: "11-06-2025", status: "Active" },
    { srNo: 9, regNo: "MBR-503", name: "दिशा", email: "dishudevansh730@gmail.com", mobile: "8445444182", regDate: "11-06-2025", verifyDate: "11-06-2025", status: "Active" },
    { srNo: 10, regNo: "MBR-502", name: "Rajkumar", email: "kumarsh@gmail.com", mobile: "5544667788", regDate: "10-06-2025", verifyDate: "11-06-2025", status: "Active" },
    ...Array.from({ length: 333 }, (_, i) => ({
      srNo: i + 11,
      regNo: `MBR-${501 - i}`,
      name: `User ${i + 11}`,
      email: `user${i + 11}@example.com`,
      mobile: `900000${i + 11}`,
      regDate: "01-06-2025",
      verifyDate: "01-06-2025",
      status: "Active",
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
    <div className="p-4 max-w-full mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <select
            value={entriesPerPage}
            onChange={handleEntriesChange}
            className="border border-gray-300 rounded p-1 text-sm bg-white"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="ml-2 text-sm text-gray-600">entries per page</span>
        </div>
        <h2 className="text-lg font-bold text-gray-800">Generate Certificate</h2>
        <div className="flex items-center">
          <label className="mr-2 text-sm text-gray-600">Search:</label>
          <input
            type="text"
            placeholder="Enter as Id No. Name Email Id"
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded p-1 text-sm w-48"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Sr.No.</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Reg.No / NAME / EMAIL / Mobile</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Reg Date</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Verify Date</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Details</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={item.srNo}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-2 text-sm text-gray-600">{item.srNo}</td>
                <td className="p-2 text-sm text-gray-600">
                  {item.regNo} / {item.name} / {item.email} / {item.mobile}
                </td>
                <td className="p-2 text-sm text-gray-600">{item.regDate}</td>
                <td className="p-2 text-sm text-gray-600">{item.verifyDate}</td>
                <td className="p-2 text-sm">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    View
                  </button>
                </td>
                <td className="p-2 text-sm">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded">{item.status}</span>
                </td>
                <td className="p-2 text-sm">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    Generate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GenerateCertificate;