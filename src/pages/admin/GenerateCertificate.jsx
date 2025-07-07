import React, { useState, useMemo, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GenerateCertificate = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch data from API using Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/certificates');
        const fetchedData = Array.isArray(response.data.data) ? response.data.data : response.data || [];
        // Map API fields to component fields
        const mappedData = fetchedData.map(item => ({
          id: item.userId,
          name: item.fullName || '',
          email: item.userEmail || '',
          mobile: item.userMobile || '',
          regNo: item.regNo || '',
          regDate: item.regDate || '',
          verifyDate: item.verifyDate || '',
          status: item.status || ''
        }));
        setData(mappedData);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (member) => {
    navigate('/admin/memberdetails', { state: { member } });
  };

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mobile.includes(searchTerm)
    );
  }, [data, searchTerm]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
        >
          ‹
        </button>
      );
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 border rounded ${i === currentPage
              ? 'bg-blue-500 text-white border-blue-500'
              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
            }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
        >
          ›
        </button>
      );
    }

    return pages;
  };

  // Render loading or error states
  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center space-x-4">
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-600">entries per page</span>
          </div>

          <button className="bg-slate-700 text-white px-6 py-2 rounded hover:bg-slate-800">
            Generate Certificate
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Search:</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm w-64"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <span>Sr.No.</span>
                    <div className="flex flex-col">
                      <button
                        onClick={() => handleSort('id')}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ChevronUp size={12} />
                      </button>
                      <button
                        onClick={() => handleSort('id')}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ChevronDown size={12} />
                      </button>
                    </div>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <span>Reg. No / Name / Email / Mobile</span>
                    <div className="flex flex-col">
                      <button
                        onClick={() => handleSort('name')}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ChevronUp size={12} />
                      </button>
                      <button
                        onClick={() => handleSort('name')}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ChevronDown size={12} />
                      </button>
                    </div>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <span>Reg Date</span>
                    <div className="flex flex-col">
                      <button
                        onClick={() => handleSort('regDate')}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ChevronUp size={12} />
                      </button>
                      <button
                        onClick={() => handleSort('regDate')}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ChevronDown size={12} />
                      </button>
                    </div>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <span>Verify Date</span>
                    <div className="flex flex-col">
                      <button
                        onClick={() => handleSort('verifyDate')}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ChevronUp size={12} />
                      </button>
                      <button
                        onClick={() => handleSort('verifyDate')}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ChevronDown size={12} />
                      </button>
                    </div>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{item.regNo} / {item.name} / {item.email} / {item.mobile}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.regDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.verifyDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleSubmit(item)}
                      className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                    >
                      View
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="bg-green-500 text-white px-3 py-1 rounded text-xs">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600">
                      Generate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-6 py-4 border-t">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} entries
          </div>
          <div className="flex space-x-1">
            {renderPagination()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateCertificate;