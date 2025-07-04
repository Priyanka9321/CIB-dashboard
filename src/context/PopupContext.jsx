import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(() => {
    return localStorage.getItem("isPopupOpen") === "true";
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(() => {
    return localStorage.getItem("isFormSubmitted") === "true";
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("isPopupOpen", isPopupOpen);
  }, [isPopupOpen]);

  useEffect(() => {
    localStorage.setItem("isFormSubmitted", isFormSubmitted);
  }, [isFormSubmitted]);

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
    navigate("/user/apply-membership");
  };

  const handleFormSubmit = () => {
    setIsFormSubmitted(true);
  };

  return (
    <PopupContext.Provider
      value={{
        isPopupOpen,
        setIsPopupOpen,
        handleClose,
        handleApplyNow,
        isFormSubmitted,
        handleFormSubmit,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);