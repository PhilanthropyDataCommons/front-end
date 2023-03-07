import React from 'react';
import { render, screen } from '@testing-library/react';
import { Placeholder } from './Placeholder';

test('renders app name', () => {
  render(<Placeholder />);
  const nameElement = screen.getByText(/data viewer/i);
  expect(nameElement).toBeInTheDocument();
});
