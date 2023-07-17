import React from 'react';
import Dive from '../Dive/Dive';
import { useRef } from 'react';

const SixDiveComponent = ({ dives, handleDiveChange, handleDiveSelect, selectedDiveIndex, diveOptions, editMode }) => {
  const diveNumberInputRefs = useRef([]);
  const diveInputRefs = useRef([]);
  const positionInputRefs = useRef([]);
  const ddInputRefs = useRef([]);
  const sixDives = dives.slice(0, 6); // Ensure only 6 dives are considered

  return (
    <div className="sixDiveForm">
      {sixDives.map((dive, index) => (
      <Dive
        key={index}
        dive={dive}
        handleDiveChange={handleDiveChange}
        handleDiveSelect={handleDiveSelect}
        index={index}
        selectedDiveIndex={selectedDiveIndex}
        diveOptions={diveOptions[index] || []}
        diveNumberInputRef={(el) => (diveNumberInputRefs.current[index] = el)}
        diveInputRef={(el) => (diveInputRefs.current[index] = el)}
        positionInputRef={(el) => (positionInputRefs.current[index] = el)}
        ddInputRef={(el) => (ddInputRefs.current[index] = el)}
        editMode={editMode}
      />
      ))}
    </div>
  );
};

export default SixDiveComponent;
