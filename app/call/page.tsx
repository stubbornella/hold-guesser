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
  currentLimb?: string;
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
      rightHand: { top: 49, left: 409 },
      leftHand: { top: 228, left: 101 },
      leftFoot: { top: 359, left: 6 },
      rightFoot: { top: 576, left: 263 },
    }, 
    width: 447,
    height: 594 
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
  const [score, setScore] = useState(0);
  const [call, setCall] = useState('');

  useEffect(() => {
    setCurrentClimber({
      ...currentClimber,
      currentLimb: Math.random() < 0.5 ? 'rightHand' : 'leftHand'
    });
  }, []);

  const guessHand = (hand: string) => {
    if (hand === currentClimber.currentLimb) {
      setScore(score + 1);
      setCall(hand);
    } else {
      setScore(score - 1);
    }
    setCurrentClimber({
      ...currentClimber,
      currentLimb: Math.random() < 0.5 ? 'rightHand' : 'leftHand'
    });
  };

  const leftOffset = (limb: string): string => {
    if (!currentClimber || !currentClimber.coordinates || !limb || !currentClimber.coordinates[limb]) {
      return '-5px'; // or some other default value
    }
    const { width, coordinates } = currentClimber;
    const left = currentClimber.coordinates[limb].left;
  
    if (!width) return '-5px';
    
    const percentage = (left / width) * 100;
    return `${percentage}%`;
  };

  const topOffset = (limb: string): string => {
    if (!currentClimber || !currentClimber.coordinates || !limb || !currentClimber.coordinates[limb]) {
      return '-5px'; // or some other default value
    }
    const { height, coordinates } = currentClimber;
    const top = currentClimber.coordinates[limb].top;
  
    if (!height) return '-5px';
    
    const percentage = (top / height) * 100;
    return `${percentage}%`;
  };

  type Hold = {
    position: { top: string, left: string },
    type: string,
    label: string,
    status: string,
  };
  
  type HoldsProps = {
    holds: Hold[],
  };

  const holds = [
    { position: { 
      top: topOffset('leftHand'), 
      left: leftOffset('leftHand') }, 
      type: 'used', label: 'used, move from this hold', status: 'selected' },
    { position: { 
      top: topOffset('rightHand'), 
      left: leftOffset('rightHand') },
      type: 'used', label: 'used', status: '' },
    { position: { 
      top: topOffset('leftFoot'), 
      left: leftOffset('leftFoot') }, 
      type: 'used', label: 'used', status: '' },
    { position: { 
      top: topOffset('rightFoot'), 
      left: leftOffset('rightFoot') }, 
      type: 'used', label: 'used', status: '' },
    { position: { top: '30px', left: '40px' }, type: 'next', label: 'to this hold', status: '' },
  ];
  
  const Holds: React.FC<HoldsProps> = ({ holds }) => {
    return (
      <>
        {holds.map((hold, index) => (
          <div
            key={index}
            className={`hold ${hold.type} ${hold.status}`}
            style={{ top: hold.position.top, left: hold.position.left }}
          >
            <span className='sr-only'>{hold.label} maybe put coordinates?</span>
          </div>
        ))}
      </>
    );
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
        <div className='score'>Score: {score}</div>
        <div className='climber'>
          <Holds holds={holds} />
          <Image
            src={climbers[0].imageUrl}
            alt={climbers[0].name}
            width={climbers[0].width}
            height={climbers[0].height}
            longdesc={'a climber against a backdrop of a climbing wall, four subtle dark holds are currently used. One limb will move next, it is encircled by a yellow halo. A new hold is highlighted (how?) to move it to'}
            priority
          />
        </div>
        <div className='call'>Call: {call} - 6 - 3 (show call as it is being built by player)</div>
        <div className='btn-group'>
          <button className='btn left' onClick={() => guessHand('leftHand')} title="left hand">
              L
          </button>
          <button className='btn right' onClick={() => guessHand('rightHand')} title="right hand">
              R
          </button>
        </div>
    </div>
  );
};

export default CallGame;