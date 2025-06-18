import React, { useState } from "react";
import {
  User,
  Users,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  CreditCard,
  MapPin,
  Building,
  Camera,
  ArrowLeft,
  Send,
  Upload,
} from "lucide-react";

const MembershipRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    email: "",
    mobile: "",
    occupation: "",
    dateOfBirth: "",
    aadharNo: "",
    address: "",
    city: "",
    designation: "",
    profilePic: null,
  });

  const [profilePreview, setProfilePreview] = useState(null);

  const designationOptions = [
    { value: "", label: "Select Designation" },
    { value: "director", label: "Director" },
    { value: "secretary", label: "Secretary" },
    { value: "president", label: "President" },
    { value: "vice-president", label: "Vice President" },
    { value: "treasurer", label: "Treasurer" },
    { value: "member", label: "Member" },
    { value: "volunteer", label: "Volunteer" },
    { value: "social-worker", label: "Social Worker" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePic: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Registration submitted successfully!");
  };

  const handleBackToDashboard = () => {
    console.log("Navigating back to dashboard");
    alert("Navigating back to dashboard");
  };

  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-4xl mx-auto">
        {/* Form */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-200 border-4 border-white shadow-lg">
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Camera className="w-12 h-12 text-blue-400" />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-full cursor-pointer hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg">
                  <Upload className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <User className="w-4 h-4 mr-2 text-blue-600" />
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Father Name */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <User className="w-4 h-4 mr-2 text-blue-600" />
                  Father Name
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80"
                  placeholder="Enter father's name"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <Mail className="w-4 h-4 mr-2 text-blue-600" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Mobile */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <Phone className="w-4 h-4 mr-2 text-blue-600" />
                  Mobile No
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80"
                  placeholder="Enter mobile number"
                  required
                />
              </div>

              {/* Occupation */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
                  Occupation
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80"
                  placeholder="Enter your occupation"
                  required
                />
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80"
                  required
                />
              </div>

              {/* Aadhar No */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
                  Aadhar No
                </label>
                <input
                  type="text"
                  name="aadharNo"
                  value={formData.aadharNo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80"
                  placeholder="Enter Aadhar number"
                  required
                />
              </div>

              {/* City */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <Building className="w-4 h-4 mr-2 text-blue-600" />
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80"
                  placeholder="Enter your city"
                  required
                />
              </div>
            </div>

            {/* Address - Full Width */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80 resize-none"
                placeholder="Enter your complete address"
                required
              />
            </div>

            {/* Designation - Full Width */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <Users className="w-4 h-4 mr-2 text-blue-600" />
                Select Designation
              </label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80"
                required
              >
                {designationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={handleBackToDashboard}
                className="flex items-center justify-center px-8 py-3 rounded-xl border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-semibold"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipRegistrationForm;
