// src/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import Home from './Home';
import SignUpForm from '.';
import AddTask from './AddTask';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/LoginForm" element={<LoginForm />} />
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<SignUpForm />} />
                <Route path="/AddTask" element={<AddTask />} />


                
            </Routes>
        </Router>
    );
}

export default App;
