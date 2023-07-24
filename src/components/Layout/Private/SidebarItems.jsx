import { LuLayoutDashboard } from "react-icons/lu";
// import { CgNotes } from "react-icons/cg";
import { Link } from "react-router-dom";
import PATH from "../../../Navigation/Path";
// import PATH from "../../../Navigation/Path";

const CLIENT_SIDEBAR_ITEMS = [
  {
    key: PATH.CLIENT_DASHBOARD,
    icon: <LuLayoutDashboard size={20} />,
    label: <Link to={PATH.CLIENT_DASHBOARD}>Dashboard</Link>,
  },
];

const SIDEBAR_ITEMS = {
  1: CLIENT_SIDEBAR_ITEMS,
  // 2: PATIENT_SIDEBAR_ITEMS,
};

export default SIDEBAR_ITEMS;
