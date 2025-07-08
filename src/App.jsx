import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./auth/AuthContext";
import { MemberProvider } from "./context/MemberContext"; 
import { PopupProvider } from "./context/PopupContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MemberProvider> {/* Add MemberProvider here */}
          <PopupProvider>
            <AppRoutes />
            <ToastContainer position="top-right" autoClose={3000} />
          </PopupProvider>
        </MemberProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;