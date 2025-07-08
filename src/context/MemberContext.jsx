import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext'; 

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
      console.log('API Response:', response.data);
      if (Array.isArray(response.data)) {
        setData(response.data);
        setError(null);
      } else {
        console.error('API did not return an array:', response.data);
        setData([]);
        setError('Invalid data format received from server.');
      }
    } catch (error) {
      console.error('Error fetching members:', error.response || error);
      setData([]);
      setError(
        error.response?.data?.error || 'Failed to fetch members. Please check the server connection.'
      );
    }
  };

  const searchMembers = async (term) => {
    try {
      const response = await api.get(`/members/search?query=${term}`);
      console.log('Search API Response:', response.data);
      if (Array.isArray(response.data)) {
        setData(response.data);
        setError(null);
      } else {
        console.error('Search API did not return an array:', response.data);
        setData([]);
        setError('Invalid search results format.');
      }
      return true; // Indicate success to reset currentPage
    } catch (error) {
      console.error('Error searching members:', error.response || error);
      setData([]);
      setError(
        error.response?.data?.error || 'Failed to search members. Please try again.'
      );
      return false;
    }
  };

  const viewDetails = async (userId) => {
    try {
      const response = await api.get(`/members/${userId}/details`);
      console.log('Member Details:', response.data);
      setError(null);
      return response.data; // Return member data for modal
    } catch (error) {
      console.error('Error fetching member details:', error.response || error);
      setError(
        error.response?.data?.error || 'Failed to fetch member details.'
      );
      return null;
    }
  };

  const verifyMember = async (userId) => {
    try {
      await api.patch(`/members/${userId}/verify`);
      await fetchMembers(); // Refresh data
      setError(null);
      return true;
    } catch (error) {
      console.error('Error verifying member:', error.response || error);
      setError(
        error.response?.data?.error || 'Failed to verify member.'
      );
      return false;
    }
  };

  const deleteMember = async (userId) => {
    try {
      await api.patch(`/members/${userId}/delete`);
      await fetchMembers(); // Refresh data
      setError(null);
      return true;
    } catch (error) {
      console.error('Error deleting member:', error.response || error);
      setError(
        error.response?.data?.error || 'Failed to delete member.'
      );
      return false;
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
      }}
    >
      {children}
    </MemberContext.Provider>
  );
};