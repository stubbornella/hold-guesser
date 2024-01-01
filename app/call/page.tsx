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
  const getRandomLimb = () => {
    const limbs = ['leftHand', 'rightHand', 'leftFoot', 'rightFoot'];
    return limbs[Math.floor(Math.random() * limbs.length)];
  };
  const [currentClimber, setCurrentClimber] = useState<Climber>(climbers[0]);
  const [currentLimb, setCurrentLimb] = useState<string>('');
  const [score, setScore] = useState(0);
  const [call, setCall] = useState<CallProps>({ limb: '', direction: '', distance: '' });

  useEffect(() => {
    setCurrentLimb(getRandomLimb());
  }, []);

  const guessHand = (hand: string) => {
    if (hand === currentLimb) {
      console.log(hand, currentLimb);
      setScore(score + 1);
      setCall({limb: hand});
      setCurrentLimb(getRandomLimb());
    } else {
      console.log(hand, currentLimb);
      clearCall();
      setScore(score - 1);
    }
  };

  const displayText = (limb: string) => {    
    switch (limb) {
      case 'rightHand':
        return 'R';
        break;
      case 'leftHand':
        return 'L';
        break;
      case 'leftFoot':
        return 'left foot';
        break;
      case 'rightFoot':
        return 'right foot';
        break;
      default:
        break;
    }
  };

  /* calculate the offset of the hold based on the coordinates of the climber's limbs */
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
    type?: string,
    limb?: string,
  };


  const Hold: React.FC<Hold> = ({limb, type}) => {
    let cssTop: string;
    let cssLeft: string;
    let highlightHold: string = '';
    let label: string = '';
    let numberOfHoldImages = 5; //increase this number as more hold images are added
    const holdImageNumber = Math.floor(Math.random() * numberOfHoldImages) + 1;

    // position holds
    if (limb) { // the climber is standing on the hold, place it near their limbs
      cssTop = topOffset(limb);
      cssLeft = leftOffset(limb);
    } else { // otherwise, randomly place holds around the wall (or other position relative container)
      cssTop = `${Math.random() * 100}%`;
      cssLeft = `${Math.random() * 100}%`;
    }

    // climber will move from this hold
    if (limb === currentLimb) {
      highlightHold = 'moveFromHold';
      label = 'move from this hold';
    }
    
    const holdProps = {
      className: `hold ${type} ${limb} ${highlightHold}`,
      style: { top: cssTop, left: cssLeft },
    };

    const holdText = (limb: string) => {
      return (
        <>
          <span className='limb'>{displayText(limb)}</span>
          <span className='sr-only'>{limb} Coordinates {cssTop}, {cssLeft}</span>
        </>
      );
    };

    if (type === 'in-use') {
      return (
        <button
          onClick={() => guessHand(limb)}
          {...holdProps}>
          {holdText(limb)}
        </button>
      );
    } else if (type === 'next' || type === 'random') {
      return (
        <div {...holdProps}>
          <img
            src={`/hold/${holdImageNumber}.png`}
            alt={hold}
          />
          {holdText(limb)};
        </div>
      );
    } else {
      return 'HOLD TYPE UNKNOWN'; // or some better default value
    }
  }

  const CurrentHolds: React.FC = () => (
    <>
      <Hold type='in-use' limb='leftHand' />
      <Hold type='in-use' limb='rightHand' />
      <Hold type='in-use' limb='leftFoot' />
      <Hold type='in-use' limb='rightFoot' />
    </>
  );
  
  type CallProps = {
    limb?: string,
    direction?: string,
    distance?: string,
  };

  const Call: React.FC<CallProps> = ({ limb, direction, distance }) => {
    return (
      <div className='call'>
        <span className='limb'>{displayText(limb)}</span>
        <span className='direction'>{direction}</span>
        <span className='distance'>{distance}</span>
      </div>
    );
  };

// function to clear all the values from the call
  const clearCall = () => {
    setCall({});
  };

  
  return (
    <div className='wall'>
        <h1>
          Climb assist
        </h1>
        <div className='score'>Score: {score}</div>
        <Call {...call} />
        <div className='climber'>
          <CurrentHolds />
          <Image
            src={climbers[0].imageUrl}
            alt={climbers[0].name}
            width={climbers[0].width}
            height={climbers[0].height}
            longdesc={'a climber against a backdrop of a climbing wall, four subtle dark holds are currently used. One limb will move next, it is encircled by a yellow halo. A new hold is highlighted (how?) to move it to'}
            priority
          />
        </div> 
        
    </div>
  );
};

export default CallGame;