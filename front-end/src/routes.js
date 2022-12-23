import Dashboard from "@material-ui/icons/Dashboard";
// core components/views for Admin layout

import StorageIcon from "@mui/icons-material/Storage";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

import DashboardPage from "views/Dashboard/Dashboard.js";
import SigVerification from "views/SigVerification";
import SigIdentification from "views/SigIdentification";
import SigDetection from "views/SigDetection";
import SigDatabase from "views/SigDatabase";
import AddUserForm from "components/AddUserForm";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "...",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/verification",
    name: "Signature Verification",
    rtlName: "...",
    icon: VerifiedUserIcon,
    component: SigVerification,
    layout: "/admin",
  },
  {
    path: "/identification",
    name: "Signature Identification",
    rtlName: "...",
    icon: FingerprintIcon,
    component: SigIdentification,
    layout: "/admin",
  },
  {
    path: "/detection",
    name: "Signature Detection",
    rtlName: "...",
    icon: FindInPageIcon,
    component: SigDetection,
    layout: "/admin",
  },
  {
    path: "/database",
    name: "Signature Database",
    rtlName: "...",
    icon: StorageIcon,
    component: SigDatabase,
    layout: "/admin",
  },
  {
    path: "/testform",
    name: "Test Form",
    rtlName: "...",
    icon: StorageIcon,
    component: AddUserForm,
    layout: "/admin",
  },
];

export default dashboardRoutes;
