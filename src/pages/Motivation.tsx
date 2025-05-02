import { Box, Typography, Paper, Chip } from '@mui/material';

export default function Motivation() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Мотивация
      </Typography>
      <Paper sx={{ p: 3, mb: 2, borderRadius: 3, boxShadow: 3, background: 'linear-gradient(90deg, #2196f3 0%, #00e676 100%)', color: '#fff' }}>
        <Typography variant="h6">"Твой прогресс начинается с первого шага!"</Typography>
      </Paper>
      <Chip label="7 дней подряд!" color="success" sx={{ fontWeight: 'bold', fontSize: 16 }} />
    </Box>
  );
} 