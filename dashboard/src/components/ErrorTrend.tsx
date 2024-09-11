import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Box } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ErrorTrend() {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchTrendData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/errors/stats/trend');
        const data = response.data;

        const chartData = {
          labels: data.map((item: any) => item.date),
          datasets: [
            {
              label: 'Error Count',
              data: data.map((item: any) => item.count),
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }
          ]
        };

        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching trend data:', error);
      }
    };

    fetchTrendData();
  }, []);

  if (!chartData) return <div>Loading...</div>;

  return (
    <Box>
      <h2>Error Trend</h2>
      <Line data={chartData} />
    </Box>
  );
}

export default ErrorTrend;