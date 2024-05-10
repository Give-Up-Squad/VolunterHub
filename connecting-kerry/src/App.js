import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import Login from './components/login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Login />
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
