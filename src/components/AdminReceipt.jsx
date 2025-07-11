import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";

const AdminReceipt = () => {
  const receiptRef = useRef(null);
  const { state } = useLocation();
  const [receiptData, setReceiptData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const txnId = state?.transactionId;
    if (!txnId) {
      setLoading(false);
      setReceiptData(null);
      return;
    }

    axios
      .get(`/api/payments/receipt/${txnId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setReceiptData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch receipt data", err);
        setLoading(false);
      });
  }, [state]);

  const handleDownload = async () => {
  if (!receiptRef.current) return;

  const canvas = await html2canvas(receiptRef.current);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("membership_receipt.pdf");
};


  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        Loading receipt data...
      </div>
    );
  }

  if (!receiptData) {
    return (
      <div className="text-center mt-20 text-red-500 text-lg">
        Error: Receipt not found or failed to load.
      </div>
    );
  }

  const signatory = {
    name: receiptData.signatoryName || "Rajkumar Maurya",
    role: "President / Founder",
    org: "Shri Ram Navyug Trust",
    title: "Authorised Signatory",
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-10">
      <div
        ref={receiptRef}
        className="w-full max-w-3xl border shadow-xl rounded-md overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-green-700 p-4 text-white">
          <img
            src="/logo.png"
            alt="Logo"
            onError={(e) => (e.target.style.display = "none")}
          />
          <div className="text-center">
            <h1 className="text-2xl font-bold">Crime Investigation Bureau</h1>
            <p className="text-sm">Transforming Lives Through Education</p>
            <p className="text-xs">
              NGO ID: MH/2021/0277920 | Ekta Nagar PGI Lucknow
            </p>
          </div>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${
              receiptData.qrData || receiptData.transactionId
            }`}
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
              <td className="border px-2 py-1">
                {receiptData.receiptNo || "N/A"}
              </td>
              <td className="border px-2 py-1">
                {receiptData.amount
                  ? `₹${parseFloat(receiptData.amount).toFixed(2)}`
                  : "N/A"}
              </td>
              <td className="border px-2 py-1">
                {receiptData.transactionId || "N/A"}
              </td>
              <td className="border px-2 py-1">
                <span
                  className={`px-2 py-1 rounded-full text-white text-xs ${
                    receiptData.status === "PAID"
                      ? "bg-green-600"
                      : receiptData.status === "PENDING"
                      ? "bg-yellow-600"
                      : "bg-red-600"
                  }`}
                >
                  {receiptData.status || "UNKNOWN"}
                </span>
              </td>
              <td className="border px-2 py-1">
                {receiptData.createdAt
                  ? new Date(receiptData.createdAt).toLocaleDateString("en-IN")
                  : "N/A"}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Details */}
        <div className="p-4 space-y-1 text-sm leading-6">
          <p>
            <span className="font-semibold">Received From:</span>{" "}
            {receiptData.receivedFrom || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Rupees (in words):</span>{" "}
            {receiptData.rupeesInWords || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {receiptData.userEmail || "N/A"}
          </p>
          <p>
            <span className="font-semibold">User Mobile:</span>{" "}
            {receiptData.userMobile || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Mobile (Entered):</span>{" "}
            {receiptData.mobile || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Reg. No:</span>{" "}
            {receiptData.regNo || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Form Type:</span>{" "}
            {receiptData.formType || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Payment Method:</span>{" "}
            {receiptData.paymentMethod || "N/A"}
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
              alt="Signature"
              className="w-20 h-10 object-contain"
            />
            <p className="font-bold">{signatory.name}</p>
            <p>({signatory.role})</p>
            <p>{signatory.org}</p>
            <p>{signatory.title}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-green-700 text-white text-xs flex justify-center items-center gap-4 p-2">
          <span>📞 +91 85648 53303</span>
          <span>📧 info@shriramnavyugtrust.org</span>
          <span>🌐 www.shriramnavyugtrust.org</span>
        </div>
      </div>

      {/* Buttons */}
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
