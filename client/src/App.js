import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; // Import BrowserRouter as Router
import Signup from "./Auth/Singup";
import Singin from "./Auth/Singin";
import Admindash from "./Components/Admin";
import Userdash from "./Components/UserDashboard";
import Modifydataset from "./Components/Modifydata";
import Maindash from "./Dashboard/Maindash";
import Applyleave from "./Components/Applyleave";
import Adminauth from "./Auth/Adminauth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/adminauth" element={<Adminauth />} />
        <Route path="/apply" element={<Applyleave />} />
        <Route path="/dashboard" element={<Maindash />} />
        <Route path="/modify" element={<Modifydataset />} />
        <Route path="/user" element={<Userdash />} />
        <Route path="/admin" element={<Admindash />} />
        <Route path="/" element={<Singin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
