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
  currentLimb?: CurrentLimb;
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
  { 
    name: 'Max Froument', 
    imageUrl: '/climbers/2.png',
    coordinates: {
      rightHand: { top: 321, left: 936 },
      leftHand: { top: 682, left: 301 },
      rightFoot: { top: 5, left: 5 },
      leftFoot: { top: 5, left: 5 },
    }, 
    width: 816,
    height: 1304 
  },
  // add more climbers as needed
];

// game that teaches people who don't know their right from their left how to call a climb for a visually impaired climber

const CallGame: React.FC = () => {
  const [currentClimber, setCurrentClimber] = useState<Climber>(climbers[0]);

  useEffect(() => {
    setCurrentClimber({
      ...currentClimber,
      currentLimb: Math.random() < 0.5 ? 'rightHand' : 'leftHand'
    });
  }, []);

  const guessHand = (hand: string) => {
    if (hand === currentClimber.currentLimb) {
      alert('Correct!');
    } else {
      alert('Incorrect!');
    }
    setCurrentClimber({
      ...currentClimber,
      currentLimb: Math.random() < 0.5 ? 'rightHand' : 'leftHand'
    });
  };

  const leftOffset = (): string => {
    if (!currentClimber || !currentClimber.coordinates || !currentClimber.currentLimb || !currentClimber.coordinates[currentClimber.currentLimb]) {
      return '-5px'; // or some other default value
    }
    const { width, coordinates } = currentClimber;
    const left = currentClimber.coordinates[currentClimber.currentLimb].left;
  
    if (!width) return '-5px';
    
    const percentage = (left / width) * 100;
    return `${percentage}%`;
  };

  const topOffset = (): string => {
    if (!currentClimber || !currentClimber.coordinates || !currentClimber.currentLimb || !currentClimber.coordinates[currentClimber.currentLimb]) {
      return '-5px'; // or some other default value
    }
    const { height, coordinates } = currentClimber;
    
    const top = currentClimber.coordinates[currentClimber.currentLimb].top;
  
    if (!height) return '-5px';
    
    const percentage = (top / height) * 100;
    return `${percentage}%`;
  };
  
  return (
    <div className='wall'>
        <h1>
          <Image
            src='/logo.png'
            alt='Climb Assist'
            height='60'
            width='51'
            priority
          />
        </h1>
        <div className='hold'></div>
        <div className='climber'>
          <Image
            src={climbers[0].imageUrl}
            alt={climbers[0].name}
            width={climbers[0].width}
            height={climbers[0].height}
            priority
          />
          <div className={`current-limb`} 
            style={{
              top: topOffset(), 
              left: leftOffset()}}
            title={currentClimber.currentLimb}>  
          </div>
        </div>
        <div>Call: R - 6 - 3 (show call as it is being built by player)</div>
        <div className='btn-group'>
          <button className='btn' onClick={() => guessHand('leftHand')} title="left hand">
              L
          </button>
          <button className='btn' onClick={() => guessHand('rightHand')} title="right hand">
              R
          </button>
        </div>
    </div>
  );
};

export default CallGame;