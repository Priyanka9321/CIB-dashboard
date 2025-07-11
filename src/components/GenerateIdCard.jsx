// import React, { useState } from "react";
// import {
//   User,
//   Phone,
//   Mail,
//   MapPin,
//   Calendar,
//   Download,
//   QrCode,
//   IdCard,
//   Camera,
//   Edit3,
//   Save,
// } from "lucide-react";

// const GenerateIdCard = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [userInfo, setUserInfo] = useState({
//     name: "Vaithi जी",
//     idNo: "MBR-17",
//     mobNo: "1234567890",
//     email: "anushkawinggosoft@gmail.com",
//     city: "Lucknow",
//     joiningDate: "26-12-2024",
//     validityDate: "26-12-2025",
//   });

//   const handleInputChange = (field, value) => {
//     setUserInfo((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     // Here you would typically save to backend
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="max-w-6xl mx-auto p-6">

//         {/* ID Card Section */}
//         <div className="bg-white border-2 border-gray-800 rounded-xl p-4 my-5 text-black shadow-md w-full max-w-md mx-auto">
//           {/* Header */}
//           <div className="text-center">
//             <div className="flex justify-between items-center border-b border-gray-300 pb-1">
//               <img
//                 src="https://i.ibb.co/xspj7ZG/cib-logo.png"
//                 alt="CIB Logo"
//                 className="w-12 h-12 object-contain"
//               />
//               <div className="flex-1 text-center">
//                 <h1 className="text-3xl font-extrabold text-red-600">CIB</h1>
//                 <p className="text-xs font-semibold text-blue-800 -mt-1">
//                   CRIME INVESTIGATION BUREAU
//                 </p>
//                 <p className="text-[10px] text-gray-600">
//                   (An ISO 9001:2015 Certified Organization)
//                 </p>
//               </div>
//             </div>
//             <div className="bg-red-600 text-white font-bold py-1 mt-1 rounded-sm text-sm">
//               IDENTITY CARD
//             </div>
//           </div>

//           {/* Photo & QR Code */}
//           <div className="flex justify-between items-start mt-4">
//             {/* Profile Photo */}
//             <img
//               src="https://via.placeholder.com/120x150"
//               alt="Profile"
//               className="w-[90px] h-[110px] object-cover border border-black rounded-sm"
//             />
//             {/* QR Code */}
//             <img
//               src="https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=CIB002"
//               alt="QR Code"
//               className="w-20 h-20 object-cover"
//             />
//           </div>

//           {/* Info Table */}
//           <div className="mt-4 text-[13px] font-medium">
//             <div className="flex justify-between">
//               <span>Name</span>
//               <span className="font-bold">: Farha Naz Anjum</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Designation</span>
//               <span className="font-bold text-right">
//                 : State Director (Telangana)
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>Division</span>
//               <span className="font-bold">: Social Crime Division</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Work</span>
//               <span className="font-bold">: Telangana (A.P.)</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Valid Till</span>
//               <span className="font-bold">: 31st Dec. 2026</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Unique Id</span>
//               <span className="font-bold">: CIB002</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Blood Group</span>
//               <span className="font-bold">: B+ve</span>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="mt-4 text-[11px] font-semibold space-y-[2px]">
//             <div className="bg-orange-600 text-white px-2 py-[2px] rounded-sm">
//               ● NGO Registration Under Indian Trust Act.
//             </div>
//             <div className="bg-red-600 text-white px-2 py-[2px] rounded-sm">
//               ● Registration by NITI Aayog under NGO Darpan
//             </div>
//             <div className="bg-blue-600 text-white px-2 py-[2px] rounded-sm">
//               ● Registration by Ministry of MSME under UDYAM
//             </div>
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white rounded-2xl p-6 shadow-lg">
//             <div className="flex items-center gap-4">
//               <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl">
//                 <User className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Profile</h3>
//                 <p className="text-gray-600">Member since 2024</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl p-6 shadow-lg">
//             <div className="flex items-center gap-4">
//               <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl">
//                 <IdCard className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   ID Status
//                 </h3>
//                 <p className="text-green-600 font-medium">Active</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl p-6 shadow-lg">
//             <div className="flex items-center gap-4">
//               <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl">
//                 <Calendar className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Validity
//                 </h3>
//                 <p className="text-gray-600">Until 2025</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GenerateIdCard;

// updated by sumit 

import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import { Download } from "lucide-react";

const GenerateIdCard = () => {
  const location = useLocation();
  const passedMember = location.state;
  const [userInfo, setUserInfo] = useState(passedMember || null);
  const [qrImage, setQrImage] = useState(null);
  const cardRef = useRef(null);

  // Fetch user info
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!passedMember) {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No token found. Please login again.");

          const res = await axios.get("http://localhost:5000/api/v1/idcard/my-idcard", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserInfo(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch ID card:", err);
        alert("Failed to load ID card. Please try logging in again.");
      }
    };

    fetchData();
  }, [passedMember]);

  // Generate QR
  useEffect(() => {
    if (userInfo?.uniqueId) {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${userInfo.uniqueId}`;
      setQrImage(qrUrl);
    }
  }, [userInfo]);

  // Handle PDF generation + upload
  const handleDownloadAndUploadPDF = async () => {
    try {
      if (!cardRef.current) return;

      const canvas = await html2canvas(cardRef.current);
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = (canvas.height * pageWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight);

      const fileName = `${userInfo?.uniqueId || "id_card"}.pdf`;
      pdf.save(fileName);

      const pdfBlob = pdf.output("blob");
      const formData = new FormData();
      formData.append("idCardPdf", pdfBlob, fileName);

      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token missing.");

      await axios.post("http://localhost:5000/api/v1/idcard/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("ID card uploaded to server successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
      if (error.response?.status === 401) {
        alert("Session expired or unauthorized. Please login again.");
      } else {
        alert("Failed to upload ID card. Please try again.");
      }
    }
  };

  if (!userInfo)
    return <p style={{ textAlign: "center", color: "#6b7280" }}>Loading ID card...</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 16px" }}>
      {/* ID Card */}
      <div ref={cardRef} style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        width: "90vw",
        maxWidth: "350px"
      }}>
        <div style={{ height: "8px", background: "linear-gradient(to right, #dc2626, #2563eb)" }} />

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "center", padding: "16px", borderBottom: "2px solid #e5e7eb" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "80px", height: "80px", overflow: "hidden" }}>
              <img src="/favicon.ico" alt="CIB Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "3.5rem", fontWeight: "900", color: "#dc2626", letterSpacing: "0.6em" }}>CIB</h1>
              <p style={{ fontSize: "12px", fontWeight: "700", color: "#1e3a8a", marginRight: "2rem" }}>CRIME INVESTIGATION BUREAU</p>
              <p style={{ fontSize: "9px", color: "#6b7280", marginRight: "2rem" }}>(An ISO 9001:2015 Certified Organization)</p>
            </div>
          </div>
        </div>

        {/* ID Title */}
        <div style={{ backgroundColor: "#dc2626", color: "#ffffff", textAlign: "center", padding: "8px 0" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: "bold" }}>IDENTITY CARD</h2>
        </div>

        {/* Photo + QR */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "16px" }}>
          <div style={{ border: "2px solid black" }}>
            <img src={userInfo.photo} alt="Profile" style={{ width: "96px", height: "128px", objectFit: "cover" }} />
          </div>
          <div style={{ border: "1px solid black" }}>
            {qrImage ? (
              <img src={qrImage} alt="QR Code" style={{ width: "80px", height: "80px" }} />
            ) : (
              <p style={{ fontSize: "12px", padding: "4px" }}>Loading QR...</p>
            )}
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "0 16px 16px", fontSize: "14px" }}>
          {["name", "designation", "division", "work", "validTill", "uniqueId", "bloodGroup"].map((key) => (
            <div style={{ display: "flex" }} key={key}>
              <span style={{ width: "96px", fontWeight: "500", textTransform: "capitalize" }}>
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <span>: {userInfo[key] || "N/A"}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          background: "linear-gradient(to bottom right, #dc2626, #2563eb)",
          padding: "0 16px 16px",
          fontSize: "12px",
          fontWeight: "500",
          color: "#ffffff"
        }}>
          <div style={{ padding: "8px 12px" }}>● NGO Registration Under Indian Trust Act.</div>
          <div style={{ padding: "8px 12px" }}>● Registration by NITI Aayog under NGO Darpan</div>
          <div style={{ padding: "8px 12px" }}>● Registration by Ministry of MSME under UDYAM</div>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={handleDownloadAndUploadPDF}
        style={{
          marginTop: "16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "#10b981",
          color: "#ffffff",
          padding: "8px 16px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          cursor: "pointer",
          border: "none",
          transition: "background-color 0.3s ease"
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#047857")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#10b981")}
      >
        <Download size={18} /> Download
      </button>
    </div>
  );
};

export default GenerateIdCard;






