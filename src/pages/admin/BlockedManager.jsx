import React, { useState, useEffect } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';

export default function BlockedManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState('5');
  const [blockedManagers, setBlockedManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlockedManagers = async () => {
      try {
        setLoading(true);

        const response = await fetch('http://localhost:5000/api/managers/blocked');

        if (!response.ok) {
          throw new Error('Failed to fetch blocked managers');
        }

        const data = await response.json();
        setBlockedManagers(Array.isArray(data.data) ? data.data : []);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlockedManagers();
  }, []);

  const handleUnblock = async (managerId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/managers/${managerId}/unblock`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to unblock manager');
      }

      // Optionally show a success message

      // Refresh the list
      setBlockedManagers(prev => prev.filter(manager => manager.id !== managerId));

    } catch (err) {
      alert(`Error unblocking manager: ${err.message}`);
    }
  };


  // Filter managers based on search term
  const filteredManagers = blockedManagers.filter(manager => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (manager.regNo && manager.regNo.toLowerCase().includes(searchLower)) ||
      (manager.name && manager.name.toLowerCase().includes(searchLower)) ||
      (manager.email && manager.email.toLowerCase().includes(searchLower)) ||
      (manager.mobile && manager.mobile.includes(searchTerm))
    );
  });


  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredManagers.length / parseInt(entriesPerPage));
  const paginatedManagers = filteredManagers.slice(
    (currentPage - 1) * parseInt(entriesPerPage),
    currentPage * parseInt(entriesPerPage)
  );

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading blocked managers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800 mb-2">Blocked Manager Data</h1>
        <p className="text-sm text-gray-600 mb-4">Manage and view all blocked manager records</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(e.target.value);
                setCurrentPage(1); // Reset to first page when changing page size
              }}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by Reg No, Name, Email, Mobile"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
              className="border border-gray-300 rounded px-3 py-1 text-sm w-64"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Sr.No.
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Reg.No / Name / Email / Mobile
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Reg_Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Details
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Action
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedManagers.length > 0 ? (
              paginatedManagers.map((manager, index) => (
                <tr key={manager.id || index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">
                    {(currentPage - 1) * parseInt(entriesPerPage) + index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">
                    <div className="flex flex-col">
                      <span>{manager.reg_No}</span>
                      <span className="text-gray-600">/ {manager.name} /</span>
                      <span className="text-gray-600">{manager.email}</span>
                      <span className="text-gray-600">/ {manager.mobile}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">
                    {new Date(manager.reg_Date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 border-b">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                      <Eye size={16} /> View
                    </button>
                  </td>
                  <td className="px-4 py-3 border-b">
                    <button
                      onClick={() => handleUnblock(manager.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm font-medium"
                    >
                      Unblock
                    </button>

                  </td>
                  <td className="px-4 py-3 border-b">
                    <div className="flex gap-2">
                      <button className="text-gray-500 hover:text-blue-600 p-1">
                        <Edit size={16} />
                      </button>
                      <button className="text-gray-500 hover:text-red-600 p-1">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No blocked managers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">
          Showing {paginatedManagers.length > 0 ? (currentPage - 1) * parseInt(entriesPerPage) + 1 : 0} to{' '}
          {(currentPage - 1) * parseInt(entriesPerPage) + paginatedManagers.length} of{' '}
          {filteredManagers.length} entries
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded text-sm ${currentPage === page ? 'bg-blue-500 text-white' : ''
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}