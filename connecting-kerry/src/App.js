import "./App.css";
import Navbar from "./components/navbar";
import Landing from "./components/landing";
import Login from "./components/login";
import About from "./components/about";
import VolunteerRegistration from "./components/volRegistration";
import OrganisationRegistration from "./components/orgRegistration";
import VolEventsDisplay from "./components/volEventsDisplay";
import Calendar from "./components/calendar";
import Footer from "./components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Disclaimer from "./components/disclaimer";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/volRegister" element={<VolunteerRegistration />} />
          <Route path="/orgRegister" element={<OrganisationRegistration />} />
          <Route path="/volunteer" element={<VolEventsDisplay />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
