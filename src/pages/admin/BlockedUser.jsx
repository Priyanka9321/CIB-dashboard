import React, { useEffect, useState } from "react";
import { Search, Filter, UserX, Shield, Lock, Unlock } from 'lucide-react';

const BlockUser = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [blockReason, setBlockReason] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch all users from backend
 useEffect(() => {
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("http://localhost:5000/api/v1/members");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      // ✅ Filter only blocked users
      const blockedUsers = result.filter(user => !user.isActive || user.status === 'blocked');

      setData(blockedUsers);
      setFilteredData(blockedUsers);
    } catch (error) {
      setError("Failed to fetch users");
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
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

  // Block User Function
 const handleBlock = async (user) => {
  if (!blockReason.trim()) {
    alert("Please enter a reason for blocking");
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/v1/members/${user.userId}/block`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reason: blockReason
        
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Update UI
    const updatedData = data.map(item =>
      item.userId === user.userId
        ? { ...item, status: "Blocked", reason: blockReason, blockedBy: "Admin" }
        : item
    );

    setData(updatedData);
    setFilteredData(updatedData);
    setBlockReason("");
    setSelectedUser(null);
    alert(`Successfully blocked ${user.fullName}`);
  } catch (err) {
    console.error("Failed to block user:", err);
    alert(`Failed to block user: ${err.message}`);
  }
};



  // Unblock User Function
 const handleUnblock = async (user) => {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/members/${user.userId}/activate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isActive: true }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // ✅ Remove user from the UI after unblocking
    const updatedData = data.filter(item => item.userId !== user.userId);
    setData(updatedData);
    setFilteredData(updatedData);

    alert(`Successfully unblocked ${user.fullName}`);
  } catch (err) {
    console.error("Failed to unblock user:", err);
    alert(`Failed to unblock user: ${err.message}`);
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
                <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                <p className="text-gray-600 text-sm">Manage and view all user accounts</p>
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

        {/* Block Reason Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-lg font-medium mb-4">Block {selectedUser.fullName}</h3>
              <textarea
                className="w-full p-2 border border-gray-300 rounded mb-4"
                rows="4"
                placeholder="Enter reason for blocking..."
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setSelectedUser(null);
                    setBlockReason("");
                  }}
                  className="px-4 py-2 border border-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleBlock(selectedUser)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Confirm Block
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white shadow-lg p-6 text-center">
            <p className="text-gray-600">Loading users...</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-800 p-4 mb-6 rounded">
            {error}
          </div>
        )}

        {/* Table Section */}
               {loading && (
          <div className="bg-white shadow-lg p-6 text-center">
            <p className="text-gray-600">Loading users...</p>
          </div>
        )}

        {/* Error Message - keep exactly as is */}
        {error && (
          <div className="bg-red-100 text-red-800 p-4 mb-6 rounded">
            {error}
          </div>
        )}

        {/* Table Section - UPDATED to match screenshot */}
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
                        <button className="text-blue-500 hover:underline">View</button>
                      </td>
                      <td className="px-3 py-3 text-sm">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.isActive ? 'Active' : 'Blocked'}
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
                          {item.isActive ? (
                            <button
                              onClick={() => setSelectedUser(item)}
                              className="inline-flex items-center px-3 py-1 bg-red-500 text-white hover:bg-red-600 transition-colors text-xs font-medium rounded"
                            >
                              <Lock className="w-3 h-3 mr-1" />
                              Block
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUnblock(item)}
                              className="inline-flex items-center px-3 py-1 bg-green-500 text-white hover:bg-green-600 transition-colors text-xs font-medium rounded"
                            >
                              <Unlock className="w-3 h-3 mr-1" />
                              Unblock
                            </button>
                          )}
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
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-2 text-sm transition-colors ${
                        currentPage === i + 1 ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
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