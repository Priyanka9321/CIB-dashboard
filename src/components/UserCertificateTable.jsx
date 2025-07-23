import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, Download, Trash2 } from 'lucide-react';
import axios from 'axios';

const UserCertificateTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { userId } = location.state || {};

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/getuserData/${userId}`);

        setCertificates(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCertificates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [userId]);

  const filteredCertificates = useMemo(() => {
    if (!searchTerm) return certificates;
    return certificates.filter(cert =>
      cert.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificateNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.regNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.fatherName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.programName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [certificates, searchTerm]);

  const totalEntries = filteredCertificates.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);
  const currentEntries = filteredCertificates.slice(startIndex, endIndex);

  const handleDelete = async (certificateNo) => {
    if (!window.confirm("Are you sure you want to hide this certificate?")) return;

    try {
      await axios.patch(`http://localhost:5000/api/soft-delete/${certificateNo}`);
      toast.success("Certificate hidden successfully");

      // Remove from frontend state
     setCertificates(prev => prev.filter(cert => cert.certificateNo.toString() !== certificateNo.toString()));

    } catch (error) {
      console.error("Error hiding certificate:", error);
      toast.error("Something went wrong while hiding the certificate.");
    }
  };


  const handleDownload = async (certificateNo) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/downloadcertificate/${certificateNo}`,
        {
          responseType: 'blob',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // If using authentication
          }
        }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate_${certificateNo}.pdf`);
      document.body.appendChild(link);
      link.click();

      // Clean up
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        link.remove();
        setLoading(false);
      }, 100);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Failed to download certificate');
      console.error('Download error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-700 text-white text-center py-3 mb-6 rounded-t-lg">
          <h1 className="text-xl font-semibold">User Certificate</h1>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(parseInt(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none"
            >
              {[10, 25, 50, 100].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <span className="text-sm text-gray-600">entries per page</span>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            />
            <button
              onClick={() => setCurrentPage(1)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center"
            >
              <Search size={16} className="mr-1" />
              Search
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["Sr No", "Certificate No", "Reg No", "Name", "Father Name", "Program Name", "Download", "Action"].map((header, idx) => (
                  <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEntries.length > 0 ? (
                currentEntries.map((cert, index) => (
                  <tr key={cert.certificateNo} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{startIndex + index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{cert.certificateNo}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{cert.regNo}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{cert.fullName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{cert.fatherName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{cert.programName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <button
                        onClick={() => handleDownload(cert.certificateNo)}
                        disabled={loading}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
                      >
                        {loading ? (
                          <span className="inline-block animate-spin">⏳</span>
                        ) : (
                          <>
                            <Download size={14} />
                            <span>Download</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <button
                        onClick={() => handleDelete(cert.certificateNo)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                    No certificates found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalEntries > 0 && (
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {endIndex} of {totalEntries} entries
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded text-sm ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCertificateTable;
