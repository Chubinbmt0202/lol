import React, { createContext, useContext, useState } from 'react';
import { Student } from '#/entity';

interface StudentContextProps {
  studentData: Student[];
  addStudent: (student: Student) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (id: string) => void; // Add the deleteStudent function
}

const StudentContext = createContext<StudentContextProps | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [studentData, setStudentData] = useState<Student[]>([]);

  // Function to add a new student
  const addStudent = (student: Student) => {
    setStudentData((prev) => [...prev, student]);
  };

  // Function to update an existing student
  const updateStudent = (student: Student) => {
    setStudentData((prev) =>
      prev.map((s) => (s.id === student.id ? { ...s, ...student } : s)) // Update the student with matching ID
    );
  };

  // Function to delete a student by id
  const deleteStudent = (id: string) => {
    setStudentData((prev) => prev.filter((student) => student.id !== id)); // Remove student by id
  };

  return (
    <StudentContext.Provider value={{ studentData, addStudent, updateStudent, deleteStudent }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudentContext must be used within a StudentProvider');
  }
  return context;
};
