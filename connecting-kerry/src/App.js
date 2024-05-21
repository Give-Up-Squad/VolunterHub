import "./App.css";
import Landing from "./components/landing";
import Login from "./components/login";
import About from "./components/about";
import VolunteerRegister from "./components/volRegistration";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/volRegister" element={<VolunteerRegister />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
