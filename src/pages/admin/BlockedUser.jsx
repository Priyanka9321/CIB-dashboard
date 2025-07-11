// import React, { useState } from 'react';

// const BlockUser = () => {
//   const initialData = [
//     {
//       srNo: 1,
//       regNo: "MBR-498",
//       name: "RAMESH KADAM",
//       email: "rameshkadamstar1974@gmail.com",
//       mobile: "8796636861",
//       blockingDate: "06-06-2025",
//       status: "Blocked",
//       reason: "Ok",
//       blockedBy: "Admin",
//     },
//     {
//       srNo: 2,
//       regNo: "MBR-447",
//       name: "Irshad",
//       email: "irshadvfv@gmail.com",
//       mobile: "99666463199",
//       blockingDate: "29-05-2025",
//       status: "Blocked",
//       reason: "6",
//       blockedBy: "Admin",
//     },
//   ];

//   const [data, setData] = useState(initialData);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);
//     const filtered = initialData.filter(
//       (item) =>
//         item.regNo.toLowerCase().includes(term) ||
//         item.name.toLowerCase().includes(term) ||
//         item.email.toLowerCase().includes(term)
//     );
//     setData(filtered);
//     setCurrentPage(1);
//   };

//   const handleEntriesChange = (e) => {
//     setEntriesPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const handleUnblock = (item) => {
//     const updatedData = data.map((dataItem) =>
//       dataItem.srNo === item.srNo ? { ...dataItem, status: "Active" } : dataItem
//     );
//     setData(updatedData);
//   };

//   const totalEntries = data.length;
//   const totalPages = Math.ceil(totalEntries / entriesPerPage);
//   const startIndex = (currentPage - 1) * entriesPerPage;
//   const endIndex = startIndex + entriesPerPage;
//   const currentData = data.slice(startIndex, endIndex);

//   return (
//     <div className="p-4 max-w-full mx-auto">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center">
//           <select
//             value={entriesPerPage}
//             onChange={handleEntriesChange}
//             className="border border-gray-300 rounded p-1 text-sm bg-white"
//           >
//             <option value={10}>10</option>
//             <option value={25}>25</option>
//             <option value={50}>50</option>
//             <option value={100}>100</option>
//           </select>
//           <span className="ml-2 text-sm text-gray-600">entries per page</span>
//         </div>
//         <h2 className="text-lg font-bold text-gray-800">All Block User Data</h2>
//         <div className="flex items-center">
//           <label className="mr-2 text-sm text-gray-600">Search:</label>
//           <input
//             type="text"
//             placeholder="Enter as Id No. Name Email Id"
//             value={searchTerm}
//             onChange={handleSearch}
//             className="border border-gray-300 rounded p-1 text-sm w-48"
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="border rounded">
//         <table className="w-full border-collapse">
//           <thead className="bg-gray-100 border-b">
//             <tr>
//               <th className="p-2 text-left text-sm font-semibold text-gray-700">Sr.No.</th>
//               <th className="p-2 text-left text-sm font-semibold text-gray-700">Reg.No / Name / Email / Mobile</th>
//               <th className="p-2 text-left text-sm font-semibold text-gray-700">Blocking Date</th>
//               <th className="p-2 text-left text-sm font-semibold text-gray-700">Details</th>
//               <th className="p-2 text-left text-sm font-semibold text-gray-700">Status</th>
//               <th className="p-2 text-left text-sm font-semibold text-gray-700">Reason</th>
//               <th className="p-2 text-left text-sm font-semibold text-gray-700">Block By</th>
//               <th className="p-2 text-left text-sm font-semibold text-gray-700">Action</th>
//               <th className="p-2 text-left text-sm font-semibold text-gray-700"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentData.map((item, index) => (
//               <tr
//                 key={item.srNo}
//                 className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
//               >
//                 <td className="p-2 text-sm text-gray-600">{item.srNo}</td>
//                 <td className="p-2 text-sm text-gray-600">
//                   {item.regNo} / {item.name} / {item.email} / {item.mobile}
//                 </td>
//                 <td className="p-2 text-sm text-gray-600">{item.blockingDate}</td>
//                 <td className="p-2 text-sm">
//                   <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
//                     View
//                   </button>
//                 </td>
//                 <td className="p-2 text-sm">
//                   <span
//                     className={`px-3 py-1 rounded ${
//                       item.status === "Blocked"
//                         ? "bg-red-500 text-white"
//                         : "bg-green-100 text-green-700"
//                     }`}
//                   >
//                     {item.status}
//                   </span>
//                 </td>
//                 <td className="p-2 text-sm text-gray-600">{item.reason}</td>
//                 <td className="p-2 text-sm">
//                   <span className="bg-green-500 text-white px-3 py-1 rounded">
//                     {item.blockedBy}
//                   </span>
//                 </td>
//                 <td className="p-2 text-sm">
//                   {item.status === "Blocked" ? (
//                     <button
//                       onClick={() => handleUnblock(item)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                     >
//                       Unblock
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => handleUnblock(item)}
//                       className="bg-gray-300 text-gray-700 px-3 py-1 rounded cursor-not-allowed"
//                       disabled
//                     >
//                       Unblock
//                     </button>
//                   )}
//                 </td>
//                 <td className="p-2 text-sm flex gap-1">
//                   <button className="text-gray-500 hover:text-gray-700">✏️</button>
//                   <button className="text-gray-500 hover:text-gray-700">🗑️</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center items-center mt-4 gap-2">
//         <span className="text-sm text-gray-600">
//           Showing {startIndex + 1} to{" "}
//           {endIndex > totalEntries ? totalEntries : endIndex} of {totalEntries} entries
//         </span>
//         <button
//           onClick={() => setCurrentPage(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Previous
//         </button>
//         <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
//           {currentPage}
//         </button>
//         <button
//           onClick={() => setCurrentPage(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BlockUser;

// updated by sumit 


import React, { useEffect, useState } from "react";
import { 
  Search, 
  Users, 
  Filter, 
  UserX, 
  Shield 
} from 'lucide-react';

const BlockUser = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch blocked users from backend
  useEffect(() => {
    const fetchBlockedUsers = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch("http://localhost:5000/api/v1/members/blocked");
        const result = await response.json();
        setData(result);
        setFilteredData(result);
      } catch (error) {
        setError("Failed to fetch blocked users");
        console.error("Failed to fetch blocked users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlockedUsers();
  }, []);

  // Handle Search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = data.filter(
      (item) =>
        item.regNo?.toLowerCase().includes(term) ||
        item.fullName?.toLowerCase().includes(term) ||
        item.userEmail?.toLowerCase().includes(term) ||
        item.userMobile?.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleUnblock = async (item) => {
    const confirmUnblock = window.confirm(
      `Are you sure you want to unblock ${item.fullName}?`
    );
    if (!confirmUnblock) return;

    try {
      await fetch(`http://localhost:5000/api/v1/members/${item.userId}/activate`, {
        method: 'PATCH'
      });
      const updated = filteredData.filter((dataItem) => dataItem.userId !== item.userId);
      setFilteredData(updated);
      setData(prev => prev.filter((dataItem) => dataItem.userId !== item.userId));
    } catch (err) {
      console.error("Failed to unblock user:", err);
    }
  };

  // Pagination
  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white shadow-lg p-6 mb-8 border-l-4 border-red-500">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100">
                <UserX className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">All Block User Data</h1>
                <p className="text-gray-600 text-sm">Manage and view all blocked user accounts</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={entriesPerPage}
                  onChange={handleEntriesChange}
                  className="border border-gray-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value={10}>10 entries per page</option>
                  <option value={25}>25 entries per page</option>
                  <option value={50}>50 entries per page</option>
                  <option value={100}>100 entries per page</option>
                </select>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search:"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 pr-4 py-2 border border-gray-300 text-sm w-72 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white shadow-lg p-6 text-center">
            <p className="text-gray-600">Loading blocked users...</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-800 p-4 mb-6 rounded">
            {error}
          </div>
        )}

        {/* Table Section */}
        {currentData.length > 0 ? (
          <div className="bg-white shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-3 py-3 text-left text-sm font-medium text-gray-700">Sr.No.</th>
                    <th className="px-3 py-3 text-left text-sm font-medium text-gray-700">Reg.No / Name / Email / Mobile</th>
                    <th className="px-3 py-3 text-left text-sm font-medium text-gray-700">Blocking Date</th>
                    <th className="px-3 py-3 text-left text-sm font-medium text-gray-700">Details</th>
                    <th className="px-3 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-3 py-3 text-left text-sm font-medium text-gray-700">Reason</th>
                    <th className="px-3 py-3 text-left text-sm font-medium text-gray-700">Block By</th>
                    <th className="px-3 py-3 text-center text-sm font-medium text-gray-700">Action</th>
                    <th className="px-3 py-3 text-center text-sm font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentData.map((item, index) => (
                    <tr
                      key={item.userId || index}
                      className={`hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-3 py-3 text-sm font-medium text-gray-900">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-3 py-3 text-sm">
                        <div className="space-y-1">
                          <div className="text-blue-600 font-medium">{item.regNo || 'N/A'}</div>
                          <div className="font-medium text-gray-900">{item.fullName || 'N/A'}</div>
                          <div className="text-gray-600">{item.userEmail || 'N/A'}</div>
                          <div className="text-gray-600">{item.userMobile || 'N/A'}</div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-600">
                        {item.blockDate || item.blockingDate
                          ? new Date(item.blockDate || item.blockingDate).toLocaleDateString("en-IN")
                          : "N/A"}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-600">
                        {item.details || 'N/A'}
                      </td>
                      <td className="px-3 py-3 text-sm">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {item.status || 'Blocked'}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-600">
                        {item.reason || 'N/A'}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-600">
                        {item.blockBy || item.blockedBy || 'N/A'}
                      </td>
                      <td className="px-3 py-3 text-sm">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => handleUnblock(item)}
                            className="inline-flex items-center px-3 py-1 bg-green-500 text-white hover:bg-green-600 transition-colors text-xs font-medium rounded"
                          >
                            <Shield className="w-3 h-3 mr-1" />
                            Unblock
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm">
                        <div className="flex items-center justify-center">
                          <button
                            className="inline-flex items-center px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 transition-colors text-xs font-medium rounded"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          !loading && (
            <div className="bg-white shadow-lg p-6 text-center">
              <p className="text-gray-600">No data available in table</p>
            </div>
          )
        )}

        {/* Pagination Section */}
        {totalEntries > 0 && (
          <div className="bg-white shadow-lg p-4 mt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {endIndex > totalEntries ? totalEntries : endIndex} of {totalEntries} entries
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {currentPage > 3 && (
                    <>
                      <button
                        onClick={() => setCurrentPage(1)}
                        className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        1
                      </button>
                      {currentPage > 4 && <span className="px-2 text-gray-500">...</span>}
                    </>
                  )}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }
                    if (pageNumber > 0 && pageNumber <= totalPages) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`px-3 py-2 text-sm transition-colors ${
                            currentPage === pageNumber ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    }
                    return null;
                  })}
                  {currentPage < totalPages - 2 && (
                    <>
                      {currentPage < totalPages - 3 && <span className="px-2 text-gray-500">...</span>}
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockUser;
