import React, { createContext, useContext, useState, useMemo } from 'react';
import rawData from '../data/data.json';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees] = useState(rawData.employees);
  const [quickFilter, setQuickFilter] = useState('');

  // Memoized metric calculations for performance optimization
  const metrics = useMemo(() => {
    const total = employees.length;
    const active = employees.filter((e) => e.isActive).length;
    const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0);
    const avgSalary = total > 0 ? Math.round(totalSalary / total) : 0;

    return { total, active, avgSalary };
  }, [employees]);

  return (
    <EmployeeContext.Provider
      value={{ employees, quickFilter, setQuickFilter, metrics }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => useContext(EmployeeContext);