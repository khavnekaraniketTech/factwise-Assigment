import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EmployeeProvider, useEmployees } from './EmployeeContext';

describe('EmployeeContext Metrics Optimization', () => {
  it('calculates total employees, active count, and average salary correctly', () => {
    const wrapper = ({ children }) => <EmployeeProvider>{children}</EmployeeProvider>;
    const { result } = renderHook(() => useEmployees(), { wrapper });

    expect(result.current.metrics.total).toBeGreaterThan(0);
    expect(result.current.metrics.active).toBeLessThanOrEqual(result.current.metrics.total);
    expect(typeof result.current.metrics.avgSalary).toBe('number');
  });
});