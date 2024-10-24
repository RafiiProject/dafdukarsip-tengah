import "./login.scss"; 
import { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase"; // Import Firestore instance
import { doc, getDoc } from "firebase/firestore"; // Firestore imports
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/loader/Loader"; // Import Loader Component

const Login = () => { 
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State for loading

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  // Function to get user role from Firestore
  const getUserRole = async (uid) => {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data().role; // Get the role field from Firestore
    } else {
      throw new Error("User role not found in Firestore");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader when login starts

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get the user role from Firestore
      const role = await getUserRole(user.uid);

      // Check if the role is "userTengah"
      if (role !== "userTengah") {
        throw new Error("You are not authorized to access this website.");
      }

      // Dispatch user data to the global state
      dispatch({ type: "LOGIN", payload: user });

      // Redirect to homepage for userTengah
      navigate("/");

    } catch (err) {
      console.error("Error: ", err);
      setError(true);
      setLoading(false); // Hide loader if role fetching fails or user is not authorized
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <img src="/src/assets/logoku.png" width="300" height="150" alt="Logo" />
        <h1>Arsip Pencetakan KTP</h1>

        {/* Show loader when loading */}
        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="email" 
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="password" 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <span>You are not authorized to access this website!</span>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
