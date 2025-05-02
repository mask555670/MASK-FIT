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
      <Box sx={{
        p: { xs: 0.5, md: 3 },
        maxWidth: { xs: '100vw', md: '100%' },
        mx: 'auto',
        overflowX: 'hidden',
      }}>
        <Paper sx={{
          p: { xs: 1, md: 3 },
          mb: { xs: 1, md: 3 },
          borderRadius: 3,
          boxShadow: 4,
          background: 'linear-gradient(90deg, #2196f3 0%, #00e676 100%)',
          color: '#fff',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
          minWidth: 0,
          maxWidth: { xs: '100vw', md: '100%' },
        }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: 14, sm: 20, md: 24 } }}>
            {t('motivation')}: {t('welcome')}
          </Typography>
          <Box>
            <Paper sx={{ display: 'inline-block', px: 2, py: 1, bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', fontWeight: 600, borderRadius: 2, boxShadow: 0, fontSize: { xs: 10, sm: 16 } }}>
              🏅 7 дней подряд!
            </Paper>
          </Box>
        </Paper>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: 18, md: 32 } }}>
          {t('body')}
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 1, md: 3 }, borderRadius: 3, boxShadow: 3, mb: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: 14, md: 20 } }}>
                {t('addExercise')}
              </Typography>
              <DatePicker
                label={t('date')}
                value={selectedDate}
                onChange={(date) => handleDateChange(date as Date | null)}
                renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 1 }} size="small" />}
              />
              <Grid container spacing={0.5} direction="column">
                <Grid item xs={12}><TextField fullWidth label={t('weight')} type="number" value={measurements.weight} onChange={handleInputChange('weight')} size="small" sx={{ mb: 0.5 }} inputProps={{ style: { fontSize: 14 } }} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Рост (см)" type="number" value={measurements.height} onChange={handleInputChange('height')} size="small" sx={{ mb: 0.5 }} inputProps={{ style: { fontSize: 14 } }} /></Grid>
                <Grid item xs={12}><TextField fullWidth label={t('shoulders')} type="number" value={measurements.shoulders} onChange={handleInputChange('shoulders')} size="small" sx={{ mb: 0.5 }} inputProps={{ style: { fontSize: 14 } }} /></Grid>
                <Grid item xs={12}><TextField fullWidth label={t('chest')} type="number" value={measurements.chest} onChange={handleInputChange('chest')} size="small" sx={{ mb: 0.5 }} inputProps={{ style: { fontSize: 14 } }} /></Grid>
                <Grid item xs={12}><TextField fullWidth label={t('waist')} type="number" value={measurements.waist} onChange={handleInputChange('waist')} size="small" sx={{ mb: 0.5 }} inputProps={{ style: { fontSize: 14 } }} /></Grid>
                <Grid item xs={12}><TextField fullWidth label={t('biceps')} type="number" value={measurements.biceps} onChange={handleInputChange('biceps')} size="small" sx={{ mb: 0.5 }} inputProps={{ style: { fontSize: 14 } }} /></Grid>
                <Grid item xs={12}><TextField fullWidth label={t('forearm')} type="number" value={measurements.forearm} onChange={handleInputChange('forearm')} size="small" sx={{ mb: 0.5 }} inputProps={{ style: { fontSize: 14 } }} /></Grid>
                <Grid item xs={12}><TextField fullWidth label={t('thigh')} type="number" value={measurements.thigh} onChange={handleInputChange('thigh')} size="small" sx={{ mb: 0.5 }} inputProps={{ style: { fontSize: 14 } }} /></Grid>
              </Grid>
              <Box sx={{ position: { xs: 'fixed', md: 'static' }, left: 0, right: 0, bottom: 0, width: { xs: '100vw', md: 'auto' }, zIndex: 1000, p: { xs: 0.5, md: 0 }, bgcolor: { xs: 'background.paper', md: 'transparent' }, boxShadow: { xs: 8, md: 0 } }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  sx={{ mt: 1, fontWeight: 600, borderRadius: 2, boxShadow: 2, letterSpacing: 1, py: 1, fontSize: { xs: 14, md: 18 }, width: '100%' }}
                >
                  {t('save')}
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 1, md: 3 }, borderRadius: 3, boxShadow: 3, mb: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: 14, md: 20 } }}>
                История измерений
              </Typography>
              <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <TableContainer>
                  <Table size="small" sx={{ minWidth: 600 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontSize: { xs: 10, md: 14 }, p: { xs: 0.3, md: 1 } }}>{t('date')}</TableCell>
                        <TableCell sx={{ fontSize: { xs: 10, md: 14 }, p: { xs: 0.3, md: 1 } }}>{t('weight')}</TableCell>
                        <TableCell sx={{ fontSize: { xs: 10, md: 14 }, p: { xs: 0.3, md: 1 } }}>Рост</TableCell>
                        <TableCell sx={{ fontSize: { xs: 10, md: 14 }, p: { xs: 0.3, md: 1 } }}>{t('shoulders')}</TableCell>
                        <TableCell sx={{ fontSize: { xs: 10, md: 14 }, p: { xs: 0.3, md: 1 } }}>{t('chest')}</TableCell>
                        <TableCell sx={{ fontSize: { xs: 10, md: 14 }, p: { xs: 0.3, md: 1 } }}>{t('waist')}</TableCell>
                        <TableCell sx={{ fontSize: { xs: 10, md: 14 }, p: { xs: 0.3, md: 1 } }}>{t('biceps')}</TableCell>
                        <TableCell sx={{ fontSize: { xs: 10, md: 14 }, p: { xs: 0.3, md: 1 } }}>{t('forearm')}</TableCell>
                        <TableCell sx={{ fontSize: { xs: 10, md: 14 }, p: { xs: 0.3, md: 1 } }}>{t('thigh')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {measurementsHistory.map((measurement, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ fontSize: { xs: 10, md: 14 }, p: { xs: 0.3, md: 1 } }}>{measurement.date.toLocaleDateString()}</TableCell>
                          <TableCell sx={{ fontSize: { xs: 10, md: 14 }, p: { xs: 0.3, md: 1 } }}>{measurement.weight}</TableCell>
                          <TableCell sx={{ fontSize: { xs: 10, md: 14 }, p: { xs: 0.3, md: 1 } }}>{measurement.height}</TableCell>
                          <TableCell sx={{ fontSize: { xs: 10, md: 14 }, p: { xs: 0.3, md: 1 } }}>{measurement.shoulders}</TableCell>
                          <TableCell sx={{ fontSize: { xs: 10, md: 14 }, p: { xs: 0.3, md: 1 } }}>{measurement.chest}</TableCell>
                          <TableCell sx={{ fontSize: { xs: 10, md: 14 }, p: { xs: 0.3, md: 1 } }}>{measurement.waist}</TableCell>
                          <TableCell sx={{ fontSize: { xs: 10, md: 14 }, p: { xs: 0.3, md: 1 } }}>{measurement.biceps}</TableCell>
                          <TableCell sx={{ fontSize: { xs: 10, md: 14 }, p: { xs: 0.3, md: 1 } }}>{measurement.forearm}</TableCell>
                          <TableCell sx={{ fontSize: { xs: 10, md: 14 }, p: { xs: 0.3, md: 1 } }}>{measurement.thigh}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
} 