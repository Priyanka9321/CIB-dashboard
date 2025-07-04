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

const API_BASE = "http://localhost:5000/api/v1/members";

const ActiveMembers = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${API_BASE}`);
      setData(res.data);
    } catch (err) {
      console.error("Fetch error:", err.message);
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
    const id = member.id;
    try {
      switch (action) {
        case "View":
          await axios.patch(`${API_BASE}/${id}/viewed`);
          break;
        case "Appt. Letter":
          alert(`Appt. Letter for ${member.name}`);
          break;
        case "ID Card":
          alert(`ID Card for ${member.name}`);
          break;
        case "Receipt":
          alert(`Receipt for ${member.name}`);
          break;
        case "Deactivate":
          await axios.patch(`${API_BASE}/${id}/deactivate`);
          break;
        case "Block":
          await axios.patch(`${API_BASE}/${id}/block`);
          break;
        case "Delete":
          await axios.patch(`${API_BASE}/${id}/delete`);
          break;
        case "Edit":
          alert(`Edit feature coming soon for ${member.name}`);
          break;
        default:
          return;
      }
      fetchMembers(); // refresh
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
            {[10, 25, 50, 100].map(n => (
              <option key={n} value={n}>{n}</option>
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

      {/* Table */}
      <table className="w-full border-collapse bg-gray-50 table-fixed">
        <thead className="bg-gray-200">
          <tr>
            {['Sr.No.', 'Reg.No / NAME / EMAIL / Mobile', 'Reg-Date', 'View', 'Action', 'Edit/Delete'].map((col, idx) => (
              <th
                key={idx}
                className={`p-1 text-left text-xs font-semibold ${idx === 0 ? 'w-[5%]' : idx === 5 ? 'w-[10%]' : idx === 4 ? 'w-[15%]' : 'w-[30%]'}`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr
              key={item.id}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="p-1 text-xs truncate">{startIndex + index + 1}</td>
              <td className="p-1 text-xs truncate">
                {item.reg_no} / {item.name} / {item.email} / {item.mobile}
              </td>
              <td className="p-1 text-xs truncate">
                {new Date(item.reg_date).toLocaleDateString("en-IN")}
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
              <td className="p-1 text-xs  gap-1">
                {["Deactivate", "Block"].map((label) => (
                  <button
                    key={label}
                    onClick={() => handleClick(label, item)}
                    className="bg-red-500 text-white px-2 py-0.5 rounded hover:bg-red-600 text-xs"
                  >
                    {label}
                  </button>
                ))}
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
          Showing {startIndex + 1} to {endIndex > totalEntries ? totalEntries : endIndex} of {totalEntries} entries
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
