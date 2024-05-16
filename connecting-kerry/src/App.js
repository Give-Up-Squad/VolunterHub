import "./App.css";
import Landing from "./components/Landing";
import Login from './components/login';
import About from './components/about';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Landing />
        <About />
            <Routes>
                <Route
                    path="/login"
                    element={<Login />}
                />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
