import { useRef } from 'react';
import Dive from '../components/Dive/Dive';

const ElevenDiveComponent = ({ dives, handleDiveChange, handleDiveSelect, selectedDiveIndex, diveOptions, isEditing }) => {
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
          isEditing={isEditing} 
        />
      ))}
    </div>
  );
};

export default ElevenDiveComponent;
