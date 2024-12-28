import React, { createContext, useContext, useState } from 'react';
import { Teacher } from '#/entity'; // Assuming Staff is defined in your entity module

interface StaffContextProps {
  staffData: Teacher[];
  addStaff: (staff: Teacher) => void;
  updateStaff: (staff: Teacher) => void;
  deleteStaff: (id: string) => void; // Function to delete staff by ID
}

const StaffContext = createContext<StaffContextProps | undefined>(undefined);

export const StaffProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [staffData, setStaffData] = useState<Teacher[]>([]);
  console.log('Staff data:', staffData);
  // Function to add a new staff member
  const addStaff = (staff: Teacher) => {
    setStaffData((prev) => [...prev, staff]);
  };

  // Function to update an existing staff member
  const updateStaff = (staff: Teacher) => {
    setStaffData((prev) =>
      prev.map((s) => (s.id === staff.id ? { ...s, ...staff } : s)) // Update staff with matching ID
    );
  };

  // Function to delete a staff member by ID
  const deleteStaff = (id: string) => {
    setStaffData((prev) => prev.filter((staff) => staff.id !== id)); // Remove staff by ID
  };

  return (
    <StaffContext.Provider value={{ staffData, addStaff, updateStaff, deleteStaff }}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaffContext = () => {
  const context = useContext(StaffContext);
  if (!context) {
    throw new Error('useStaffContext must be used within a StaffProvider');
  }
  return context;
};
