import React, { useState, useEffect } from 'react';
import { Users, Filter, Search, Edit, Trash2 } from 'lucide-react';

const ActiveManager = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [blockReason, setBlockReason] = useState('');




  useEffect(() => {
  fetchManagers();
}, []);

const fetchManagers = async () => {
  try {
    setLoading(true);
    const response = await fetch('http://localhost:5000/api/managers');
    const result = await response.json();

    if (response.ok) {
      const formatted = result.data.map((m) => ({
        id: m.id,
        regNo: m.reg_no,
        name: m.name,
        email: m.email,
        mobile: m.mobile,
        regDate: m.reg_date,
      }));
      setManagers(formatted);
    } else {
      setError(result.message || 'Failed to load data');
    }
  } catch (err) {
    console.error('Error fetching managers:', err);
    setError('Failed to fetch managers data');
  } finally {
    setLoading(false);
  }
};




  const filteredData = managers.filter(manager =>
    manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manager.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manager.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manager.mobile.includes(searchTerm)
  );


  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const handleEntriesPerPageChange = (value) => {
    setEntriesPerPage(value);
    setCurrentPage(1);
  };


  const handleView = (manager) => {
    console.log('View manager:', manager);
  };

  const handleBlock = (manager) => {
  setSelectedManager(manager);
  setBlockReason('');
  setShowModal(true);
};

const submitBlockReason = async () => {
  if (!blockReason.trim()) {
    alert('Please provide a reason for blocking.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/managers/${selectedManager.id}/block`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: blockReason }),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Manager blocked successfully.');
      setShowModal(false);
      await fetchManagers(); // 👈 Refresh after blocking
    } else {
      alert(result.message || 'Failed to block manager');
    }
  } catch (err) {
    console.error('Block error:', err);
    alert('Something went wrong');
  }
};


  const handleEdit = (manager) => {
    console.log('Edit manager:', manager);
  };

  const handleDelete = (manager) => {
    console.log('Delete manager:', manager);
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="animate-pulse">Loading managers data...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center text-red-600">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-l-4 border-blue-500 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Active Manager</h1>
                <p className="text-gray-600 text-sm">Manage and view all active manager records</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={entriesPerPage}
                    onChange={(e) => handleEntriesPerPageChange(Number(e.target.value))}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={25}>25 per page</option>
                    <option value={50}>50 per page</option>
                    <option value={100}>100 per page</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="border border-gray-300 rounded-md pl-9 pr-4 py-2 text-sm w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search by Reg No, Name, Email, Mobile"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold border-r border-blue-500">
                    <div className="flex items-center gap-1">
                      Sr.No.
                      <svg className="w-3 h-3 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold border-r border-blue-500">Reg.No / Name / Email / Mobile</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold border-r border-blue-500">Reg. Date</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold border-r border-blue-500">Details</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold border-r border-blue-500">Action</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentData.map((manager, index) => (
                  <tr key={manager.id} className={`hover:bg-blue-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-4 py-4 text-sm text-gray-800 font-medium border-r border-gray-200">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-4 py-4 text-sm border-r border-gray-200">
                      <div className="text-gray-700">
                        <span className="text-blue-700 font-semibold">{manager.regNo}</span> /
                        <span className="text-gray-900 font-medium"> {manager.name}</span> /
                        <span className="text-indigo-600"> {manager.email}</span> /
                        <span className="text-green-700 font-medium"> {manager.mobile}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800 font-medium border-r border-gray-200">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-semibold">
                        {manager.regDate}
                      </span>
                    </td>
                    <td className="px-4 py-4 border-r border-gray-200">
                      <button
                        onClick={() => handleView(manager)}
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                      >
                        View
                      </button>
                    </td>
                    <td className="px-4 py-4 border-r border-gray-200">
                      <button
                        onClick={() => handleBlock(manager)}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                      >
                        Block Now
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => handleEdit(manager)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-2 rounded-full transition-all duration-200 transform hover:scale-110"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(manager)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-full transition-all duration-200 transform hover:scale-110"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Block Manager</h2>
      <p className="text-sm text-gray-600 mb-2">
        Are you sure you want to block <span className="font-semibold text-red-600">{selectedManager?.name}</span>?
      </p>
      <textarea
        rows={4}
        placeholder="Enter reason for blocking..."
        value={blockReason}
        onChange={(e) => setBlockReason(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:ring-2 focus:ring-red-500"
      />
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={submitBlockReason}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
        >
          Block
        </button>
      </div>
    </div>
  </div>
)}

          </div>

          {/* Pagination Footer */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-300 px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-sm text-gray-700 font-medium">
                Showing <span className="text-blue-600 font-semibold">{startIndex + 1}</span> to <span className="text-blue-600 font-semibold">{Math.min(endIndex, totalEntries)}</span> of <span className="text-blue-600 font-semibold">{totalEntries}</span> entries
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-white hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                  >
                    Previous
                  </button>

                  <div className="flex gap-1">
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 text-sm rounded-md font-semibold transition-all duration-200 ${currentPage === page
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                                : 'border border-gray-300 hover:bg-white hover:border-blue-400 hover:text-blue-600'
                              }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (
                        (page === currentPage - 2 && currentPage > 3) ||
                        (page === currentPage + 2 && currentPage < totalPages - 2)
                      ) {
                        return <span key={page} className="px-2 py-2 text-sm text-gray-500">...</span>;
                      }
                      return null;
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-white hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveManager;