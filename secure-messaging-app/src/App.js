import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
//Component Organizer
//import MessageForm from './components/MessageForm';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/" element={<Register/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;