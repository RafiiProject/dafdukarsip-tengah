import "./usertengah.scss";
import Sidebartengah from "../../components/sidebartengah/Sidebartengah";
import Navbar from "../../components/navbar/Navbar";
import Loader from "../../components/loader/Loader"; // Import Loader Component
import Chartleg from "../../components/chartleg/Chartleg"; // Ensure this path is correct
import { useState, useEffect } from "react";

const Usertengah = () => {
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Hide loader after home page loads
    }, 1000); // Simulating a 1-second delay
  }, []);

  // Show loader while loading
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="usertengah">
      <div className="usertengahContainer">
        <Sidebartengah />
        <div className="isicontainer">
          <Navbar />
          <Chartleg type="tengah" widgetData={null} />
        </div>
        
      </div>
    </div>
  );
};

export default Usertengah;
