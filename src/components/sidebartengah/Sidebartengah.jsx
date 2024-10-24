import "./sidebartengah.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/loader/Loader"; // Import Loader Component

const Sidebartengah = () => {
    const { dispatch } = useContext(DarkModeContext);
    const { dispatch: authDispatch, user } = useContext(AuthContext); // Get user from AuthContext
    const navigate = useNavigate();
    const location = useLocation(); // Get current location
    const [loading, setLoading] = useState(false); // State for loading

    const handleLogout = () => {
        setLoading(true); // Show loader when logout is initiated
        signOut(auth)
            .then(() => {
                authDispatch({ type: "LOGOUT" });
                setLoading(false); // Hide loader after successful logout
                navigate("/login");
            })
            .catch((error) => {
                setLoading(false); // Hide loader if there is an error
                console.error("Logout error: ", error);
            });
    };

    // Helper function to check if a path is active
    const isActive = (path) => location.pathname === path;

    // Show loader when logging out
    if (loading) {
        return <Loader />;
    }


    return (
        <div className="sidebartengah">
            <div className="toptengah">
                <img src="/src/assets/logoku.png" width="180" height="80" alt="Logo" />
            </div>
            <div className="centertengah">
                <ul>
                    <Link to="/">
                        <li className={isActive("/") ? "active" : ""}>
                            <DashboardIcon className="icon" />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <p className="title">TPDK KECAMATAN</p>
                    <Link to="/tengah">
                        <li className={isActive("/tengah") ? "active" : ""}>
                            <BusinessRoundedIcon className="icon" />
                            <span>Semarang Tengah</span>
                        </li>
                    </Link>
                    <p className="title"></p>
                    <li onClick={handleLogout}>
                        <ExitToAppIcon className="icon" />
                        <span style={{ color: "red", fontSize: "16px" }}>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <div className="colorOption" onClick={() => dispatch({ type: "LIGHT" })}></div>
                <div className="colorOption" onClick={() => dispatch({ type: "DARK" })}></div>
            </div>
        </div>
    );
};

export default Sidebartengah;
