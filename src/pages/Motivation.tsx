import { Box, Typography, Paper } from '@mui/material';
import { useMemo } from 'react';

const quotes = [
  'Твой прогресс начинается с первого шага!',
  'Сегодня ты сильнее, чем вчера!',
  'Не сдавайся — результат уже близко!',
  'Двигайся вперёд, несмотря ни на что!',
  'Ты способен на большее, чем думаешь!',
  'Каждая тренировка — вклад в твой успех!',
  'Сделай сегодня то, что другие не хотят!',
  'Пусть твоя цель будет сильнее твоих отговорок!',
  'Верь в себя и действуй!',
  'Только ты решаешь, где твои границы!'
];

export default function Motivation() {
  // Выбираем случайную цитату при каждом рендере
  const quote = useMemo(() => quotes[Math.floor(Math.random() * quotes.length)], []);
  // Можно добавить логику: если сегодня была тренировка, показывать другую фразу
  // Пока просто всегда мотивация
  const todayMotivation = 'Ты молодец! Продолжай в том же духе!';

  // Мотивирующий фон
  return (
    <Box sx={{
      minHeight: '100vh',
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
    }}>
      {/* Затемнение для читаемости */}
      <Box sx={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        bgcolor: 'rgba(0,0,0,0.45)',
        zIndex: 1,
      }} />
      <Box sx={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 600 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#fff', fontWeight: 700 }}>
          Мотивация
        </Typography>
        <Paper sx={{ p: 3, mb: 2, borderRadius: 3, boxShadow: 6, background: 'linear-gradient(90deg, #2196f3 0%, #00e676 100%)', color: '#fff', fontSize: 22, fontWeight: 600 }}>
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, fontSize: { xs: 16, md: 22 } }}>
            "{quote}"
          </Typography>
        </Paper>
        <Paper sx={{ display: 'inline-block', px: 2, py: 1, bgcolor: 'rgba(0,230,118,0.9)', color: '#fff', fontWeight: 700, borderRadius: 2, boxShadow: 2, fontSize: 18 }}>
          {todayMotivation}
        </Paper>
      </Box>
    </Box>
  );
} 