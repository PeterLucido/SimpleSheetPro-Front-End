import React from 'react';
import Dive from '../Dive/Dive';
import { useRef } from 'react';

const ElevenDiveComponent = ({ dives, handleDiveChange, handleDiveSelect, selectedDiveIndex, diveOptions }) => {
  const inputRefs = useRef([]);

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
          diveInputRef={(el) => (inputRefs.current[index] = el)}
        />
      ))}
    </div>
  );
};

export default ElevenDiveComponent;
