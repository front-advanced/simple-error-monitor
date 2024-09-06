import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface ErrorEvent {
  id: string;
  message: string;
  timestamp: string;
  severity: string;
}

function ErrorList() {
  const [errors, setErrors] = useState<ErrorEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchErrors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/errors');
        setErrors(response.data.errors);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching errors:', error);
        setLoading(false);
      }
    };

    fetchErrors();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Error List</h2>
      <table>
        <thead>
          <tr>
            <th>Message</th>
            <th>Timestamp</th>
            <th>Severity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {errors.map((error) => (
            <tr key={error.id}>
              <td>{error.message}</td>
              <td>{new Date(error.timestamp).toLocaleString()}</td>
              <td>{error.severity}</td>
              <td>
                <Link to={`/errors/${error.id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ErrorList;