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
  [key: string]: Coordinate;
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
  const [fail, setFail] = useState(0);
  const [call, setCall] = useState<CallProps>({ limb: '', direction: '', distance: '' });
  const [correctGuessLimb, setCorrectGuessLimb] = useState(false);

  useEffect(() => {
    setCurrentLimb(getRandomLimb());
  }, []);

  const guessHand = (hand: string) => {
    if (hand === currentLimb) {
      setScore(score + 1);
      setCall({limb: hand});
      setCorrectGuessLimb(true);
      setCurrentLimb(getRandomLimb());
    } else {
      clearCall();
      setFail(fail + 1);
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
    limb: string,
  };


  const Hold: React.FC<Hold> = ({limb, type}) => {
    let cssTop: string;
    let cssLeft: string;
    let highlightHold: string = '';
    let label: string = '';
    let numberOfHoldImages = 5; //increase this number as more hold images are added
    const holdImageNumber = Math.floor(Math.random() * numberOfHoldImages) + 1;

    // position holds
    if (limb === 'rightHand' || limb === 'leftHand' || limb === 'rightFoot' || limb === 'leftFoot') { // the climber is standing on the hold, place it near their limbs
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
      const altText = type === 'next' ? 'next hold' : 'random hold';

      /*  sharing coordinates seems to cause mismatches between client and server, I had to remove this code, put it back
          <span className='sr-only'>Coordinates {cssTop}, {cssLeft} TODO: issue here, coordinates are not the same on the server and client. commenting out this line fixes it. Maybe a css issue? Or possibly because the img has no height.</span>

      */

      return (
        <div {...holdProps}>
          <p className='sr-only'>Hold {cssTop}%, {cssLeft}%</p>
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

  const NextHold: React.FC = () => (
    <>
      <Hold type='next' limb='unused' />
    </>
  );
  
  type CallProps = {
    limb: string,
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
    setCall({limb: '', direction: '', distance: ''});
  };

  
  return (
    
    <div className='gym layout-debugging'>
      <h1>Climb with me</h1>
      <div className='header'>
        <p className='sr-only'>A climber against a backdrop of a climbing wall, 
        four dark holds are currently used. 
          One limb will move next, it is encircled by a lemon yellow halo. 
          Inside the halo is the name the caller should say when describing that limb: L, R, left foot, or right foot.
          Your caller should click the limb that will move next to begin to build the call.
          They can see the call in the call box at the bottom of the game. It&apos;ll work best if they say it aloud as they build the call.
          Eventually, once I build it, the caller should then click the direction and distance of the move.  
        </p>
        <h1>
          <div className='mountains'>
            <Image
              src='/black-mountains.png'
              alt='climb with me'
              height={25}
              width={53}
              priority
            />
          </div>
        </h1>
        <div className='logo'>
            <Image
              src='/logo-words.png'
              alt=''
              height={25}
              width={125}
              priority
            />
          </div>
        <div className='score'>
          <table>
                <thead>
                  <tr>
                    <th colSpan={3}>Score</th>
                  </tr>
                  <tr>
                    <th>✅</th>
                    <th>❌</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{score}</td>
                    <td>{fail}</td>
                  </tr>
                </tbody>
            </table>    
        </div>
      </div>
      <div className='wall'>
        {correctGuessLimb && <NextHold />}
        <div className='climber'>
          <CurrentHolds />
          <Image
            src={climbers[0].imageUrl}
            alt={climbers[0].name}
            width={climbers[0].width}
            height={climbers[0].height}
            priority
          />
        </div>
      </div>
      <div className='footer'>
        <Call {...call} />
      </div> 
    </div>
  );
};

export default CallGame;