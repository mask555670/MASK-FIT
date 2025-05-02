import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

interface Set {
  reps: number;
  weight: number;
}

interface Exercise {
  name: string;
  sets: Set[];
}

interface WorkoutDay {
  date: string; // YYYY-MM-DD
  exercises: Exercise[];
}

function formatDate(date: Date | null) {
  if (!date) return '';
  return date.toISOString().slice(0, 10);
}

export default function Workout() {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [workouts, setWorkouts] = useState<WorkoutDay[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<WorkoutDay | null>(null);
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const [newExercise, setNewExercise] = useState('');
  const [setInputs, setSetInputs] = useState<{ [key: number]: { reps: string; weight: string } }>({});
  const [editing, setEditing] = useState<{ exIdx: number; setIdx: number } | null>(null);
  const [editValues, setEditValues] = useState<{ reps: string; weight: string }>({ reps: '', weight: '' });
  const [editingExercise, setEditingExercise] = useState<{ exIdx: number } | null>(null);
  const [editExerciseName, setEditExerciseName] = useState('');

  // Загрузка из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('workoutDays');
    if (saved) setWorkouts(JSON.parse(saved));
  }, []);
  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem('workoutDays', JSON.stringify(workouts));
  }, [workouts]);

  // Получить упражнения для выбранной даты
  const currentExercises = (() => {
    const day = workouts.find(w => w.date === formatDate(selectedDate));
    return day ? day.exercises : [];
  })();

  const handleOpenDialog = (workout?: WorkoutDay) => {
    if (workout) {
      setEditingWorkout(workout);
      setNewWorkoutName(workout.date);
    } else {
      setEditingWorkout(null);
      setNewWorkoutName('');
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingWorkout(null);
    setNewWorkoutName('');
  };

  const handleAddWorkout = () => {
    if (newWorkoutName.trim()) {
      let updated = [...workouts];
      const idx = updated.findIndex(w => w.date === formatDate(selectedDate));
      if (idx === -1) {
        updated.push({ date: formatDate(selectedDate), exercises: currentExercises });
      } else {
        updated[idx].exercises = currentExercises;
      }
      setWorkouts(updated);
      handleCloseDialog();
    }
  };

  const handleDeleteWorkout = (date: string) => {
    setWorkouts(prev => prev.filter(w => w.date !== date));
    const updatedWorkouts = workouts.filter(w => w.date !== date);
    localStorage.setItem('workoutDays', JSON.stringify(updatedWorkouts));
  };

  const handleAddExercise = () => {
    if (newExercise.trim()) {
      let updated = [...workouts];
      const idx = updated.findIndex(w => w.date === formatDate(selectedDate));
      if (idx === -1) {
        updated.push({ date: formatDate(selectedDate), exercises: [{ name: newExercise, sets: [] }] });
      } else {
        updated[idx].exercises.push({ name: newExercise, sets: [] });
      }
      setWorkouts(updated);
      setNewExercise('');
    }
  };

  const handleDeleteExercise = (exIdx: number) => {
    let updated = [...workouts];
    const idx = updated.findIndex(w => w.date === formatDate(selectedDate));
    if (idx !== -1) {
      updated[idx].exercises.splice(exIdx, 1);
      setWorkouts(updated);
    }
  };

  const handleAddSet = (exIdx: number) => {
    const input = setInputs[exIdx] || { reps: '', weight: '' };
    const reps = parseInt(input.reps);
    const weight = parseFloat(input.weight);
    if (!isNaN(reps) && !isNaN(weight)) {
      let updated = [...workouts];
      const idx = updated.findIndex(w => w.date === formatDate(selectedDate));
      if (idx !== -1) {
        updated[idx].exercises[exIdx].sets.push({ reps, weight });
        setWorkouts(updated);
        setSetInputs({ ...setInputs, [exIdx]: { reps: '', weight: '' } });
      }
    }
  };

  const handleDeleteSet = (exIdx: number, setIdx: number) => {
    let updated = [...workouts];
    const idx = updated.findIndex(w => w.date === formatDate(selectedDate));
    if (idx !== -1) {
      updated[idx].exercises[exIdx].sets.splice(setIdx, 1);
      setWorkouts(updated);
    }
  };

  // --- Редактирование подхода ---
  const startEditSet = (exIdx: number, setIdx: number) => {
    setEditing({ exIdx, setIdx });
    setEditValues({
      reps: currentExercises[exIdx].sets[setIdx].reps.toString(),
      weight: currentExercises[exIdx].sets[setIdx].weight.toString(),
    });
  };
  const cancelEditSet = () => {
    setEditing(null);
    setEditValues({ reps: '', weight: '' });
  };
  const saveEditSet = () => {
    if (editing) {
      const { exIdx, setIdx } = editing;
      const reps = parseInt(editValues.reps);
      const weight = parseFloat(editValues.weight);
      if (!isNaN(reps) && !isNaN(weight)) {
        let updated = [...workouts];
        const idx = updated.findIndex(w => w.date === formatDate(selectedDate));
        if (idx !== -1) {
          updated[idx].exercises[exIdx].sets[setIdx] = { reps, weight };
          setWorkouts(updated);
          setEditing(null);
          setEditValues({ reps: '', weight: '' });
        }
      }
    }
  };

  // --- Редактирование упражнения ---
  const startEditExercise = (exIdx: number) => {
    setEditingExercise({ exIdx });
    setEditExerciseName(currentExercises[exIdx].name);
  };
  const cancelEditExercise = () => {
    setEditingExercise(null);
    setEditExerciseName('');
  };
  const saveEditExercise = () => {
    if (editingExercise) {
      let updated = [...workouts];
      const idx = updated.findIndex(w => w.date === formatDate(selectedDate));
      if (idx !== -1) {
        updated[idx].exercises[editingExercise.exIdx].name = editExerciseName;
        setWorkouts(updated);
        setEditingExercise(null);
        setEditExerciseName('');
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#ff0000', textShadow: '1px 1px 6px #000' }}>
          {t('workout')}
        </Typography>
        <Box sx={{ mb: 3, maxWidth: 300 }}>
          <DatePicker
            label="Дата тренировки"
            value={selectedDate}
            onChange={setSelectedDate}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Box>
        <Paper sx={{ p: 3, mb: 2, borderRadius: 3, boxShadow: 3, background: 'linear-gradient(90deg, #2d0000 0%, #a30000 100%)', color: '#fff' }}>
          <Typography>Здесь будут ваши тренировки.</Typography>
          <Button variant="contained" sx={{ mt: 2, background: '#ff2222', color: '#fff', fontWeight: 700, borderRadius: 2, boxShadow: 2, letterSpacing: 1 }} onClick={() => handleOpenDialog()}>
            Добавить тренировку
          </Button>
        </Paper>

        <List>
          {workouts.map(workout => (
            <Paper key={workout.date} sx={{ mb: 2, background: 'rgba(45,0,0,0.85)', color: '#fff', borderRadius: 2 }}>
              <ListItem>
                <ListItemText
                  primary={workout.date}
                  secondary={`${workout.exercises.length} упражнений`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleOpenDialog(workout)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteWorkout(workout.date)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          ))}
        </List>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth PaperProps={{ sx: { background: 'rgba(45,0,0,0.97)', color: '#fff' } }}>
          <DialogTitle>
            {editingWorkout ? 'Редактировать тренировку' : 'Новая тренировка'}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Название тренировки"
              fullWidth
              value={newWorkoutName}
              onChange={e => setNewWorkoutName(e.target.value)}
            />

            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              Упражнения
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                label="Новое упражнение"
                value={newExercise}
                onChange={e => setNewExercise(e.target.value)}
                size="small"
              />
              <Button variant="contained" color="primary" onClick={handleAddExercise} startIcon={<AddIcon />}>{t('add')}</Button>
            </Box>

            <List>
              {currentExercises.map((ex, exIdx) => (
                <Paper key={exIdx} sx={{ mb: 3, p: 2, borderRadius: 2, boxShadow: 1, background: 'rgba(45,0,0,0.85)', color: '#fff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {editingExercise && editingExercise.exIdx === exIdx ? (
                      <>
                        <TextField
                          value={editExerciseName}
                          onChange={e => setEditExerciseName(e.target.value)}
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <IconButton color="success" onClick={saveEditExercise}><CheckIcon /></IconButton>
                        <IconButton color="error" onClick={cancelEditExercise}><CloseIcon /></IconButton>
                      </>
                    ) : (
                      <>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>{ex.name}</Typography>
                        <IconButton onClick={() => startEditExercise(exIdx)}><EditIcon /></IconButton>
                        <IconButton onClick={() => handleDeleteExercise(exIdx)}><DeleteIcon /></IconButton>
                      </>
                    )}
                  </Box>
                  <List dense>
                    {ex.sets.map((set, setIdx) => (
                      <ListItem key={setIdx} secondaryAction={
                        editing && editing.exIdx === exIdx && editing.setIdx === setIdx ? (
                          <>
                            <IconButton edge="end" color="success" onClick={saveEditSet}><CheckIcon /></IconButton>
                            <IconButton edge="end" color="error" onClick={cancelEditSet}><CloseIcon /></IconButton>
                          </>
                        ) : (
                          <>
                            <IconButton edge="end" onClick={() => startEditSet(exIdx, setIdx)}><EditIcon /></IconButton>
                            <IconButton edge="end" onClick={() => handleDeleteSet(exIdx, setIdx)}><DeleteIcon /></IconButton>
                          </>
                        )
                      }>
                        {editing && editing.exIdx === exIdx && editing.setIdx === setIdx ? (
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', width: '100%' }}>
                            <TextField
                              label={t('reps')}
                              type="number"
                              size="small"
                              value={editValues.reps}
                              onChange={e => setEditValues(v => ({ ...v, reps: e.target.value }))}
                              sx={{ width: 100 }}
                            />
                            <TextField
                              label={t('weight')}
                              type="number"
                              size="small"
                              value={editValues.weight}
                              onChange={e => setEditValues(v => ({ ...v, weight: e.target.value }))}
                              sx={{ width: 100 }}
                            />
                          </Box>
                        ) : (
                          <ListItemText primary={`Подход ${setIdx + 1}: ${set.reps} повторений × ${set.weight} кг`} />
                        )}
                      </ListItem>
                    ))}
                    <ListItem>
                      <TextField
                        label={t('reps')}
                        type="number"
                        size="small"
                        value={setInputs[exIdx]?.reps || ''}
                        onChange={e => setSetInputs({ ...setInputs, [exIdx]: { ...setInputs[exIdx], reps: e.target.value, weight: setInputs[exIdx]?.weight || '' } })}
                        sx={{ mr: 1, width: 110 }}
                      />
                      <TextField
                        label={t('weight')}
                        type="number"
                        size="small"
                        value={setInputs[exIdx]?.weight || ''}
                        onChange={e => setSetInputs({ ...setInputs, [exIdx]: { ...setInputs[exIdx], weight: e.target.value, reps: setInputs[exIdx]?.reps || '' } })}
                        sx={{ mr: 1, width: 110 }}
                      />
                      <Button variant="outlined" onClick={() => handleAddSet(exIdx)} startIcon={<AddIcon />}>{t('addSet')}</Button>
                    </ListItem>
                  </List>
                </Paper>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Отмена</Button>
            <Button onClick={handleAddWorkout} variant="contained" color="primary">
              {editingWorkout ? 'Сохранить' : 'Добавить'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
} 