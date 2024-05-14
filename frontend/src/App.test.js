import React from 'react';
import { screen } from '@testing-library/react';
import { render } from './test-utils';
import App from './App';

test('renders "Choose Delight" button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/choose your delight/i);
  expect(buttonElement).toBeInTheDocument();
});