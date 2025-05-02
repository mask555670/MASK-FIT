import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      welcome: 'Добро пожаловать!',
      profile: 'Профиль',
      body: 'Моё тело',
      workout: 'Тренировки',
      progress: 'Прогресс',
      motivation: 'Мотивация',
      save: 'Сохранить',
      add: 'Добавить',
      addExercise: 'Новое упражнение',
      addSet: 'Добавить подход',
      sets: 'Подходов',
      reps: 'Повторения',
      weight: 'Вес (кг)',
      date: 'Дата',
      selectDate: 'Выберите дату',
      notFound: 'Страница не найдена',
      toMain: 'На главную',
      language: 'Язык',
      russian: 'Русский',
      english: 'Английский',
      shoulders: 'Обхват плеч (см)',
      chest: 'Обхват груди (см)',
      waist: 'Обхват талии (см)',
      biceps: 'Обхват бицепса (см)',
      forearm: 'Обхват предплечья (см)',
      thigh: 'Обхват бедра (см)',
      exercises: 'Упражнений',
      setsCount: 'Подходов',
      activity: 'Активность тренировок',
      chart: 'График изменения',
      from: 'С даты',
      to: 'По дату',
    }
  },
  en: {
    translation: {
      welcome: 'Welcome!',
      profile: 'Profile',
      body: 'My Body',
      workout: 'Workouts',
      progress: 'Progress',
      motivation: 'Motivation',
      save: 'Save',
      add: 'Add',
      addExercise: 'New Exercise',
      addSet: 'Add Set',
      sets: 'Sets',
      reps: 'Reps',
      weight: 'Weight (kg)',
      date: 'Date',
      selectDate: 'Select date',
      notFound: 'Page not found',
      toMain: 'To main',
      language: 'Language',
      russian: 'Russian',
      english: 'English',
      shoulders: 'Shoulders (cm)',
      chest: 'Chest (cm)',
      waist: 'Waist (cm)',
      biceps: 'Biceps (cm)',
      forearm: 'Forearm (cm)',
      thigh: 'Thigh (cm)',
      exercises: 'Exercises',
      setsCount: 'Sets',
      activity: 'Workout Activity',
      chart: 'Progress Chart',
      from: 'From',
      to: 'To',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('lang') || 'ru',
    fallbackLng: 'ru',
    interpolation: { escapeValue: false },
  });

export default i18n; 