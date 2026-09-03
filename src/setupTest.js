import '@testing-library/jest-dom';

// Global mock for ResizeObserver needed by AG Grid in Vitest
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};