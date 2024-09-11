import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  TextField, Select, MenuItem, Pagination, Box 
} from '@mui/material';

interface ErrorEvent {
  id: string;
  message: string;
  timestamp: string;
  severity: string;
  projectId: string;
  environment: string;
}

function ErrorList() {
  const [errors, setErrors] = useState<ErrorEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [severity, setSeverity] = useState('');
  const [environment, setEnvironment] = useState('');

  useEffect(() => {
    const fetchErrors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/errors', {
          params: {
            page,
            limit: 10,
            search,
            severity,
            environment
          }
        });
        setErrors(response.data.errors);
        setTotalPages(Math.ceil(response.data.total / 10));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching errors:', error);
        setLoading(false);
      }
    };

    fetchErrors();
  }, [page, search, severity, environment]);

  if (loading) return <div>Loading...</div>;

  return (
    <Box>
      <Box mb={2}>
        <TextField 
          label="Search" 
          variant="outlined" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={severity}
          onChange={(e) => setSeverity(e.target.value as string)}
          displayEmpty
        >
          <MenuItem value="">All Severities</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="critical">Critical</MenuItem>
        </Select>
        <Select
          value={environment}
          onChange={(e) => setEnvironment(e.target.value as string)}
          displayEmpty
        >
          <MenuItem value="">All Environments</MenuItem>
          <MenuItem value="development">Development</MenuItem>
          <MenuItem value="staging">Staging</MenuItem>
          <MenuItem value="production">Production</MenuItem>
        </Select>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Message</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Environment</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {errors.map((error) => (
              <TableRow key={error.id}>
                <TableCell>{error.message}</TableCell>
                <TableCell>{new Date(error.timestamp).toLocaleString()}</TableCell>
                <TableCell>{error.severity}</TableCell>
                <TableCell>{error.environment}</TableCell>
                <TableCell>
                  <Link to={`/errors/${error.id}`}>View Details</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2}>
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={(event, value) => setPage(value)} 
        />
      </Box>
    </Box>
  );
}

export default ErrorList;