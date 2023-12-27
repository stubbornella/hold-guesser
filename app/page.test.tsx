import {describe, expect, test} from '@jest/globals';
import { render, fireEvent, screen } from '@testing-library/react';
import CallGame from './page';
import React from 'react';

describe('CallGame', () => {
  test('renders without crashing', () => {
      render(<CallGame />);
      expect(screen.getByText('Score: 0')).toBeInTheDocument();
  });
/*
  test('initial score is 0', () => {
    render(<CallGame />);
    expect(screen.getByText('Score: 0')).toBeInTheDocument();
  });

  // This test assumes that you have a button for guessing the hand
  // and that the button has a 'Guess' text.
  test('score increments when user guesses correctly', () => {
    render(<CallGame />);
    const guessButton = screen.getByText('Guess');
    fireEvent.click(guessButton);
    expect(screen.getByText('Score: 1')).toBeInTheDocument();
  });
*/
});