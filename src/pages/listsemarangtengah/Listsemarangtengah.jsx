import "./listsemarangtengah.scss";
import Sidebartengah from "../../components/sidebartengah/Sidebartengah";
import Navbar from "../../components/navbar/Navbar";
import Datatabletengah from "../../components/datatabletengah/Datatabletengah";

const Listsemarangtengah = ({columns}) => {
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

export default Listsemarangtengah;