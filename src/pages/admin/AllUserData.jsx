import React, { useState, useEffect, useContext } from 'react';
import { Search, Eye, Edit, Trash2, Users, Filter, CheckCircle } from 'lucide-react';
import { MemberContext } from '../../context/MemberContext';
import MembershipRegistrationForm from '../user/MembershipRegistrationForm';
import { toast } from 'react-toastify';

const AllUserData = () => {
  const { data, error, fetchMembers, searchMembers, viewDetails, verifyMember, deleteMember, updateMember } =
    useContext(MemberContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Fetch members on component mount
  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // Handle search
  const handleSearch = async (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term) {
      await searchMembers(term);
    } else {
      await fetchMembers();
    }
    setCurrentPage(1);
  };

  // Handle entries per page change
  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Handle view details
  const handleViewDetails = async (userId) => {
    try {
      const member = await viewDetails(userId);
      if (member) {
        setSelectedMember({
          ...member,
          email: member.userEmail,
          mobileNo: member.userMobile,
          uniqueId: member.uniqueId || '',
          profilePic: member.photoPath ? { path: `http://localhost:5000/${member.photoPath}` } : null,
          signature: member.signaturePath ? { path: `http://localhost:5000/${member.signaturePath}` } : null,
          dob: member.dob || '',
          accountStatus: member.accountStatus || 'inactive',
        });
        setViewMode(true);
        setShowForm(true);
        toast.success('User details fetched successfully');
      }
    } catch (error) {
      toast.error('Failed to fetch user details');
    }
  };

  // Handle edit
  const handleEdit = async (userId) => {
    try {
      const member = await viewDetails(userId);
      if (member) {
        setSelectedMember({
          ...member,
          email: member.userEmail,
          mobileNo: member.userMobile,
          uniqueId: member.uniqueId || '',
          profilePic: member.photoPath ? { path: `http://localhost:5000/${member.photoPath}` } : null,
          signature: member.signaturePath ? { path: `http://localhost:5000/${member.signaturePath}` } : null,
          dob: member.dob || '',
          accountStatus: member.accountStatus || 'inactive',
        });
        setViewMode(false);
        setShowForm(true);
        toast.success('Edit form opened successfully');
      }
    } catch (error) {
      toast.error('Failed to fetch user details for editing');
    }
  };

  // Handle form submit
  const handleFormSubmit = async (formData) => {
    if (!viewMode) {
      try {
        const result = await updateMember(selectedMember.userId, formData);
        if (result && result.hasChanges) {
          setShowForm(false);
          setSelectedMember(null);
          toast.success('Member updated successfully!', {
            position: 'top-right',
            autoClose: 3000,
          });
          await fetchMembers(); // Refresh data
        } else if (result && !result.hasChanges) {
          toast.info('No changes were made to the member details.', {
            position: 'top-right',
            autoClose: 3000,
          });
          setShowForm(false);
          setSelectedMember(null);
        }
      } catch (error) {
        toast.error('Failed to update member');
      }
    } else {
      setShowForm(false);
      setSelectedMember(null);
    }
  };

  // Handle form cancel
  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedMember(null);
  };

  // Handle verify
  const handleVerify = async (userId) => {
    try {
      const success = await verifyMember(userId);
      if (success) {
        toast.success('Member verified successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error('Failed to verify user');
    }
  };

  // Handle delete
  const handleDelete = async (item) => {
    if (item.accountStatus === 'inactive') {
      toast.error('User is already deactivated', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }
    if (window.confirm(`Are you sure you want to delete ${item.fullName}?`)) {
      try {
        await deleteMember(item.userId);
        toast.success('User deleted successfully', {
          position: 'top-right',
          autoClose: 3000,
        });
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  // Pagination logic
  const totalEntries = Array.isArray(data) ? data.length : 0;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = Array.isArray(data) ? data.slice(startIndex, endIndex) : [];

  // Map backend fields to component fields
  const mappedData = currentData.map((item, index) => ({
    srNo: startIndex + index + 1,
    regNo: item.regNo,
    name: item.fullName,
    email: item.userEmail,
    mobile: item.userMobile,
    regDate: item.regDate,
    status: item.accountStatus.charAt(0).toUpperCase() + item.accountStatus.slice(1), // Capitalize status
    userId: item.userId, // Keep userId for actions
    accountStatus: item.accountStatus, // Keep original status for logic
  }));

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'Blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen p-6">
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
                    <h1 className="text-2xl font-bold text-gray-800">All User Data</h1>
                    <p className="text-gray-600 text-sm">Manage and monitor all registered users</p>
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
            {mappedData.length > 0 ? (
              <div className="bg-white shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                      <tr>
                        <th className="px-4 py-4 text-left text-sm font-semibold">Sr. No.</th>
                        <th className="px-4 py-4 text-left text-sm font-semibold">Reg. No.</th>
                        <th className="px-4 py-4 text-left text-sm font-semibold">Name</th>
                        <th className="px-4 py-4 text-left text-sm font-semibold">Email</th>
                        <th className="px-4 py-4 text-left text-sm font-semibold">Mobile</th>
                        <th className="px-4 py-4 text-left text-sm font-semibold">Reg. Date</th>
                        <th className="px-4 py-4 text-left text-sm font-semibold">Status</th>
                        <th className="px-4 py-4 text-center text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {mappedData.map((item, index) => (
                        <tr
                          key={item.userId}
                          className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                        >
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">{item.srNo}</td>
                          <td className="px-4 py-4 text-sm text-blue-600 font-medium">{item.regNo}</td>
                          <td className="px-4 py-4 text-sm text-gray-900 font-medium">{item.name}</td>
                          <td className="px-4 py-4 text-sm text-gray-600">{item.email}</td>
                          <td className="px-4 py-4 text-sm text-gray-600">{item.mobile}</td>
                          <td className="px-4 py-4 text-sm text-gray-600">{item.regDate}</td>
                          <td className="px-4 py-4 text-sm">
                            <span className={`inline-flex items-center px-3 py-1 text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleViewDetails(item.userId)}
                                className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white hover:bg-blue-600 transition-colors text-xs font-medium"
                                title="View Details"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </button>
                              <button
                                onClick={() => handleVerify(item.userId)}
                                className="inline-flex items-center px-3 py-1.5 bg-green-500 text-white hover:bg-green-600 transition-colors text-xs font-medium"
                                title="Verify User"
                                disabled={item.accountStatus === 'active'}
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verify
                              </button>
                              <button
                                onClick={() => handleEdit(item.userId)}
                                className="inline-flex items-center px-3 py-1.5 bg-orange-500 text-white hover:bg-orange-600 transition-colors text-xs font-medium"
                                title="Edit User"
                              >
                                <Edit className="w-3 h-3 mr-1" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(item)}
                                className="inline-flex items-center px-3 py-1.5 bg-red-500 text-white hover:bg-red-600 transition-colors text-xs font-medium"
                                title="Delete User"
                                disabled={item.accountStatus === 'inactive'}
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
              <div className="bg-white shadow-lg p-8 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No users found.</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your search criteria.</p>
              </div>
            )}

            {/* Pagination Section */}
            {mappedData.length > 0 && (
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

export default AllUserData;