// import React, { useEffect, useState } from 'react';

// const AppointmentLetter = () => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
    
//     fetch('https://your-backend-api.com/user/farha') 
//       .then(res => res.json())
//       .then(data => setUserData(data))
//       .catch(err => console.error(err));
//   }, []);

//   if (!userData) return <p className="text-center mt-10">Loading...</p>;

//   const { name, fatherName, imageUrl, uniqueId, validUpto } = userData;

//   return (
//     <div className="max-w-3xl mx-auto bg-white shadow-md p-8 mt-10 text-justify text-sm leading-6 font-serif">
//       <div className="flex justify-between text-sm mb-4">
//         <div><strong>Ref:-</strong></div>
//         <div><strong>Date:-</strong> {new Date().toLocaleDateString()}</div>
//       </div>

//       <p className="mb-1"><strong>TO,</strong></p>
//       <p className="ml-4">{name?.toUpperCase()}</p>
//       <p className="ml-4">W/O {fatherName?.toUpperCase()}</p>

//       <h2 className="text-center font-bold underline text-lg my-4">Appointment Letter</h2>

//       <p>Dear {name.split(' ')[0]},</p>
//       <p className="mt-2">
//         We are pleased to appoint you as the <strong>State Director Andhra Pradesh</strong>, without salary base.
//         We are confident that you shall be able to fight Crime & Corruption and co-operate with Central/State Government and Judiciary. 
//         You are authorized to research and provide secret information about crime, corruption, anti-national activities,
//         smuggling, fake currency, bonded labour, child labour, and protect various rights as per Indian Constitution & our organization’s bylaws.
//       </p>

//       <p className="mt-3 italic text-center font-semibold">“Criminals should be punished, not fed pastries.”</p>

//       <p className="mt-4">
//         You are advised to work with a humanitarian spirit to uphold our organization’s mission of Human Rights, Social Justice, and creating a Crime-Free Nation.
//       </p>

//       <p className="mt-2">
//         Submit timely activity reports to the Head Office. All police and government authorities are requested to co-operate with the ID: <strong>{uniqueId}</strong>, valid up to <strong>{validUpto}</strong>.
//       </p>

//       <div className="my-6">
//         <img src={imageUrl} alt="User" className="h-40 w-32 object-cover border mx-auto" />
//       </div>

//       <div className="mt-4">
//         <strong>Copy to Information:</strong>
//         <ul className="list-disc list-inside mt-1">
//           <li>Senior Superintendent of Police, Bodhan, Nizamabad, Andhra Pradesh.</li>
//           <li>Police Station Incharge, Bodhan, Nizamabad, Andhra Pradesh.</li>
//         </ul>
//       </div>

//       <p className="mt-4 text-xs">
//         Authenticity of members can be verified at <a href="https://www.cib.org.in" className="text-blue-600 underline">www.cib.org.in</a>. 
//         Membership is void if illegal activity is committed. Members must renew ID card within 30 days of expiry; late fees apply thereafter. 
//         Headquarters reserves the right to terminate memberships not renewed within 60 days post expiry.
//       </p>
//     </div>
//   );
// };

// export default AppointmentLetter;


// // fetching user data like name, image, fatherName, and uniqueId from a backend API

import React, { useEffect, useState } from "react";

const AppointmentLetter = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Mock user data
    const mockData = {
      name: "Farah Naaz Anjum",
      fatherName: "Mohmmed Abdul Majeed",
      imageUrl: "https://via.placeholder.com/120x150", // Replace with actual profile photo
      uniqueId: "CIB0001",
      validUpto: "26/03/2026",
    };
    setUserData(mockData);
  }, []);

  if (!userData) return <p className="text-center mt-10">Loading...</p>;

  const { name, fatherName, imageUrl, uniqueId, validUpto } = userData;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-md text-[15px] leading-relaxed font-[Georgia]">
      {/* Header with logo */}
      <div className="flex justify-between items-start">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Badge_of_the_Indian_Police_Service.svg/1200px-Badge_of_the_Indian_Police_Service.svg.png"
          alt="Logo"
          className="w-28"
        />
        <div className="text-right text-sm mt-2">
          <p><strong>Ref:-</strong></p>
          <p><strong>Date:-</strong> {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Recipient */}
      <div className="mt-4">
        <p className="font-bold">TO,</p>
        <p className="ml-4">{name?.toUpperCase()}</p>
        <p className="ml-4">W/O {fatherName?.toUpperCase()}</p>
      </div>

      {/* Title */}
      <h1 className="text-center text-blue-600 font-bold text-xl underline mt-4">Appointment Letter</h1>

      {/* Body */}
      <div className="mt-4">
        <p>Dear {name.split(" ")[0]},</p>
        <p className="mt-2 indent-6">
          We are pleased to appoint you as the <strong>State Director, Andhra Pradesh</strong>, without salary base. We are confident that you shall be able to Crime & Corruption control with Co-operate with Central/State Government and Judiciary. You authorized to Research and provide secret information about Crime, Corruption, Anti Nation Activity, Smuggling, Fake Currency, Bonded Labour, Child Labour to Central Government, State Government, Police administration and protect Human Rights, Citizen Rights, Education Rights, Child Rights, Labour Rights, Women Rights, Fundamental Rights, Senior Citizen Rights, Disability Rights, Consumer Rights, Rights to Information (RTI) and all those Rights of aggrieved and tortured person within judicious framework in accordance with the provisions of Indian Constitution & Bye laws of organization.
        </p>

        <p className="italic text-center text-[16px] font-semibold mt-3">
          “Criminals should be Punished Not Fed Pastries”
        </p>

        <p className="mt-3 indent-6">
          Further we would like to advise you start your work with the feeling as to help the human and needy wherever required as to establish and effective and positive of our organization to fulfill the Human Rights & Social Justice and Co-operate government to making our Company as <strong>“Crime Free Nation”</strong>.
        </p>

        <p className="mt-3">
          Be Informed that you have sent timely Activity Report to Head Office on Regular Basis.
        </p>

        <p className="mt-1">
          All Police Officers, Public Relation Division and Government Agencies are humbly Requested to Co-operate with his/her Unique ID – <strong>{uniqueId}</strong>, Valid up to <strong>{validUpto}</strong>.
        </p>
      </div>

      {/* Profile Image and stamp/signature */}
      <div className="flex justify-between items-end mt-6">
        <img src={imageUrl} alt="User" className="w-32 h-40 object-cover border p-1" />

        <div className="text-right">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Approved_Stamp_Vector.svg/1200px-Approved_Stamp_Vector.svg.png"
            alt="Stamp"
            className="w-20 mx-auto mb-1"
          />
          <p className="font-bold">Authorized Signatory</p>
        </div>
      </div>

      {/* Copy to section */}
      <div className="mt-6">
        <p className="font-bold">Copy to Information:-</p>
        <ul className="list-disc list-inside">
          <li>Senior Superintendent of Police, Bodhan, Nizamabad, Andhra Pradesh.</li>
          <li>Police Station Incharge, Bodhan, Nizamabad, Andhra Pradesh.</li>
        </ul>
      </div>

      {/* Footer Info */}
      <div className="mt-6 text-[13px]">
        <p>
          Authenticity of members can be verified at{" "}
          <a href="https://www.cib.org.in" className="text-blue-600 underline">www.cib.org.in</a>
        </p>
        <p className="mt-1">
          CIB is not Responsible, if any type of Illegal activity done by Members. Members are mandatory to renew the ID card within 30 days of card expiry date. After crossing the due date, late fee is applicable. Headquarters always reserves the rights to terminate Membership If the ID card is not renewed within 60 days prior to the expiry date.
        </p>
      </div>

      {/* Office Info Footer */}
      <div className="mt-8 text-center text-sm border-t pt-2 text-gray-700">
        <p>
          <strong>Office:-</strong> 301, Shanti Heritage Apartment, Rukunpura, Baily Road, Patna-800014 (Bihar)
        </p>
        <p>
          <a href="https://www.cib.org.in" className="text-blue-600 underline">www.cib.org.in</a> | Email: <span className="underline">info@cib.org.in</span>
        </p>
      </div>
    </div>
  );
};

export default AppointmentLetter;
