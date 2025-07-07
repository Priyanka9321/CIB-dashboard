import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const AdminReceipt = () => {
  const receiptRef = useRef(null);
  const { state } = useLocation();

  // 🧪 MOCK DATA (Replace later with backend API response)
  const receiptData = state || {
    // fallback mock data if no state is passed
    receiptNo: "M/RCP-108",
    amount: 100,
    transactionId: "TXN123456789",
    status: "PAYMENT_SUCCESS",
    date: "05-07-2025",
    receivedFrom: "Govind",
    rupeesInWords: "One Hundred Rupees",
    address: "Surat, Gujrat",
    qrData: "M/RCP-108",
    signatory: {
      name: "Rajkumar Maurya Maurya",
      role: "President / Founder",
      org: "Shri Ram Navyug Trust",
      title: "Authorised Signatory",
    },
  };

  const handleDownload = async () => {
    const canvas = await html2canvas(receiptRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // A4 size
    pdf.save("membership_receipt.pdf");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-10">
      <div
        ref={receiptRef}
        className="w-full max-w-3xl border shadow-xl rounded-md overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-green-700 p-4 text-white">
          <img src="/logo.png" alt="Logo" className="w-16 h-16" />
          <div className="text-center">
            <h1 className="text-2xl font-bold">Shri Ram Navyug Trust</h1>
            <p className="text-sm">Transforming Lives Through Education</p>
            <p className="text-xs">
              NGO ID:MH/2021/0277920 | Ekta Nagar PGI Lucknow
            </p>
          </div>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${receiptData.qrData}`}
            alt="QR"
            className="w-16 h-16"
          />
        </div>

        {/* Title */}
        <div className="bg-green-800 text-white text-center py-2 text-sm font-bold">
          Membership Fee Receipt
        </div>

        {/* Table */}
        <table className="w-full text-sm">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="border px-2 py-1">Receipt No</th>
              <th className="border px-2 py-1">Amount</th>
              <th className="border px-2 py-1">Transaction ID</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">{receiptData.receiptNo}</td>
              <td className="border px-2 py-1">{receiptData.amount}</td>
              <td className="border px-2 py-1">{receiptData.transactionId}</td>
              <td className="border px-2 py-1">{receiptData.status}</td>
              <td className="border px-2 py-1">{receiptData.date}</td>
            </tr>
          </tbody>
        </table>

        {/* Received Info */}
        <div className="p-4 space-y-1 text-sm">
          <p>
            <span className="font-semibold">Received From:</span>{" "}
            {receiptData.receivedFrom}
          </p>
          <p>
            <span className="font-semibold">Rupees (in words):</span>{" "}
            {receiptData.rupeesInWords}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {receiptData.address}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end p-4 text-sm">
          <div className="italic font-semibold">
            Thank You For Your Generous Contribution
          </div>
          <div className="text-right text-xs">
            <img
              src="/signature.png"
              alt="Sign"
              className="w-20 h-10 object-contain"
            />
            <p className="font-bold">{receiptData.signatory.name}</p>
            <p>({receiptData.signatory.role})</p>
            <p>{receiptData.signatory.org}</p>
            <p>{receiptData.signatory.title}</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-green-700 text-white text-xs flex justify-center items-center gap-4 p-2">
          <span>📞 +91 85648 53303</span>
          <span>📧 info@shriramnavyugtrust.org</span>
          <span>🌐 www.shriramnavyugtrust.org</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleDownload}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded shadow"
        >
          Download
        </button>
        <button
          onClick={() => window.history.back()}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded shadow"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default AdminReceipt;
