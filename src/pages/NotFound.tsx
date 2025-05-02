import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 5, textAlign: 'center' }}>
      <Typography variant="h2" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Страница не найдена
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Такой страницы не существует или она была удалена.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>На главную</Button>
    </Box>
  );
} 