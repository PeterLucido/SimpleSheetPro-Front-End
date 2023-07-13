import React from 'react';
import Dive from '../Dive/Dive.jsx';

function ElevenDiveComponent({ dives, handleDiveChange, handleDiveSelect, selectedDiveIndex, diveOptions, inputRef }) {
  return (
    <div className="elevenDiveForm">
      {dives.map((dive, index) => (
        <Dive
          key={index}
          dive={dive}
          handleDiveChange={handleDiveChange}
          handleDiveSelect={handleDiveSelect}
          index={index}
          selectedDiveIndex={selectedDiveIndex}
          diveOptions={diveOptions[index] || []}
          inputRef={inputRef(index)}
        />
      ))}
    </div>
  );
}

export default ElevenDiveComponent;
