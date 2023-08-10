import { useRef } from 'react';
import Dive from '../Dive/Dive';

const SixDiveComponent = ({ dives, handleDiveChange, handleDiveSelect, selectedDiveIndex, diveOptions, isEditing }) => {
  const inputRefs = useRef([]);

  // Validate the DD of the first dive
  const isValidFirstDive = dives.length > 0 && dives[0].dd <= 1.8;

  // Set the DD of the first dive to 1.8 if it's over 1.8
  if (dives.length > 0 && dives[0].dd > 1.8) {
    dives[0].dd = 1.8;
  }

  return (
    <div className="sixDiveForm">
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
          isEditing={isEditing} 
        />
      ))}
      {!isValidFirstDive && (
        <p className="invalid-first-dive-message">The DD of the first dive must be 1.8 or lower. It has been set to 1.8.</p>
      )}
    </div>
  );
};

export default SixDiveComponent;
