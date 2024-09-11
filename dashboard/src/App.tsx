import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import ErrorList from './components/ErrorList';
import ErrorDetail from './components/ErrorDetail';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Error Monitoring Platform
            </Typography>
            <Box>
              <Link to="/" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>Dashboard</Link>
              <Link to="/errors" style={{ color: 'white', textDecoration: 'none' }}>Errors</Link>
            </Box>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/errors" element={<ErrorList />} />
            <Route path="/errors/:id" element={<ErrorDetail />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;