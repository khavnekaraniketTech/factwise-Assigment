import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EmployeeProvider } from './context/EmployeeContext';
import EmployeeDashboard from './pages/EmployeeDashboard';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <EmployeeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </EmployeeProvider>
  );
}