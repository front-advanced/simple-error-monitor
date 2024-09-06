import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ErrorList from './components/ErrorList';
import ErrorDetail from './components/ErrorDetail';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/errors">Errors</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/errors" element={<ErrorList />} />
          <Route path="/errors/:id" element={<ErrorDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;