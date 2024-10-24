import "./listtengah.scss";
import Sidebartengah from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatabletengah from "../../components/datatabletengah/Datatabletengah";

const Listtengah = ({columns}) => {
  return (
    <div className="list">
      <Sidebartengah />
      <div className="listContainer">
        <Navbar />
        <Datatabletengah columns={columns} />
      </div>
    </div>
  );
};

export default Listtengah;