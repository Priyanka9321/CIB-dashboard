// src/context/PopupContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(() => {
    return localStorage.getItem("isPopupOpen") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isPopupOpen", isPopupOpen);
  }, [isPopupOpen]);

  useEffect(() => {
    if (localStorage.getItem("hasSeenPopup") === "true") {
      setIsPopupOpen(false);
    }
  }, []);

  const handleClose = () => {
    setIsPopupOpen(false);
    localStorage.setItem("hasSeenPopup", "true");
  };

  const handleApplyNow = () => {
    setIsPopupOpen(false);
    localStorage.setItem("hasSeenPopup", "true");
  };

  return (
    <PopupContext.Provider value={{ isPopupOpen, setIsPopupOpen, handleClose, handleApplyNow }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);