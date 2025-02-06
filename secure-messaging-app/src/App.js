import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom"
//Component Organizer
//import MessageForm from './components/MessageForm';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MessageForm from './components/MessageForm';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/messageForm" element={<MessageForm/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => {
  const navigate = useNavigate();

  return (
        <div className="header">
          <h1>Secure Encrypted Messaging</h1>
          <ul>
            <li>End-to-end encryption keeps your conversations private.</li>
            <li>Your messages are encrypted from sender to recipient.</li>

          </ul>
          <button onClick={() => navigate("/register")}>Sign Up</button>
          <button onClick={() => navigate("/login")} >Login</button>
        </div>
  );
};

export default App;