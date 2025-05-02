import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

interface BodyMeasurements {
  date: Date;
  weight: number;
  height: number;
  shoulders: number;
  chest: number;
  waist: number;
  biceps: number;
  forearm: number;
  thigh: number;
}

export default function MyBody() {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [measurements, setMeasurements] = useState<BodyMeasurements>({
    date: new Date(),
    weight: 0,
    height: 0,
    shoulders: 0,
    chest: 0,
    waist: 0,
    biceps: 0,
    forearm: 0,
    thigh: 0,
  });

  const [measurementsHistory, setMeasurementsHistory] = useState<BodyMeasurements[]>([]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      setMeasurements(prev => ({ ...prev, date }));
    }
  };

  const handleInputChange = (field: keyof BodyMeasurements) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(event.target.value);
    setMeasurements(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (selectedDate) {
      setMeasurementsHistory(prev => [...prev, measurements]);
      // Здесь можно добавить сохранение в localStorage
      localStorage.setItem('bodyMeasurements', JSON.stringify([...measurementsHistory, measurements]));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <Box sx={{ p: 3 }}>
        <Paper sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          boxShadow: 4,
          background: 'linear-gradient(90deg, #2196f3 0%, #00e676 100%)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {t('motivation')}: {t('welcome')}
          </Typography>
          <Box>
            <Paper sx={{ display: 'inline-block', px: 2, py: 1, bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', fontWeight: 600, borderRadius: 2, boxShadow: 0 }}>
              🏅 7 дней подряд!
            </Paper>
          </Box>
        </Paper>
        <Typography variant="h4" gutterBottom>
          {t('body')}
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                {t('addExercise')}
              </Typography>
              
              <DatePicker
                label={t('date')}
                value={selectedDate}
                onChange={(date) => handleDateChange(date as Date | null)}
                renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
              />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={t('weight')}
                    type="number"
                    value={measurements.weight}
                    onChange={handleInputChange('weight')}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Рост (см)"
                    type="number"
                    value={measurements.height}
                    onChange={handleInputChange('height')}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Обхват плеч (см)"
                    type="number"
                    value={measurements.shoulders}
                    onChange={handleInputChange('shoulders')}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Обхват груди (см)"
                    type="number"
                    value={measurements.chest}
                    onChange={handleInputChange('chest')}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Обхват талии (см)"
                    type="number"
                    value={measurements.waist}
                    onChange={handleInputChange('waist')}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Обхват бицепса (см)"
                    type="number"
                    value={measurements.biceps}
                    onChange={handleInputChange('biceps')}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Обхват предплечья (см)"
                    type="number"
                    value={measurements.forearm}
                    onChange={handleInputChange('forearm')}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Обхват бедра (см)"
                    type="number"
                    value={measurements.thigh}
                    onChange={handleInputChange('thigh')}
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: 2, fontWeight: 600, borderRadius: 2, boxShadow: 2, letterSpacing: 1 }}
                fullWidth
              >
                {t('save')}
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                История измерений
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Дата</TableCell>
                      <TableCell>Вес</TableCell>
                      <TableCell>Рост</TableCell>
                      <TableCell>Плечи</TableCell>
                      <TableCell>Грудь</TableCell>
                      <TableCell>Талия</TableCell>
                      <TableCell>Бицепс</TableCell>
                      <TableCell>Предплечье</TableCell>
                      <TableCell>Бедро</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {measurementsHistory.map((measurement, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {measurement.date.toLocaleDateString()}
                        </TableCell>
                        <TableCell>{measurement.weight}</TableCell>
                        <TableCell>{measurement.height}</TableCell>
                        <TableCell>{measurement.shoulders}</TableCell>
                        <TableCell>{measurement.chest}</TableCell>
                        <TableCell>{measurement.waist}</TableCell>
                        <TableCell>{measurement.biceps}</TableCell>
                        <TableCell>{measurement.forearm}</TableCell>
                        <TableCell>{measurement.thigh}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
} 