import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface ErrorEvent {
  id: string;
  message: string;
  stack: string;
  timestamp: string;
  url: string;
  userAgent: string;
  projectId: string;
  environment: string;
  severity: string;
  metadata: Record<string, any>;
}

function ErrorDetail() {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<ErrorEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchErrorDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/errors/${id}`);
        setError(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching error details:', error);
        setLoading(false);
      }
    };

    fetchErrorDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!error) return <div>Error not found</div>;

  return (
    <div>
      <h2>Error Detail</h2>
      <table>
        <tbody>
          <tr><td>Message:</td><td>{error.message}</td></tr>
          <tr><td>Stack:</td><td><pre>{error.stack}</pre></td></tr>
          <tr><td>Timestamp:</td><td>{new Date(error.timestamp).toLocaleString()}</td></tr>
          <tr><td>URL:</td><td>{error.url}</td></tr>
          <tr><td>User Agent:</td><td>{error.userAgent}</td></tr>
          <tr><td>Project ID:</td><td>{error.projectId}</td></tr>
          <tr><td>Environment:</td><td>{error.environment}</td></tr>
          <tr><td>Severity:</td><td>{error.severity}</td></tr>
          <tr><td>Metadata:</td><td><pre>{JSON.stringify(error.metadata, null, 2)}</pre></td></tr>
        </tbody>
      </table>
    </div>
  );
}

export default ErrorDetail;