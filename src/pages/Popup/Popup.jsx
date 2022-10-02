import React from 'react';
import './Popup.css';
import { backgroundColors } from '../Newtab/Newtab';

const backgroundColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

const Popup = () => {
  return (
    <div className="App" style={{ backgroundColor: backgroundColor }}>
      <header className="App-header" style={{ backgroundColor: backgroundColor }}>
        <p>
          you suck :((
        </p>
      </header>
    </div>
  );
};

export default Popup;
