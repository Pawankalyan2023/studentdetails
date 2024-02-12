import "./App.css";
import Mainpage from "./Components/Mainpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Mainpage />}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
