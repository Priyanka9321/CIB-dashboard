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
const API_BASE = "http://localhost:5000/api/v1/members";

const ActiveMembers = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
              rupeesInWords: "One Hundred Rupees", // Optionally calculate this
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

            // ✅ Remove user from UI after successful deactivation
            setData((prev) => prev.filter((user) => user.userId !== id));
          } catch (err) {
            console.error("Deactivation failed:", err.message);
          }
          break;

        case "Block":
          if (member.status === "blocked") return;

          const confirmBlock = window.confirm(
            `Are you sure you want to block ${member.fullName}?`
          );
          if (!confirmBlock) return;

          try {
            await axios.patch(`${API_BASE}/${id}/block`);

            // ✅ Remove from current UI
            setData((prev) => prev.filter((user) => user.userId !== id));
          } catch (err) {
            console.error("Block failed:", err.message);
          }
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
          console.log("Delete successful");

          // Option 1: Remove from UI directly
          // setData((prev) => prev.filter((user) => user.userId !== id));

          // Option 2: Better UX — re-fetch from DB to get accurate count
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
    <div className="p-2 max-w-full mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <select
            value={entriesPerPage}
            onChange={handleEntriesChange}
            className="border border-gray-300 rounded p-1 text-xs"
          >
            {[10, 25, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <span className="ml-2 text-xs text-gray-600">entries per page</span>
        </div>
        <h2 className="text-lg font-bold">Active Member Data</h2>
        <div className="flex items-center">
          <label className="mr-2 text-xs text-gray-600">Search:</label>
          <input
            type="text"
            placeholder="Enter Reg No, Name or Email"
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded p-1 text-xs w-48"
          />
        </div>
      </div>

      {/* Loading/Error */}
      {loading && (
        <p className="text-center text-sm text-gray-500">Loading members...</p>
      )}
      {error && <p className="text-center text-sm text-red-500">{error}</p>}

      {/* Table */}
      <table className="w-full border-collapse bg-gray-50 table-fixed">
        <thead className="bg-gray-200">
          <tr>
            {[
              "Sr.No.",
              "Reg.No / NAME / EMAIL / Mobile",
              "Reg-Date",
              "View",
              "Action",
              "Edit/Delete",
            ].map((col, idx) => (
              <th
                key={idx}
                className={`p-1 text-left text-xs font-semibold ${
                  idx === 0
                    ? "w-[5%]"
                    : idx === 5
                    ? "w-[10%]"
                    : idx === 4
                    ? "w-[15%]"
                    : "w-[30%]"
                }`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr
              key={item.userId || item.regNo || index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="p-1 text-xs truncate">{startIndex + index + 1}</td>
              <td className="p-1 text-xs truncate">
                {item.regNo} / {item.fullName} / {item.userEmail} /{" "}
                {item.userMobile}
                <span
                  className={`ml-1 inline-block px-2 py-0.5 text-xs rounded ${
                    item.accountStatus === "active"
                      ? "bg-green-100 text-green-700"
                      : item.accountStatus === "blocked"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.accountStatus}
                </span>
              </td>
              <td className="p-1 text-xs truncate">
                {item.regDate
                  ? new Date(item.regDate).toLocaleDateString("en-IN")
                  : "N/A"}
              </td>
              <td className="p-1 text-xs flex gap-1 flex-wrap">
                {["View", "Appt. Letter", "ID Card", "Receipt"].map((label) => (
                  <button
                    key={label}
                    onClick={() => handleClick(label, item)}
                    className="bg-green-500 text-white px-2 py-0.5 rounded hover:bg-green-600 text-xs"
                  >
                    {label}
                  </button>
                ))}
              </td>
              <td className="p-1 text-xs gap-1">
                <button
                  onClick={() => handleClick("Deactivate", item)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-0.5 rounded text-xs"
                >
                  Deactivate
                </button>

                <button
                  onClick={() => handleClick("Block", item)}
                  className={`${
                    item.accountStatus === "blocked"
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-yellow-500 hover:bg-yellow-600 text-white"
                  } px-2 py-0.5 rounded text-xs ml-1`}
                  disabled={item.accountStatus === "blocked"}
                >
                  {item.accountStatus === "blocked" ? "Blocked" : "Block"}
                </button>
              </td>

              <td className="p-1 text-xs gap-1">
                <button
                  onClick={() => handleClick("Edit", item)}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleClick("Delete", item)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-3 gap-2">
        <span className="text-xs text-gray-600">
          Showing {startIndex + 1} to{" "}
          {endIndex > totalEntries ? totalEntries : endIndex} of {totalEntries}{" "}
          entries
        </span>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-0.5 border rounded text-xs disabled:opacity-50"
        >
          Previous
        </button>
        <button className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs">
          {currentPage}
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-0.5 border rounded text-xs disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ActiveMembers;
