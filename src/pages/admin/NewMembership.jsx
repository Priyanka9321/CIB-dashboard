import React, { useState } from 'react';
import { Search, Eye, CheckCircle, Edit, Trash2, Users, Filter } from 'lucide-react';

const NewMembership = () => {
  const initialData = [
    { srNo: 1, regNo: "MBR-513", name: "RAHUL KEVAT", email: "LBHERU579@GMAIL.COM", mobile: "77728049047", regDate: "16-06-2025", fee: "Unpaid" },
    { srNo: 2, regNo: "MBR-474", name: "SHREE RADHE", email: "srcitaka@gmail.com", mobile: "9974831261", regDate: "23-05-2025", fee: "Unpaid" },
    { srNo: 3, regNo: "MBR-472", name: "MD ASIF", email: "mypytvltbd4@gmail.com", mobile: "9903167970", regDate: "23-05-2025", fee: "Unpaid" },
    { srNo: 4, regNo: "MBR-471", name: "Jitendra Panwar", email: "jci.jaipur@gmail.com", mobile: "894974896", regDate: "23-05-2025", fee: "Unpaid" },
    { srNo: 5, regNo: "MBR-469", name: "Bhivesh Yadav", email: "yson29@gmail.com", mobile: "9630080100", regDate: "20-05-2025", fee: "Unpaid" },
    
    // Add more entries to simulate 85 total entries
    ...Array.from({ length: 75 }, (_, i) => ({
      srNo: i + 11,
      regNo: `MBR-${300 - i}`,
      name: `User ${i + 11}`,
      email: `user${i + 11}@example.com`,
      mobile: `900000${i + 11}`,
      regDate: "01-03-2025",
      fee: "Unpaid",
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white shadow-lg p-6 mb-8 border-l-4 border-blue-500">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">New Member Requests</h1>
                <p className="text-gray-600 text-sm">Manage and verify new membership applications</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={entriesPerPage}
                  onChange={handleEntriesChange}
                  className="border border-gray-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={10}>10 per page</option>
                  <option value={25}>25 per page</option>
                  <option value={50}>50 per page</option>
                  <option value={100}>100 per page</option>
                </select>
              </div>
              
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by ID, Name, or Email..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 pr-4 py-2 border border-gray-300 text-sm w-72 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Sr. No.</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Registration No.</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Member Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email Address</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Mobile Number</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Registration Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Fee Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentData.map((item, index) => (
                  <tr
                    key={item.srNo}
                    className={`hover:bg-blue-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.srNo}
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-600 font-medium">
                      {item.regNo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.mobile}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.regDate}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-3 py-1 text-xs font-medium ${
                        item.fee === "Unpaid" 
                          ? "bg-red-100 text-red-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {item.fee}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center justify-center gap-2">
                        <button className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white  hover:bg-blue-600 transition-colors text-xs font-medium">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </button>
                        <button className="inline-flex items-center px-3 py-1.5 bg-green-500 text-white  hover:bg-green-600 transition-colors text-xs font-medium">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verify
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Section */}
        <div className="bg-white shadow-lg p-6 mt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
              <span className="font-medium">
                {endIndex > totalEntries ? totalEntries : endIndex}
              </span>{" "}
              of <span className="font-medium">{totalEntries}</span> entries
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm border border-gray-300  text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {/* First Page */}
                {currentPage > 3 && (
                  <>
                    <button
                      onClick={() => setCurrentPage(1)}
                      className="px-3 py-2 text-sm  text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      1
                    </button>
                    {currentPage > 4 && <span className="px-2 text-gray-500">...</span>}
                  </>
                )}
                
                {/* Current Page Range */}
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
                        className={`px-3 py-2 text-sm  transition-colors ${
                          currentPage === pageNumber
                            ? "bg-blue-500 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  }
                  return null;
                })}
                
                {/* Last Page */}
                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && <span className="px-2 text-gray-500">...</span>}
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className="px-3 py-2 text-sm  text-gray-700 hover:bg-gray-100 transition-colors"
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
      </div>
    </div>
  );
};

export default NewMembership;