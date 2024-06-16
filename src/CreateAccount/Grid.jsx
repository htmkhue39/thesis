import React from 'react';
import './Grid.css'; // Import file CSS để định dạng

const mnemmonic = [
  "brush", "swing", "cram", "width", "spoon", "visual",
  "typical", "recipe", "obvious", "damp", "smart", "depend"
];

const Grid = () => {
  return (
    <div className="grid-container">
      {mnemmonic.map((mnemmonic, index) => (
        <div key={index} className="grid-item">
            <div className="grid-item-number">{index + 1}</div>
            <div className="grid-item-word">{mnemmonic}</div>
        </div>
      ))}
    </div>
  );
};

export default Grid;
