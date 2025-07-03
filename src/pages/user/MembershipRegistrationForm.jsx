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
  Send,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Toast = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800';
  const Icon = type === 'success' ? CheckCircle : AlertCircle;
  
  return (
    <div className={`fixed top-4 right-4 ${bgColor} border px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm`}>
      <div className="flex items-center">
        <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

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
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAllFieldsError, setShowAllFieldsError] = useState(false);
  const [toast, setToast] = useState(null);

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

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const closeToast = () => {
    setToast(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear all fields error when user starts filling form
    if (showAllFieldsError) {
      setShowAllFieldsError(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        const errorMsg = "File size should be less than 5MB";
        setErrors((prev) => ({
          ...prev,
          profilePic: errorMsg,
        }));
        showToast(errorMsg, 'error');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        const errorMsg = "Please select a valid image file";
        setErrors((prev) => ({
          ...prev,
          profilePic: errorMsg,
        }));
        showToast(errorMsg, 'error');
        return;
      }

      setFormData((prev) => ({
        ...prev,
        profilePic: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Clear error
      if (errors.profilePic) {
        setErrors((prev) => ({
          ...prev,
          profilePic: "",
        }));
      }

      // Clear all fields error when user adds profile pic
      if (showAllFieldsError) {
        setShowAllFieldsError(false);
      }

      showToast("Profile picture uploaded successfully!", 'success');
    }
  };

  const checkIfFormEmpty = () => {
    const requiredFields = [
      'name', 'fatherName', 'email', 'mobile', 'occupation', 
      'dateOfBirth', 'aadharNo', 'address', 'city', 'designation'
    ];
    
    return requiredFields.every(field => !formData[field]?.toString().trim());
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.fatherName.trim()) {
      newErrors.fatherName = "Father's name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.occupation.trim()) {
      newErrors.occupation = "Occupation is required";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    if (!formData.aadharNo.trim()) {
      newErrors.aadharNo = "Aadhar number is required";
    } else if (!/^\d{12}$/.test(formData.aadharNo.replace(/\D/g, ''))) {
      newErrors.aadharNo = "Please enter a valid 12-digit Aadhar number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.designation) {
      newErrors.designation = "Please select a designation";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if form is completely empty
    if (checkIfFormEmpty()) {
      setShowAllFieldsError(true);
      showToast("All fields are required! Please fill in all the required information.", 'error');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setShowAllFieldsError(false);
    
    if (!validateForm()) {
      showToast("Please fix the errors in the form before submitting.", 'error');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Form Data:", formData);
      showToast("Membership Registration submitted successfully!", 'success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
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
        setProfilePreview(null);
        setErrors({});
      }, 2000);
     
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast("Failed to submit registration. Please try again.", 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}

      <div className="bg-white shadow-xl p-8 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Membership Registration</h1>
        </div>

        <div className="space-y-6">
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           
            <div className="md:col-span-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Camera className="w-4 h-4 mr-2 text-blue-600" />
                Profile Picture
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 overflow-hidden bg-gray-100 border-2 border-gray-300 flex-shrink-0">
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <label className={`flex items-center justify-center px-4 py-3 border-2 border-dashed  cursor-pointer hover:bg-gray-50 transition-colors ${
                    errors.profilePic ? "border-red-500" : "border-gray-300"
                  }`}>
                    <Upload className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {formData.profilePic ? formData.profilePic.name : "Choose image file"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                </div>
              </div>
              {errors.profilePic && (
                <p className="text-red-500 text-sm mt-1">{errors.profilePic}</p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2 text-blue-600" />
                Name <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Father Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2 text-blue-600" />
                Father Name <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.fatherName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter father's name"
                required
              />
              {errors.fatherName && (
                <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 mr-2 text-blue-600" />
                Email <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email address"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Mobile */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 mr-2 text-blue-600" />
                Mobile Number <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.mobile ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter 10-digit mobile number"
                required
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
              )}
            </div>

            {/* Occupation */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
                Occupation <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.occupation ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your occupation"
                required
              />
              {errors.occupation && (
                <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                Date of Birth <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
              )}
            </div>

            {/* Aadhar Number */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
                Aadhar Number <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="aadharNo"
                value={formData.aadharNo}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.aadharNo ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter 12-digit Aadhar number"
                maxLength="12"
                required
              />
              {errors.aadharNo && (
                <p className="text-red-500 text-sm mt-1">{errors.aadharNo}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Building className="w-4 h-4 mr-2 text-blue-600" />
                City <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your city"
                required
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>
          </div>

          {/* Address - Full Width */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 mr-2 text-blue-600" />
              Complete Address <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your complete residential address"
              required
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Designation - Full Width */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 mr-2 text-blue-600" />
              Select Designation <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                errors.designation ? "border-red-500" : "border-gray-300"
              }`}
              required
            >
              {designationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.designation && (
              <p className="text-red-500 text-sm mt-1">{errors.designation}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className={`flex items-center justify-center px-8 py-3 font-medium transition-all duration-200 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
              } text-white`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting Registration...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit Registration
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipRegistrationForm;