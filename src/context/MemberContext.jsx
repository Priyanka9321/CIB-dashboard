import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import { toast } from "react-toastify";

export const MemberContext = createContext();

export const MemberProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext) || {};

  const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const fetchMembers = async () => {
    try {
      const response = await api.get('/members');
      if (Array.isArray(response.data)) {
        setData(response.data);
        setError(null);
      } else {
        setData([]);
        setError('Invalid data format received from server.');
      }
    } catch (error) {
      setData([]);
      setError(error.response?.data?.error || 'Failed to fetch members.');
      toast.error(error.response?.data?.error || 'Failed to fetch members.');
    }
  };

  const searchMembers = async (term) => {
    try {
      const response = await api.get(`/members/search?query=${term}`);
      if (Array.isArray(response.data)) {
        setData(response.data);
        setError(null);
        return true;
      } else {
        setData([]);
        setError('Invalid search results format.');
        return false;
      }
    } catch (error) {
      setData([]);
      setError(error.response?.data?.error || 'Failed to search members.');
      toast.error(error.response?.data?.error || 'Failed to search members.');
      return false;
    }
  };

  const viewDetails = async (userId) => {
    try {
      const response = await api.get(`/members/${userId}/details`);
      setError(null);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to fetch member details.');
      toast.error(error.response?.data?.error || 'Failed to fetch member details.');
      return null;
    }
  };

  const verifyMember = async (userId) => {
    try {
      await api.patch(`/members/${userId}/verify`);
      await fetchMembers();
      setError(null);
      return true;
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to verify member.');
      toast.error(error.response?.data?.error || 'Failed to verify member.');
      return false;
    }
  };

  const deleteMember = async (userId) => {
    try {
      await api.patch(`/members/${userId}/delete`);
      await fetchMembers();
      setError(null);
      return true;
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to delete member.');
      toast.error(error.response?.data?.error || 'Failed to delete member.');
      return false;
    }
  };

  const updateMember = async (userId, formData) => {
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== 'profilePic' && key !== 'signature' && formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      });
      if (formData.profilePic instanceof File) {
        formDataToSend.append('photoPath', formData.profilePic);
      } else if (formData.profilePic?.path) {
        formDataToSend.append('photoPath', formData.profilePic.path);
      }
      if (formData.signature instanceof File) {
        formDataToSend.append('signaturePath', formData.signature);
      } else if (formData.signature?.path) {
        formDataToSend.append('signaturePath', formData.signature.path);
      }

      const response = await api.patch(`/members/${userId}/edit`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await fetchMembers();
      setError(null);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update member.');
      toast.error(error.response?.data?.error || 'Failed to update member.');
      return null;
    }
  };

  return (
    <MemberContext.Provider
      value={{
        data,
        error,
        fetchMembers,
        searchMembers,
        viewDetails,
        verifyMember,
        deleteMember,
        updateMember,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
};