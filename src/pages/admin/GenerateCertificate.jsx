import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GenerateCertificate = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const navigate = useNavigate();

  const handleSubmit = (member) => {
    navigate('/admin/memberdetails', { state: { member } });
  }


  // Sample data - matches your screenshot
  const [data, setData] = useState([
    {
      id: 361,
      regNo: 'MBR-10',
      name: 'Chandu',
      email: 'chandu.sannepogu@gmail.com',
      mobile: '9133949509',
      regDate: '11-10-2024',
      verifyDate: '11-10-2024',
      status: 'Active',
      fatherName: 'Mr. Sannepogu',
      designation: 'Engineer',
      dateOfBirth: '01-01-1995',
      aadharCardNo: '1234-5678-9012',
      address: 'Hyderabad, Telangana',
      city: 'Hyderabad',
      occupation: 'Software Developer',
      userType: 'User',
      verifiedBy: 'Admin',
      userProfile: ''
    }
    
    // {
    //   id: 362,
    //   regNo: 'MBR-9',
    //   name: 'Mohit kumar',
    //   email: 'kumarmohit63399@gmail.com',
    //   mobile: '9341125223',
    //   regDate: '11-10-2024',
    //   verifyDate: '11-10-2024',
    //   status: 'Active'
    // },
    // {
    //   id: 363,
    //   regNo: 'MBR-7',
    //   name: 'test',
    //   email: 'test1@gmail.com',
    //   mobile: '1111111111',
    //   regDate: '10-10-2024',
    //   verifyDate: '10-10-2024',
    //   status: 'Active'
    // },
    // // Additional sample data to demonstrate pagination
    // {
    //   id: 364,
    //   regNo: 'MBR-6',
    //   name: 'John Doe',
    //   email: 'john.doe@gmail.com',
    //   mobile: '9876543210',
    //   regDate: '09-10-2024',
    //   verifyDate: '09-10-2024',
    //   status: 'Active'
    // },
    // {
    //   id: 365,
    //   regNo: 'MBR-5',
    //   name: 'Jane Smith',
    //   email: 'jane.smith@gmail.com',
    //   mobile: '8765432109',
    //   regDate: '08-10-2024',
    //   verifyDate: '08-10-2024',
    //   status: 'Active'
    // },
    // {
    //   id: 366,
    //   regNo: 'MBR-4',
    //   name: 'Bob Johnson',
    //   email: 'bob.johnson@gmail.com',
    //   mobile: '7654321098',
    //   regDate: '07-10-2024',
    //   verifyDate: '07-10-2024',
    //   status: 'Active'
    // },
    // {
    //   id: 367,
    //   regNo: 'MBR-3',
    //   name: 'Alice Brown',
    //   email: 'alice.brown@gmail.com',
    //   mobile: '6543210987',
    //   regDate: '06-10-2024',
    //   verifyDate: '06-10-2024',
    //   status: 'Active'
    // },
    // {
    //   id: 368,
    //   regNo: 'MBR-2',
    //   name: 'Charlie Davis',
    //   email: 'charlie.davis@gmail.com',
    //   mobile: '5432109876',
    //   regDate: '05-10-2024',
    //   verifyDate: '05-10-2024',
    //   status: 'Active'
    // },
    // {
    //   id: 369,
    //   regNo: 'MBR-1',
    //   name: 'Diana Wilson',
    //   email: 'diana.wilson@gmail.com',
    //   mobile: '4321098765',
    //   regDate: '04-10-2024',
    //   verifyDate: '04-10-2024',
    //   status: 'Active'
    // },
    // {
    //   id: 370,
    //   regNo: 'MBR-0',
    //   name: 'Edward Miller',
    //   email: 'edward.miller@gmail.com',
    //   mobile: '3210987654',
    //   regDate: '03-10-2024',
    //   verifyDate: '03-10-2024',
    //   status: 'Active'
    // }
  ]);



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
              placeholder=""
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
                      className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600">
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