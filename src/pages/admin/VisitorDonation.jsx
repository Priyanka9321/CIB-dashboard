import React, { useState } from 'react';

const VisitorDonation = () => {
  const initialData = [
    { srNo: 1, receiptNo: "VD/RCP-406", name: "Rajkumar", email: "wingosoft@gmail.com", mobile: "1234567890", transactionId: "684a93c56563a4a", donationType: "Visitor", amount: "₹ 1100", paymentMode: "Online" },
    { srNo: 2, receiptNo: "VD/RCP-405", name: "Rajkumar", email: "wingosoft@gmail.com", mobile: "1112223334", transactionId: "684a821ab9562b", donationType: "Visitor", amount: "₹ 101", paymentMode: "Online" },
    { srNo: 3, receiptNo: "VD/RCP-403", name: "BISHAL CHANDA", email: "vikichanda@yahoo.co.in", mobile: "7399278643", transactionId: "684a7e93db2b7c", donationType: "Visitor", amount: "₹ 1000", paymentMode: "Online" },
    { srNo: 4, receiptNo: "VD/RCP-401", name: "Rajkumar Maurya", email: "mourya.rajkumar25@gmail.com", mobile: "9140724426", transactionId: "684a7cd7752e52", donationType: "Visitor", amount: "₹ 1100", paymentMode: "Online" },
    { srNo: 5, receiptNo: "VD/RCP-393", name: "UTTAM KUMAR PANIGRAHI", email: "uttamkus@gmail.com", mobile: "8249975054", transactionId: "684a1720c7b4db", donationType: "Visitor", amount: "₹ 10", paymentMode: "Online" },
    { srNo: 6, receiptNo: "VD/RCP-391", name: "Cgg", email: "Vhh", mobile: "9470291120", transactionId: "683e8be1e5bc6", donationType: "Visitor", amount: "₹ 2", paymentMode: "Online" },
    { srNo: 7, receiptNo: "VD/RCP-390", name: "Satya prakash", email: "satyainfoweb@gmail.com", mobile: "8249928121", transactionId: "683d888b61a8ea", donationType: "Visitor", amount: "₹ 80000", paymentMode: "Online" },
    { srNo: 8, receiptNo: "VD/RCP-388", name: "Satya prakash", email: "satyainfoweb@gmail.com", mobile: "8249928121", transactionId: "683d887b6d50e6", donationType: "Visitor", amount: "₹ 400", paymentMode: "Online" },
  ];

  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = initialData.filter(
      (item) =>
        item.receiptNo.toLowerCase().includes(term) ||
        item.name.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term)
    );
    setData(filtered);
    setCurrentPage(1);
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleDelete = (item) => {
    const updatedData = data.filter((dataItem) => dataItem.srNo !== item.srNo);
    setData(updatedData);
  };

  const totalEntries = data.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="p-4 max-w-full mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <select
            value={entriesPerPage}
            onChange={handleEntriesChange}
            className="border border-gray-300 rounded p-1 text-sm bg-white"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="ml-2 text-sm text-gray-600">entries per page</span>
        </div>
        <h2 className="text-lg font-bold text-gray-800">All Visitor Donation</h2>
        <div className="flex items-center">
          <label className="mr-2 text-sm text-gray-600">Search:</label>
          <input
            type="text"
            placeholder="Enter as Id No. Name Email Id"
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded p-1 text-sm w-48"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Sr No</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Receipt No</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Name / Email / Mobile</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Transaction Id</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Donation Type</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Amount</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Payment MODE</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Details</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Download</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={item.srNo}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-2 text-sm text-gray-600">{item.srNo}</td>
                <td className="p-2 text-sm text-gray-600">{item.receiptNo}</td>
                <td className="p-2 text-sm text-gray-600">
                  {item.name} / {item.email} / {item.mobile}
                </td>
                <td className="p-2 text-sm text-gray-600">{item.transactionId}</td>
                <td className="p-2 text-sm text-gray-600">{item.donationType}</td>
                <td className="p-2 text-sm text-gray-600">{item.amount}</td>
                <td className="p-2 text-sm text-gray-600">{item.paymentMode}</td>
                <td className="p-2 text-sm">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    View
                  </button>
                </td>
                <td className="p-2 text-sm">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    Download
                  </button>
                </td>
                <td className="p-2 text-sm">
                  <button
                    onClick={() => handleDelete(item)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisitorDonation;