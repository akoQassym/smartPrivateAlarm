import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;