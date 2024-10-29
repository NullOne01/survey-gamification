import { useSelector } from 'react-redux';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Statistics() {
  const stats = useSelector(state => state.profile.statistics);

  const surveyCompletionData = {
    labels: stats.surveyHistory.map(item => item.date),
    datasets: [{
      label: 'Surveys Completed',
      data: stats.surveyHistory.map(item => item.count),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const pointsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Points Earned',
      data: stats.pointsHistory,
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }]
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Total Statistics
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box textAlign="center">
                <Typography variant="h4">{stats.totalSurveys}</Typography>
                <Typography color="textSecondary">Surveys Completed</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box textAlign="center">
                <Typography variant="h4">{stats.totalPoints}</Typography>
                <Typography color="textSecondary">Total Points</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Statistics; 