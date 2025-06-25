import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  User, 
  Mail, 
  Phone, 
  Award, 
  FileText,
  Filter,
  ChevronDown,
  Eye
} from 'lucide-react';

const Certificate = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const certificateData = [
    {
      id: 1,
      certificateNo: 'MH/2021/0277920/CRT-152',
      name: 'Anushka Gupta',
      fatherName: 'Rajendra Prasad',
      email: 'anushkawinggosoft@gmail.com',
      mobile: '1234567890',
      programName: 'Web Development'
    },
    {
      id: 2,
      certificateNo: 'MH/2021/0277920/CRT-152',
      name: 'Anushka Yadav',
      fatherName: 'Rajendra Prasad',
      email: 'anushkawinggosoft@gmail.com',
      mobile: '1234567890',
      programName: 'Web Development'
    },
    // Add more sample data if needed
  ];

  const filteredData = certificateData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.certificateNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        

        {/* Controls Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-blue-100">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <select 
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  className="border border-blue-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gradient-to-r from-blue-50 to-indigo-50"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-gray-600 font-medium">entries per page</span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gradient-to-r from-blue-50 to-indigo-50 w-72"
              />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold flex items-center gap-2">
                    <ChevronDown className="w-4 h-4" />
                    Sr No.
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Certificate No
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Name
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Father Name
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Mobile No
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Program Name
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Show Certificate</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id} className="border-b border-blue-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
                    <td className="px-6 py-4 font-medium text-blue-700">{index + 1}</td>
                    <td className="px-6 py-4">
                      <span className="bg-gradient-to-r from-blue-100 to-indigo-100 px-3 py-1 rounded-full text-blue-800 font-mono text-sm">
                        {item.certificateNo}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-gray-700">{item.fatherName}</td>
                    <td className="px-6 py-4">
                      <a href={`mailto:${item.email}`} className="text-blue-600 hover:text-blue-800 underline">
                        {item.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{item.mobile}</td>
                    <td className="px-6 py-4">
                      <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {item.programName}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md flex items-center gap-2 text-sm font-medium">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                        <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-3 py-2 rounded-lg transition-all duration-200 shadow-md">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-t border-blue-100">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium text-blue-700">1</span> to{' '}
                <span className="font-medium text-blue-700">1</span> of{' '}
                <span className="font-medium text-blue-700">1</span> entry
              </p>
              <div className="flex items-center gap-2">
                <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-200">
                  1
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;