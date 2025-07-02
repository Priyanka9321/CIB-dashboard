import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./auth/AuthContext";
import { PopupProvider } from "./context/PopupContext"; // Add PopupProvider
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PopupProvider> {/* Add PopupProvider here */}
          <AppRoutes />
          <ToastContainer position="top-right" autoClose={3000} />
        </PopupProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;