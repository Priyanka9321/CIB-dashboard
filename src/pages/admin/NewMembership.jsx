import React, { useState, useEffect, useContext } from 'react';
import { Search, Eye, CheckCircle, Edit, Trash2, Users, Filter, X } from 'lucide-react';
import { MemberContext } from '../../context/MemberContext';
import MembershipRegistrationForm from '../user/MembershipRegistrationForm'; 

const NewMembership = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { data, error, fetchMembers, searchMembers, viewDetails, verifyMember, deleteMember, updateMember } =
    useContext(MemberContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false); 
  const [showForm, setShowForm] = useState(false); 

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSearch = async (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const success = await searchMembers(term);
    if (success) {
      setCurrentPage(1);
    }
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleViewDetails = async (userId) => {
    const member = await viewDetails(userId);
    if (member) {
      setSelectedMember({
        ...member,
        email: member.userEmail,
        mobileNo: member.userMobile,
        uniqueId: member.uniqueId || '',
        profilePic: member.photoPath ? { path: `${baseURL}/${member.photoPath}` } : null,
        signature: member.signaturePath ? { path: `${baseURL}/${member.signaturePath}` } : null,
      });
      setViewMode(true);
      setShowForm(true);
    }
  };

  const handleEdit = async (userId) => {
    const member = await viewDetails(userId);
    if (member) {
      setSelectedMember({
        ...member,
        email: member.userEmail,
        mobileNo: member.userMobile,
        uniqueId: member.uniqueId || '',
        profilePic: member.photoPath ? { path: `${baseURL}/${member.photoPath}` } : null,
        signature: member.signaturePath ? { path: `${baseURL}/${member.signaturePath}` } : null,
      });
      setViewMode(false);
      setShowForm(true);
    }
  };

  const handleFormSubmit = async (formData) => {
    if (!viewMode) {
      const result = await updateMember(selectedMember.userId, formData);
      if (result) {
        setShowForm(false);
        setSelectedMember(null);
      }
    } else {
      setShowForm(false);
      setSelectedMember(null);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedMember(null);
  };

  const handleVerify = async (userId) => {
    await verifyMember(userId);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      await deleteMember(userId);
    }
  };

  const totalEntries = Array.isArray(data) ? data.length : 0;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = Array.isArray(data) ? data.slice(startIndex, endIndex) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {showForm ? (
          <MembershipRegistrationForm
            initialData={selectedMember}
            isViewMode={viewMode}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        ) : (
          <>
            {/* Header Section */}
            <div className="bg-white shadow-lg p-6 mb-8 border-l-4 border-blue-500">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">Member Management</h1>
                    <p className="text-gray-600 text-sm">Manage active and new membership applications</p>
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
                      placeholder="Search by ID, Name, Email, Mobile..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="pl-10 pr-4 py-2 border border-gray-300 text-sm w-72 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

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
                    <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                      <tr>
                        <th className="px-3 py-3 text-left text-sm font-semibold">Sr. No.</th>
                        <th className="px-3 py-3 text-left text-sm font-semibold">Reg. No.</th>
                        <th className="px-3 py-3 text-left text-sm font-semibold">Name</th>
                        <th className="px-3 py-3 text-left text-sm font-semibold">Email</th>
                        <th className="px-3 py-3 text-left text-sm font-semibold">Mobile</th>
                        <th className="px-3 py-3 text-left text-sm font-semibold">Reg. Date</th>
                        <th className="px-3 py-3 text-left text-sm font-semibold">Payment Status</th>
                        <th className="px-3 py-3 text-left text-sm font-semibold">Designation</th>
                        <th className="px-3 py-3 text-center text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentData.map((item, index) => (
                        <tr
                          key={item.userId}
                          className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                        >
                          <td className="px-3 py-3 text-sm font-medium text-gray-900">{startIndex + index + 1}</td>
                          <td className="px-3 py-3 text-sm text-blue-600 font-medium">{item.regNo}</td>
                          <td className="px-3 py-3 text-sm text-gray-900 font-medium">{item.fullName}</td>
                          <td className="px-3 py-3 text-sm text-gray-600">{item.userEmail}</td>
                          <td className="px-3 py-3 text-sm text-gray-600">{item.userMobile}</td>
                          <td className="px-3 py-3 text-sm text-gray-600">{item.regDate}</td>
                          <td className="px-3 py-3 text-sm">
                            <span
                              className={`inline-flex items-center px-3 py-1 text-xs font-medium ${
                                item.paymentStatus === 'success'
                                  ? 'bg-green-100 text-green-800'
                                  : item.paymentStatus === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {item.paymentStatus || 'Unpaid'}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-600">{item.memberDesignation || '-'}</td>
                          <td className="px-3 py-3 text-sm">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleViewDetails(item.userId)}
                                className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white hover:bg-blue-600 transition-colors text-xs font-medium"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </button>
                              <button
                                onClick={() => handleVerify(item.userId)}
                                className="inline-flex items-center px-3 py-1.5 bg-green-500 text-white hover:bg-green-600 transition-colors text-xs font-medium"
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verify
                              </button>
                              <button
                                onClick={() => handleEdit(item.userId)}
                                className="inline-flex items-center px-3 py-1.5 bg-yellow-500 text-white hover:bg-yellow-600 transition-colors text-xs font-medium"
                              >
                                <Edit className="w-3 h-3 mr-1" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(item.userId)}
                                className="inline-flex items-center px-3 py-1.5 bg-red-500 text-white hover:bg-red-600 transition-colors text-xs font-medium"
                              >
                                <Trash2 className="w-3 h-3 mr-1" />
                                Delete
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
              <div className="bg-white shadow-lg p-6 text-center">
                <p className="text-gray-600">No members found.</p>
              </div>
            )}

            {/* Pagination Section */}
            {currentData.length > 0 && (
              <div className="bg-white shadow-lg p-6 mt-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-gray-600">
                    Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                    <span className="font-medium">{endIndex > totalEntries ? totalEntries : endIndex}</span> of{' '}
                    <span className="font-medium">{totalEntries}</span> entries
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
          </>
        )}
      </div>
    </div>
  );
};

export default NewMembership;