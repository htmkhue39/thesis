import React from 'react';
import './Grid.css';

const Grid = React.forwardRef(({ mnemonic }, ref) => {
  return (
    <div className="grid-container" ref={ref}>
      {mnemonic.map((word, index) => (
        <div key={index} className="grid-item">
          <div className="grid-item-number">{index + 1}</div>
          <div className="grid-item-word">{word}</div>
        </div>
      ))}
    </div>
  );
});

Grid.displayName = 'Grid';

export default Grid;
