import { Box, Typography, Paper, Avatar, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Profile() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const handleLangChange = (e: any) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem('lang', e.target.value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('profile')}
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, maxWidth: 400 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ width: 80, height: 80, mb: 2 }} />
          <TextField fullWidth label={t('body')} sx={{ mb: 2 }} />
          <TextField fullWidth label={t('workout')} sx={{ mb: 2 }} />
          <TextField fullWidth label={t('motivation')} sx={{ mb: 2 }} />
          <Button variant="contained" color="primary" fullWidth>{t('save')}</Button>
        </Box>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>{t('language')}</InputLabel>
          <Select value={lang} label={t('language')} onChange={handleLangChange}>
            <MenuItem value="ru">{t('russian')}</MenuItem>
            <MenuItem value="en">{t('english')}</MenuItem>
          </Select>
        </FormControl>
      </Paper>
    </Box>
  );
} 