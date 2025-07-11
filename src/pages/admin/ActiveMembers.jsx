// import React, { useState } from "react";

// const ActiveMembers = () => {
//   const initialData = [
//     {
//       srNo: 1,
//       regNo: "MBR-512",
//       name: "zoro",
//       email: "sumit@gmail.com",
//       mobile: "9810867106",
//       regDate: "14-06-2025",
//     },
//     {
//       srNo: 2,
//       regNo: "MBR-510",
//       name: "XYZ",
//       email: "harshitsh66l1@gmail.com",
//       mobile: "7878439974",
//       regDate: "14-06-2025",
//     },
//     ...Array.from({ length: 338 }, (_, i) => ({
//       srNo: i + 3,
//       regNo: `MBR-${509 - i}`,
//       name: `User ${i + 3}`,
//       email: `user${i + 3}@example.com`,
//       mobile: `900000${i + 3}`,
//       regDate: "01-06-2025",
//     })),
//   ];

//   const [data, setData] = useState(initialData);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);
//     const filtered = initialData.filter(
//       (item) =>
//         item.regNo.toLowerCase().includes(term) ||
//         item.name.toLowerCase().includes(term) ||
//         item.email.toLowerCase().includes(term)
//     );
//     setData(filtered);
//     setCurrentPage(1);
//   };

//   const handleEntriesChange = (e) => {
//     setEntriesPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const handleClick = (action, member) => {
//     alert(`${action} clicked for ${member.name}`);
//   };

//   const totalEntries = data.length;
//   const totalPages = Math.ceil(totalEntries / entriesPerPage);
//   const startIndex = (currentPage - 1) * entriesPerPage;
//   const endIndex = startIndex + entriesPerPage;
//   const currentData = data.slice(startIndex, endIndex);

//   return (
//     <div className="p-2 max-w-full mx-auto">
//       <div className="flex justify-between items-center mb-3">
//         <div className="flex items-center">
//           <select
//             value={entriesPerPage}
//             onChange={handleEntriesChange}
//             className="border border-gray-300 rounded p-1 text-xs"
//           >
//             <option value={10}>10</option>
//             <option value={25}>25</option>
//             <option value={50}>50</option>
//             <option value={100}>100</option>
//           </select>
//           <span className="ml-2 text-xs text-gray-600">entries per page</span>
//         </div>
//         <h2 className="text-lg font-bold cursor-pointer" onClick={() => alert("Header clicked")}>Active Member Data</h2>
//         <div className="flex items-center">
//           <label className="mr-2 text-xs text-gray-600">Search:</label>
//           <input
//             type="text"
//             placeholder="Enter as Id No. Name Email Id"
//             value={searchTerm}
//             onChange={handleSearch}
//             className="border border-gray-300 rounded p-1 text-xs w-48"
//           />
//         </div>
//       </div>

//       <div>
//         <table className="w-full border-collapse bg-gray-50 table-fixed">
//           <thead className="bg-gray-200">
//             <tr>
//               {['Sr.No.', 'Reg.No / NAME / EMAIL / Mobile', 'Reg-Date', 'View', 'Action', 'Edit/Delete'].map((col, idx) => (
//                 <th
//                   key={idx}
//                   onClick={() => alert(`Header: ${col}`)}
//                   className={`p-1 text-left text-xs font-semibold cursor-pointer ${idx === 0 ? 'w-[5%]' : idx === 5 ? 'w-[10%]' : idx === 4 ? 'w-[15%]' : 'w-[30%]'}`}
//                 >
//                   {col}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {currentData.map((item, index) => (
//               <tr
//                 key={item.srNo}
//                 className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
//               >
//                 <td className="p-1 text-xs truncate">{item.srNo}</td>
//                 <td className="p-1 text-xs truncate">
//                   {item.regNo} / {item.name} / {item.email} / {item.mobile}
//                 </td>
//                 <td className="p-1 text-xs truncate">{item.regDate}</td>
//                 <td className="p-1 text-xs flex gap-1">
//                   {['View', 'Appt. Letter', 'ID Card', 'Receipt'].map((label) => (
//                     <button
//                       key={label}
//                       onClick={() => handleClick(label, item)}
//                       className="bg-green-500 text-white px-2 py-0.5 rounded hover:bg-green-600 text-xs"
//                     >
//                       {label}
//                     </button>
//                   ))}
//                 </td>
//                 <td className="p-1 text-xs flex gap-1">
//                   {['Deactivate', 'Block'].map((label) => (
//                     <button
//                       key={label}
//                       onClick={() => handleClick(label, item)}
//                       className="bg-red-500 text-white px-2 py-0.5 rounded hover:bg-red-600 text-xs"
//                     >
//                       {label}
//                     </button>
//                   ))}
//                 </td>
//                 <td className="p-1 text-xs  gap-1">
//                   <button
//                     onClick={() => handleClick('Edit', item)}
//                     className="text-blue-500 hover:text-blue-700 text-sm"
//                   >
//                     ✏️
//                   </button>
//                   <button
//                     onClick={() => handleClick('Delete', item)}
//                     className="text-red-500 hover:text-red-700 text-sm"
//                   >
//                     🗑️
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-center items-center mt-3 gap-2">
//         <span className="text-xs text-gray-600">
//           Showing {startIndex + 1} to {endIndex > totalEntries ? totalEntries : endIndex} of {totalEntries} entries
//         </span>
//         <button
//           onClick={() => setCurrentPage(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-2 py-0.5 border rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Previous
//         </button>
//         <button className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs">
//           {currentPage}
//         </button>
//         <button
//           onClick={() => setCurrentPage(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-2 py-0.5 border rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ActiveMembers;

// updated by sumit

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  Users,
  Filter,
  FileText,
  CreditCard,
  Receipt,
  UserX,
  Shield,
} from "lucide-react";

const API_BASE = "http://localhost:5000/api/v1/members";

const ActiveMembers = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showBlockPopup, setShowBlockPopup] = useState(false);
  const [blockReason, setBlockReason] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${API_BASE}`);
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      fetchMembers();
      return;
    }

    try {
      const res = await axios.get(`${API_BASE}/search?query=${term}`);
      setData(res.data);
      setCurrentPage(1);
    } catch (err) {
      console.error("Search error:", err.message);
    }
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleClick = async (action, member) => {
    const id = member.userId;
    try {
      switch (action) {
        case "View":
          const mapped = {
            userId: member.userId,
            name: member.fullName,
            email: member.userEmail,
            mobile: member.userMobile,
            regNo: member.regNo,
            regDate: member.regDate,
            accountStatus: member.status,
            fatherName: member.fatherName || "",
            designation: member.designation || "",
            dateOfBirth: member.dateOfBirth || "",
            aadharCardNo: member.aadharCardNo || "",
            address: member.address || "",
            city: member.city || "",
            occupation: member.occupation || "",
            userType: member.userType || "",
            verifiedBy: member.verifiedBy || "",
            userProfile: member.userProfile || "",
          };
          navigate("/admin/member-details", { state: { member: mapped } });
          break;

        case "Appt. Letter":
          navigate("/admin/appointment-letter", {
            state: {
              name: member.fullName,
              fatherName: member.fatherName,
              imageUrl:
                member.userProfile || "https://via.placeholder.com/120x150",
              uniqueId: member.regNo,
              validUpto: member.validUpto || "N/A",
            },
          });
          break;

        case "ID Card":
          navigate("/admin/id-card", {
            state: {
              name: member.fullName,
              photo: member.userProfile,
              uniqueId: member.regNo,
              designation: member.designation,
              division: member.city,
              work: member.occupation,
              validTill: member.validUpto,
              bloodGroup: member.bloodGroup || "N/A",
            },
          });
          break;

        case "Receipt":
          navigate("/admin/membership-receipt", {
            state: {
              receiptNo: member.receiptNo || "M/RCP-108",
              amount: member.amount || 100,
              transactionId: member.transactionId || "TXN123456789",
              status: member.paymentStatus || "PAYMENT_SUCCESS",
              date:
                member.paymentDate || new Date().toISOString().split("T")[0],
              receivedFrom: member.fullName,
              rupeesInWords: "One Hundred Rupees",
              address: member.city
                ? `${member.city}, ${member.state || ""}`
                : "N/A",
              qrData: member.regNo || "M/RCP-108",
              signatory: {
                name: "Rajkumar Maurya Maurya",
                role: "President / Founder",
                org: "Shri Ram Navyug Trust",
                title: "Authorised Signatory",
              },
            },
          });
          break;

        case "Deactivate":
          const confirmToggle = window.confirm(
            `Are you sure you want to deactivate ${member.fullName}?`
          );
          if (!confirmToggle) return;

          try {
            await axios.patch(`${API_BASE}/${id}/deactivate`);
            setData((prev) => prev.filter((user) => user.userId !== id));
          } catch (err) {
            console.error("Deactivation failed:", err.message);
          }
          break;

        case "Block":
          if (member.status === "blocked") return;
          setSelectedMember(member);
          setShowBlockPopup(true);
          break;

        case "Edit":
          const editMapped = {
            userId: member.userId,
            name: member.fullName,
            email: member.userEmail,
            mobile: member.userMobile,
            regNo: member.regNo,
            regDate: member.regDate,
            accountStatus: member.status,
            fatherName: member.fatherName || "",
            designation: member.designation || "",
            dateOfBirth: member.dateOfBirth || "",
            aadharCardNo: member.aadharCardNo || "",
            address: member.address || "",
            city: member.city || "",
            occupation: member.occupation || "",
            userType: member.userType || "",
            verifiedBy: member.verifiedBy || "",
            userProfile: member.userProfile || "",
          };
          navigate("/admin/member-details", {
            state: { member: editMapped, mode: "edit" },
          });
          break;

        case "Delete":
          const confirmDelete = window.confirm(
            `Are you sure you want to delete ${member.fullName}?`
          );
          if (!confirmDelete) return;

          await axios.patch(`${API_BASE}/${id}/delete`);
          await fetchMembers();
          return;

        default:
          return;
      }
    } catch (err) {
      console.error(`${action} failed:`, err.message);
    }
  };

  const totalEntries = data.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white shadow-lg p-6 mb-8 border-l-4 border-blue-500">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Active Members
                </h1>
                <p className="text-gray-600 text-sm">
                  Manage and view all active member records
                </p>
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
                  placeholder="Search by Reg No, Name, Email, Mobile..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 pr-4 py-2 border border-gray-300 text-sm w-72 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white shadow-lg p-6 text-center">
            <p className="text-gray-600">Loading members...</p>
          </div>
        )}

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
                    <th className="px-3 py-3 text-left text-sm font-semibold">
                      Sr. No.
                    </th>
                    <th className="px-3 py-3 text-left text-sm font-semibold">
                      Reg.No / NAME / EMAIL / Mobile
                    </th>
                    <th className="px-3 py-3 text-left text-sm font-semibold">
                      Reg. Date
                    </th>
                    <th className="px-3 py-3 text-center text-sm font-semibold">
                      View Actions
                    </th>
                    <th className="px-3 py-3 text-center text-sm font-semibold">
                      Account Actions
                    </th>
                    <th className="px-3 py-3 text-center text-sm font-semibold">
                      Edit/Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentData.map((item, index) => (
                    <tr
                      key={item.userId || item.regNo || index}
                      className={`hover:bg-blue-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-3 py-3 text-sm font-medium text-gray-900">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-3 py-3 text-sm">
                        <div className="space-y-1">
                          <div className="text-blue-600 font-medium">
                            {item.regNo}
                          </div>
                          <div className="font-medium text-gray-900">
                            {item.fullName}
                          </div>
                          <div className="text-gray-600">{item.userEmail}</div>
                          <div className="text-gray-600">{item.userMobile}</div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-600">
                        {item.regDate
                          ? new Date(item.regDate).toLocaleDateString("en-IN")
                          : "N/A"}
                      </td>
                      <td className="px-3 py-3 text-sm">
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                          <button
                            onClick={() => handleClick("View", item)}
                            className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white hover:bg-blue-600 transition-colors text-xs font-medium"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </button>
                          <button
                            onClick={() => handleClick("Appt. Letter", item)}
                            className="inline-flex items-center px-3 py-1.5 bg-green-500 text-white hover:bg-green-600 transition-colors text-xs font-medium"
                          >
                            <FileText className="w-3 h-3 mr-1" />
                            Letter
                          </button>
                          <button
                            onClick={() => handleClick("ID Card", item)}
                            className="inline-flex items-center px-3 py-1.5 bg-purple-500 text-white hover:bg-purple-600 transition-colors text-xs font-medium"
                          >
                            <CreditCard className="w-3 h-3 mr-1" />
                            ID Card
                          </button>
                          <button
                            onClick={() => handleClick("Receipt", item)}
                            className="inline-flex items-center px-3 py-1.5 bg-indigo-500 text-white hover:bg-indigo-600 transition-colors text-xs font-medium"
                          >
                            <Receipt className="w-3 h-3 mr-1" />
                            Receipt
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleClick("Deactivate", item)}
                            className="inline-flex items-center px-3 py-1.5 bg-red-500 text-white hover:bg-red-600 transition-colors text-xs font-medium"
                          >
                            <UserX className="w-3 h-3 mr-1" />
                            Deactivate
                          </button>
                          <button
                            onClick={() => handleClick("Block", item)}
                            className={`inline-flex items-center px-3 py-1.5 transition-colors text-xs font-medium ${
                              item.accountStatus === "blocked"
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-yellow-500 text-white hover:bg-yellow-600"
                            }`}
                            disabled={item.accountStatus === "blocked"}
                          >
                            <Shield className="w-3 h-3 mr-1" />
                            {item.accountStatus === "blocked"
                              ? "Blocked"
                              : "Block"}
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleClick("Edit", item)}
                            className="inline-flex items-center px-3 py-1.5 bg-yellow-500 text-white hover:bg-yellow-600 transition-colors text-xs font-medium"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleClick("Delete", item)}
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
          !loading && (
            <div className="bg-white shadow-lg p-6 text-center">
              <p className="text-gray-600">No active members found.</p>
            </div>
          )
        )}

        {/* Pagination Section */}
        {currentData.length > 0 && (
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
                      {currentPage > 4 && (
                        <span className="px-2 text-gray-500">...</span>
                      )}
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
                  {currentPage < totalPages - 2 && (
                    <>
                      {currentPage < totalPages - 3 && (
                        <span className="px-2 text-gray-500">...</span>
                      )}
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

        {showBlockPopup && (
          <div className="fixed inset-0 z-50  bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">Block Reason</h2>
              <textarea
                rows={4}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter reason here..."
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
              ></textarea>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowBlockPopup(false);
                    setBlockReason("");
                    setSelectedMember(null);
                  }}
                  className="px-4 py-2 text-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    try {
                      await axios.patch(
                        `${API_BASE}/${selectedMember.userId}/block`,
                        {
                          reason: blockReason,
                        }
                      );
                      setData((prev) =>
                        prev.map((user) =>
                          user.userId === selectedMember.userId
                            ? { ...user, accountStatus: "blocked" }
                            : user
                        )
                      );
                      setShowBlockPopup(false);
                      setBlockReason("");
                      setSelectedMember(null);
                    } catch (err) {
                      console.error("Block failed:", err.message);
                      alert("Block failed: " + err.message);
                    }
                  }}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Confirm Block
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveMembers;
