import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatusCellRenderer, SkillsCellRenderer } from './CustomRenderers';

describe('CustomRenderers', () => {
  it('renders Active badge when status is true', () => {
    render(<StatusCellRenderer value={true} />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders Inactive badge when status is false', () => {
    render(<StatusCellRenderer value={false} />);
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  it('renders skill pills correctly', () => {
    const skills = ['React', 'Node.js'];
    render(<SkillsCellRenderer value={skills} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });
});