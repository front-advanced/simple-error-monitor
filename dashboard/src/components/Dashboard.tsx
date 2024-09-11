import ErrorTrend from './ErrorTrend';
import { Box, Typography } from '@mui/material';

function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Typography variant="body1" paragraph>
        Welcome to the Error Monitoring Dashboard. Here you can view and analyze error data.
      </Typography>
      <ErrorTrend />
    </Box>
  );
}

export default Dashboard;