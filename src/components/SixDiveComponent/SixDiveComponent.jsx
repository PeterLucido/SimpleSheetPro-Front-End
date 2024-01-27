import { useRef } from 'react';
import Dive from '../Dive/Dive';
import 'react-toastify/dist/ReactToastify.css';

const SixDiveComponent = ({ dives, handleDiveChange, handleDiveSelect, selectedDiveIndex, diveOptions, isEditing }) => {
  const inputRefs = useRef([]);

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
          // isValidDive={isValid}
        />
      ))}
    </div>
  );
};

export default SixDiveComponent;
