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

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Printer } from "lucide-react";

const GenerateIdCard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [qrImage, setQrImage] = useState(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(
          "http://localhost:5000/api/v1/auth/my-idcard"
        );
        setUserInfo(userRes.data);

        const qrRes = await axios.get(
          `http://localhost:5000/api/v1/qr/generate?uniqueId=${userRes.data.uniqueId}`,
          { responseType: "arraybuffer" } // receive binary buffer
        );

        const base64Qr = `data:image/png;base64,${btoa(
          new Uint8Array(qrRes.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        )}`;

        setQrImage(base64Qr);
      } catch (err) {
        console.error("Error loading user or QR code:", err);
      }
    };

    fetchData();
  }, []);

  const downloadPDF = async () => {
    const card = cardRef.current;

    // Wait briefly to allow images to fully render
    setTimeout(async () => {
      const canvas = await html2canvas(card, {
        useCORS: true, // for external images like QR
        scale: 2, // higher quality
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("CIB-ID-Card.pdf");
    }, 300); // 300ms delay to ensure rendering complete
  };

  const printCard = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>ID Card</title>
          <style>
            body { margin: 0; padding: 20px; font-family: sans-serif; }
            .card { width: 350px; height: 550px; margin: auto; border: 4px solid black; }
          </style>
        </head>
        <body>
          ${cardRef.current.outerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  if (!userInfo)
    return <p className="text-center text-gray-500">Loading ID card...</p>;

  return (
    <div className="flex flex-col items-center px-4 py-6">
      {/* ID Card */}
      <div
        ref={cardRef}
        className="bg-white  rounded-lg shadow-2xl w-[90vw] max-w-[350px]"
      >
        <div className="h-2 bg-gradient-to-r from-red-600 to-blue-600" />

        {/* Header */}
        <div className="flex items-center justify-center p-4 bg-white border-b-2 border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-20 h-20  overflow-hidden flex items-start justify-items-start">
              <img
                src="/favicon.ico"
                alt="CIB Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="text-center">
              <h1 className="text-7xl font-black text-red-600">
                <span style={{ letterSpacing: '0.6em' }}>CIB</span>
              </h1>
              <p className="text-xs font-bold text-blue-800 me-8">
                CRIME INVESTIGATION BUREAU
              </p>
              <p className="text-[9px] text-gray-600 me-8">
                (An ISO 9001:2015 Certified Organization)
              </p>
            </div>
          </div>
        </div>

        {/* ID Title */}
        <div className="bg-red-600 text-white text-center py-2">
          <h2 className="text-lg font-bold tracking-wide">IDENTITY CARD</h2>
        </div>

        {/* Photo and QR */}
        <div className="flex justify-between items-start p-4 bg-white">
          <div className="border-2 border-black">
            <img
              src={userInfo.photo}
              alt="Profile"
              className="w-24 h-32 object-cover"
            />
          </div>
          <div className="border border-black">
            {/* <div className="border border-black">
              {qrImage ? (
                <img src={qrImage} alt="QR Code" className="w-20 h-20" />
              ) : (
                <p>Loading QR...</p>
              )}
            </div> */}

            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${userInfo.uniqueId}`}
              alt="QR Code"
              className="w-20 h-20"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="px-4 pb-4 bg-white text-sm">
          {[
            "name",
            "designation",
            "division",
            "work",
            "validTill",
            "uniqueId",
            "bloodGroup",
          ].map((key) => (
            <div className="flex" key={key}>
              <span className="w-24 font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <span className="text-black">: {userInfo[key]}</span>
            </div>
          ))}
        </div>

        {/* Footer Notes */}
        <div className="bg-gradient-to-br from-red-600 to-blue-600 px-4 pb-4 space-y-1 text-xs font-medium">
          <div className=" text-white px-3 py-2 rounded">
            ● NGO Registration Under Indian Trust Act.
          </div>
          <div className=" text-white px-3 py-2 rounded">
            ● Registration by NITI Aayog under NGO Darpan
          </div>
          <div className=" text-white px-3 py-2 rounded">
            ● Registration by Ministry of MSME under UDYAM
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={downloadPDF}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download PDF
        </button>
        <button
          onClick={printCard}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg flex items-center gap-2"
        >
          <Printer className="w-5 h-5" />
          Print
        </button>
      </div>
    </div>
  );
};

export default GenerateIdCard;
