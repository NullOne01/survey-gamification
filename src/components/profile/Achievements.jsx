import { useSelector } from 'react-redux';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';

function Achievements() {
  const achievements = useSelector(state => state.profile.achievements);

  return (
    <Grid container spacing={3}>
      {achievements.map((achievement) => (
        <Grid item xs={12} sm={6} md={4} key={achievement.id}>
          <Card 
            sx={{ 
              height: '100%',
              opacity: achievement.unlocked ? 1 : 0.5 
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <StarIcon 
                  color={achievement.unlocked ? "primary" : "disabled"}
                  sx={{ mr: 1 }}
                />
                <Typography variant="h6">
                  {achievement.title}
                </Typography>
              </Box>
              <Typography color="textSecondary">
                {achievement.description}
              </Typography>
              {achievement.unlocked && (
                <Typography variant="caption" color="primary">
                  Unlocked on {new Date(achievement.unlockedDate).toLocaleDateString()}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Achievements; 