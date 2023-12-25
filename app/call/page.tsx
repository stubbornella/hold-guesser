
import React from 'react';
import Image from 'next/image';

// define the type of the climber 
type Climber = {
  name: string;
  imageUrl: string;
  rightHand?: string[];
  leftHand?: string[];
  width?: number;
  height?: number;
};

// define the type of the climbers array
type Climbers = Climber[];

// dummy data structure for climbers
const climbers: Climbers = [
  { name: 'Alex Ondra', 
    imageUrl: '/climbers/1.png', 
    rightHand: ['276px', '278px'], 
    width: 1076,
    height:1568 }/*,
  { name: 'Adam Megos', imageUrl: '/climbers/2.png' } ,
  { name: 'Chris Sharma', imageUrl: '/climbers/3.jpg' },
  { name: 'Margo Hayes', imageUrl: '/climbers/4.jpg' },
  { name: 'Nalle Hukkataival', imageUrl: '/climbers/5.jpg' },
  { name: 'Nina Williams', imageUrl: '/climbers/6.jpg' },
  { name: 'Paul Robinson', imageUrl: '/climbers/7.jpg' },
  { name: 'Shauna Coxsey', imageUrl: '/climbers/8.jpg' },
  { name: 'Tommy Caldwell', imageUrl: '/climbers/9.jpg' },
  { name: 'Tomoa Narasaki', imageUrl: '/climbers/10.jpg' },
  { name: 'Yoshiyuki Ogata', imageUrl: '/climbers/11.jpg' }*/
  // add more climbers as needed
];
// background 247, 243, 228
const CallGame: React.FC = () => {
  return (
    <div className='wall'>
        <h1>Climbing Blind</h1>
        <div className='hold'></div>
        <div className='climber'>
            <div className='current-limb right-hand' style={{top:'20.5%', left:'87%'}}></div>
            <div className='current-limb left-hand' style={{top:'43.5%', left:'28%'}}></div>
            <Image
            src={climbers[0].imageUrl}
            alt={climbers[0].name}
            width={1076}
            height={1568}
            priority
            />
        </div>
        <div className='controls flex space-x-4'>
            <button title="left hand" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full">
                L
            </button>
            <button title="right hand" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full">
                R
            </button>
        </div>
        <div className='spotlight'></div>
    </div>
  );
};

export default CallGame;
