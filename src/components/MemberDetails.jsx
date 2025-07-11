// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ArrowLeft, User } from 'lucide-react';

// const MemberDetails = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ✅ Handle missing state
//   const memberData = location.state?.member || {
//     name: "No Name Found",
//     fatherName: "",
//     email: "",
//     mobile: "",
//     designation: "",
//     dateOfBirth: "",
//     aadharCardNo: "",
//     address: "",
//     city: "",
//     occupation: "",
//     userType: "",
//     accountStatus: "",
//     verifiedBy: "",
//     userProfile: ""
//   };

//   const fields = [
//     { label: "Name:", value: memberData.name },
//     { label: "Father Name:", value: memberData.fatherName },
//     { label: "Email:", value: memberData.email },
//     { label: "Mobile:", value: memberData.mobile },
//     { label: "Designation:", value: memberData.designation },
//     { label: "Date Of Birth:", value: memberData.dateOfBirth },
//     { label: "Aadhar Card No.:", value: memberData.aadharCardNo },
//     { label: "Address:", value: memberData.address },
//     { label: "City:", value: memberData.city },
//     { label: "Occupation:", value: memberData.occupation },
//     { label: "User Type:", value: memberData.userType },
//     { label: "Account's Status:", value: memberData.accountStatus },
//     { label: "Verified By:", value: memberData.verifiedBy },
//     { label: "User Profile:", value: memberData.userProfile, isImage: true }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-600 to-slate-800 p-4 flex items-center justify-center">
//       <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 text-center relative">
//           <button
//             onClick={() => navigate(-1)}
//             className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-green-400 hover:bg-green-500 text-white p-2 rounded-lg transition-colors"
//           >
//             <ArrowLeft size={20} />
//           </button>
//           <div className="flex justify-center mb-4">
//             <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
//               <User className="text-white" size={32} />
//             </div>
//           </div>
//           <h1 className="text-2xl font-bold text-gray-800">Member Details</h1>
//         </div>

//         {/* Member Details */}
//         <div className="p-6">
//           <div className="space-y-1">
//             {fields.map((field, index) => (
//               <div key={index} className="grid grid-cols-3 border-b border-gray-200 hover:bg-blue-50 transition-colors">
//                 <div className="py-3 px-4 bg-gray-50 font-medium text-gray-700 border-r border-gray-200">
//                   {field.label}
//                 </div>
//                 <div className="col-span-2 py-3 px-4 text-gray-600">
//                   {field.isImage ? (
//                     <div className="w-8 h-6 bg-gray-100 border border-gray-300 rounded flex items-center justify-center">
//                       <User size={16} className="text-gray-400" />
//                     </div>
//                   ) : (
//                     <span className={field.value ? "text-gray-800" : "text-gray-400"}>
//                       {field.value || "N/A"}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Go Back Button */}
//           <div className="mt-6">
//             <button
//               onClick={() => navigate(-1)}
//               className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
//             >
//               Go Back
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MemberDetails;

// updated by sumit


import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// ✅ Helper: format yyyy-mm-dd → dd-mm-yyyy
const formatDateForInput = (isoDate) => {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  return `${day}-${month}-${year}`;
};

// ✅ Helper: format dd-mm-yyyy → yyyy-mm-dd
const formatDateForServer = (dateStr) => {
  if (!dateStr) return "";
  const [day, month, year] = dateStr.split("-");
  return `${year}-${month}-${day}`;
};

// ✅ Regex validators
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[0-9]{10}$/;
const dateRegex = /^\d{2}-\d{2}-\d{4}$/;

const MemberDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { member, mode } = location.state || {};
  const isEdit = mode === "edit";
  const userId = member?.userId;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    accountStatus: "",
    role: "",
    verifiedBy: "",

    fatherName: "",
    dob: "",
    qualification: "",
    address: "",
    photoPath: "",
    signaturePath: "",
    memberDesignation: "",
    memberDivision: "",
    memberWorkLocation: "",
    validTill: "",
    bloodGroup: "",
  });

  // ✅ Fetch member data
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:5000/api/v1/members/${userId}/details`)
      .then((res) => {
        const data = res.data;

        setFormData({
          name: data.userFullName  || "",
          email: data.userEmail || "",
          mobile: data.userMobile || "",
          accountStatus: data.accountStatus || "",
          role: data.role || "",
          verifiedBy: data.verifyDate || "",

          fatherName: data.fatherName || "",
          dob: data.dob ? formatDateForInput(data.dob) : "",
          qualification: data.qualification || "",
          address: data.address || "",
          photoPath: data.photoPath || "",
          signaturePath: data.signaturePath || "",
          memberDesignation: data.memberDesignation || "",
          memberDivision: data.memberDivision || "",
          memberWorkLocation: data.memberWorkLocation || "",
          validTill: data.validTill ? formatDateForInput(data.validTill) : "",
          bloodGroup: data.bloodGroup || "",
        });
      })
      .catch((err) => console.error("Error fetching member details", err));
  }, [userId]);

  // ✅ Validate and Submit
  const handleSave = async () => {
  const {
    name,
    email,
    mobile,
    dob,
    validTill,
  } = formData;

  if (!name || !email || !mobile || !dob) {
    alert("Please fill in Name, Email, Mobile, and DOB.");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Invalid email format.");
    return;
  }

  if (!mobileRegex.test(mobile)) {
    alert("Mobile must be 10 digits.");
    return;
  }

  if (!dateRegex.test(dob)) {
    alert("DOB must be in dd-mm-yyyy format.");
    return;
  }

  if (validTill && !dateRegex.test(validTill)) {
    alert("Valid Till must be in dd-mm-yyyy format.");
    return;
  }

  try {
    await axios.patch(`http://localhost:5000/api/v1/members/${userId}/edit`, {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      accountStatus: formData.accountStatus,
      userType: formData.role,
      verifiedBy: formData.verifiedBy,

      fatherName: formData.fatherName,
      qualification: formData.qualification,
      dateOfBirth: formatDateForServer(formData.dob), // ✅ Correct key for backend
      aadharCardNo: formData.uniqueId || "",           // optional fallback
      address: formData.address,
      memberDesignation: formData.memberDesignation,
      memberDivision: formData.memberDivision,
      memberWorkLocation: formData.memberWorkLocation,
      validTill: formData.validTill
        ? formatDateForServer(formData.validTill)
        : null,
      bloodGroup: formData.bloodGroup,
    });

    alert("Member details updated successfully!");
    navigate(-1);
  } catch (err) {
    console.error("Update failed:", err);
    alert("Update failed. Please try again.");
  }
};


  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        {isEdit ? "Edit Member Details" : "Member Details"}
      </h2>

      <div className="divide-y divide-gray-200">
        {Object.entries(formData).map(([key, value], index) => (
          <div
            key={index}
            className="grid grid-cols-3 border-b border-gray-200 hover:bg-blue-50 transition-colors"
          >
            <div className="py-3 px-4 bg-gray-50 font-medium text-gray-700 border-r border-gray-200 capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </div>
            <div className="col-span-2 py-3 px-4 text-gray-600">
              {isEdit ? (
                <input
                  type="text"
                  placeholder={
                    key === "dob" || key === "validTill" ? "dd-mm-yyyy" : ""
                  }
                  name={key}
                  value={formData[key] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                />
              ) : (
                <span className={value ? "text-gray-800" : "text-gray-400"}>
                  {value || "N/A"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 w-full bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        Go Back
      </button>

      {isEdit && (
        <button
          onClick={handleSave}
          className="mt-3 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Save Changes
        </button>
      )}
    </div>
  );
};

export default MemberDetails;
