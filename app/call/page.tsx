'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// define the type of the climber 
type Climber = {
  name: string;
  imageUrl: string;
  coordinates: Coordinates;
  width?: number;
  height?: number;
};

// define the type of the climbers array
type Climbers = Climber[];

// Define coordinate to match the data structure in the climbers array
type Coordinate = {
  top: number;
  left: number;
};

// define coordinates to match the data structure in the climbers array
type Coordinates = {
  rightHand: Coordinate;
  leftHand: Coordinate;
  rightFoot: Coordinate;
  leftFoot: Coordinate;
};

// add a notion of a currentClimber
type CurrentClimber = {
  climber: Climber;
  currentLimb: string;
  top: number;
  left: number;
};

const leftOffset = (climber: Climber, currentLimb: string): string => { // hardcoded rightHand for now where function is called
  const { width, coordinates } = climber;
  const { left } = coordinates[currentLimb as keyof Coordinates];

  if (!width) return '-5px';
  
  const percentage = (left / width) * 100;
  return `${percentage}%`;
}

const topOffset = (climber: Climber, currentLimb: string): string => { // hardcoded rightHand for now where function is called
  const { height, coordinates } = climber;
  const { top } = coordinates[currentLimb as keyof Coordinates]; // TODO: this line is throwing an error when I use highlightedHand rather than hardcoding the string

  if (!height) return '-5px';
  
  const percentage = (top / height) * 100;
  return `${percentage}%`;
}
/*
const leftOffset = (climber: Climber, currentLimb: string): String => {
  if (!climber.width) return '-5px';
  switch (currentLimb) {
    case 'right-hand':
      return (climber.coordinates.rightHand.left / climber.width) * 100 + '%';
    case 'left-hand':
      return (climber.coordinates.leftHand.left/climber.width) * 100 + '%';
    case 'right-foot':
      return (climber.coordinates.rightFoot.left/climber.width) * 100 + '%';
    case 'left-foot':
      return (climber.coordinates.leftFoot.left/climber.width) * 100 + '%';
    default:
      return '-5px'; // should never happen, not sure what the right value is here
  }
} 
*/
/*
const topOffset = (climber: Climber, currentLimb: string): String => {
  if (!climber.height) return '-5px';
  switch (currentLimb) {
    case 'right-hand':
      return (climber.coordinates.rightHand.top / climber.height) * 100 + '%';
    case 'left-hand':
      return (climber.coordinates.leftHand.top/climber.height) * 100 + '%';
    case 'right-foot':
      return (climber.coordinates.rightFoot.top/climber.height) * 100 + '%';
    case 'left-foot':
      return (climber.coordinates.leftFoot.top/climber.height) * 100 + '%';
    default:
      return '-5px'; // should never happen, not sure what the right value is here
  }
} 
*/
// dummy data structure for climbers
const climbers: Climbers = [
  { 
    name: 'Alex Ondra', 
    imageUrl: '/climbers/1.png',
    coordinates: {
      rightHand: { top: 321, left: 936 },
      leftHand: { top: 682, left: 301 },
      rightFoot: { top: 5, left: 5 },
      leftFoot: { top: 5, left: 5 },
    }, 
    width: 1076,
    height: 1568 
  },
  // add more climbers as needed
];

// game that teaches people who don't know their right from their left how to call a climb for a visually impaired climber

const CallGame: React.FC = () => {
  const [highlightedHand, setHighlightedHand] = useState('');

  useEffect(() => {
    setHighlightedHand(Math.random() < 0.5 ? 'rightHand' : 'leftHand');
  }, []);

  const guessHand = (hand: string) => {
    if (hand === highlightedHand) {
      alert('Correct!');
    } else {
      alert('Incorrect!');
    }
    setHighlightedHand(Math.random() < 0.5 ? 'rightHand' : 'leftHand');
  };

  return (
    <div className='wall'>
        <h1>Climbing Blind</h1>
        <div className='hold'></div>
        <div className='climber'>
          <Image
            src={climbers[0].imageUrl}
            alt={climbers[0].name}
            width={climbers[0].width}
            height={climbers[0].height}
            priority
          />
          <div className={`current-limb`} style={{top: topOffset(climbers[0], 'rightHand'), left: leftOffset(climbers[0], 'rightHand')}}>
            {highlightedHand}  
          </div>
        </div>
        <div>Call: R - 6 - 3 (show call as it is being built by player)</div>
        <div className='controls flex rounded-full'>
          <button onClick={() => guessHand('leftHand')} title="left hand" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-l">
              L
          </button>
          <button onClick={() => guessHand('rightHand')} title="right hand" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-r">
              R
          </button>
        </div>
    </div>
  );
};

export default CallGame;