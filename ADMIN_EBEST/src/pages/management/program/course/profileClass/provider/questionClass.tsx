import React, { createContext, useContext, useState } from 'react';

interface QuestionData {
  id: number;
  type: 'multiple' | 'essay';
  text: string;
  options?: string[];
  correct?: number;
}

interface ExercisesContextProps {
  exercises: QuestionData[];
  addExercise: (exercise: QuestionData) => void;
  clearExercises: () => void;
}

const ExercisesContext = createContext<ExercisesContextProps | undefined>(undefined);

export const ExercisesProvider: React.FC<{ children: React.ReactNode }> = function ({ children }) {
  const [exercises, setExercises] = useState<QuestionData[]>([]);

  const addExercise = (exercise: QuestionData) => {
    console.log('Adding exercise', exercise);
    setExercises((prev) => [...prev, exercise]);
  };

  const clearExercises = () => {
    setExercises([]);
  };

  const value = React.useMemo(() => ({ exercises, addExercise, clearExercises }), [exercises]);

  return <ExercisesContext.Provider value={value}>{children}</ExercisesContext.Provider>;
};

export const useExercises = () => {
  const context = useContext(ExercisesContext);
  if (!context) {
    throw new Error('useExercises must be used within an ExercisesProvider');
  }
  return context;
};
