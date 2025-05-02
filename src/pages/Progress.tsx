import { useState, useEffect } from 'react';
import {
  Box, Paper, Typography, Grid, Select, MenuItem, FormControl, InputLabel, TextField
} from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

interface Measurement {
  date: string;
  weight: number;
  shoulders: number;
  chest: number;
  waist: number;
  biceps: number;
  forearm: number;
  thigh: number;
}

interface WorkoutDay {
  date: string; // YYYY-MM-DD
  exercises: { name: string; sets: { reps: number; weight: number }[] }[];
}

export default function Progress() {
  const { t } = useTranslation();
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [selectedMetric, setSelectedMetric] = useState('weight');
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [workouts, setWorkouts] = useState<WorkoutDay[]>([]);

  useEffect(() => {
    const savedMeasurements = localStorage.getItem('bodyMeasurements');
    if (savedMeasurements) {
      const parsedMeasurements = JSON.parse(savedMeasurements).map((m: any) => ({
        ...m,
        date: new Date(m.date).toISOString().slice(0, 10),
      }));
      setMeasurements(parsedMeasurements);
    }
    const savedWorkouts = localStorage.getItem('workoutDays');
    if (savedWorkouts) {
      setWorkouts(JSON.parse(savedWorkouts));
    }
  }, []);

  // Фильтрация по диапазону дат
  const filteredMeasurements = measurements.filter(m => {
    const d = new Date(m.date);
    return (!dateFrom || d >= dateFrom) && (!dateTo || d <= dateTo);
  });

  // Готовим данные для графика активности тренировок
  const workoutActivity = workouts
    .filter(w => {
      const d = new Date(w.date);
      return (!dateFrom || d >= dateFrom) && (!dateTo || d <= dateTo);
    })
    .map(w => ({
      date: w.date,
      exercises: w.exercises.length,
      sets: w.exercises.reduce((sum, ex) => sum + ex.sets.length, 0),
    }));

  const getMetricLabel = (metric: string) => {
    const labels: { [key: string]: string } = {
      weight: 'Вес (кг)',
      shoulders: 'Обхват плеч (см)',
      chest: 'Обхват груди (см)',
      waist: 'Обхват талии (см)',
      biceps: 'Обхват бицепса (см)',
      forearm: 'Обхват предплечья (см)',
      thigh: 'Обхват бедра (см)',
    };
    return labels[metric] || metric;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#ff0000', textShadow: '1px 1px 6px #000' }}>
          {t('progress')}
        </Typography>
        <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 3, background: 'linear-gradient(90deg, #2d0000 0%, #a30000 100%)', color: '#fff' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>{t('selectDate')}</InputLabel>
                <Select
                  value={selectedMetric}
                  label={t('selectDate')}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                >
                  <MenuItem value="weight">{t('weight')}</MenuItem>
                  <MenuItem value="shoulders">{t('shoulders')}</MenuItem>
                  <MenuItem value="chest">{t('chest')}</MenuItem>
                  <MenuItem value="waist">{t('waist')}</MenuItem>
                  <MenuItem value="biceps">{t('biceps')}</MenuItem>
                  <MenuItem value="forearm">{t('forearm')}</MenuItem>
                  <MenuItem value="thigh">{t('thigh')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3}>
              <DatePicker
                label={t('from')}
                value={dateFrom}
                onChange={setDateFrom}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <DatePicker
                label={t('to')}
                value={dateTo}
                onChange={setDateTo}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
          </Grid>
        </Paper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, mb: 3, background: 'rgba(45,0,0,0.85)', color: '#fff' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#ff2222', textShadow: '1px 1px 6px #000' }}>
                {t('chart')}: {getMetricLabel(selectedMetric)}
              </Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={filteredMeasurements}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey={selectedMetric}
                      name={getMetricLabel(selectedMetric)}
                      stroke="#ff2222"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, mb: 3, background: 'rgba(45,0,0,0.85)', color: '#fff' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#ff2222', textShadow: '1px 1px 6px #000' }}>
                {t('activity')}
              </Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={workoutActivity} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="exercises" name={t('exercises')} fill="#a30000" />
                    <Bar dataKey="sets" name={t('setsCount')} fill="#ff2222" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
} 