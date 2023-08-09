import { useEffect, useRef } from 'react';
import styles from './Dive.module.css';

const Dive = ({
  dive,
  handleDiveChange,
  handleDiveSelect,
  index,
  selectedDiveIndex,
  diveOptions,
  diveInputRef,
  isEditing, // Add isEditing prop
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (selectedDiveIndex === index && inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedDiveIndex, index]);

  const handleInputChange = (e, fieldName) => {
    if (isEditing) {
      handleDiveChange(e, index, fieldName);
    }
  };

  return (
    <div className={`${styles.diveContainer} ${styles[`diveContainer${index + 1}`]}`} ref={inputRef}>
      {/* Dive Number */}
      <div className={styles.diveNumber}>
        <input
          type="text"
          value={dive.diveNumber}
          onChange={(e) => handleInputChange(e, 'diveNumber')} // Use the new handleInputChange function
          className={styles.input}
          ref={inputRef}
          readOnly={!isEditing}
        />
        {selectedDiveIndex === index && diveOptions.length > 0 && (
          <div className={styles.diveOptionsContainer}>
            {diveOptions.map((option, i) => (
              <div key={i} onClick={() => handleDiveSelect(option, index)}>
                {option.diveNumber} - {option.dive} ({option.position} - {option.dd})
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Dive */}
      <div className={styles.dive}>
        <input
          type="text"
          value={dive.dive}
          onChange={(e) => handleInputChange(e, 'dive')} // Use the new handleInputChange function
          className={styles.input}
          ref={diveInputRef}
          readOnly={!isEditing}
        />
      </div>
      {/* Dive Position */}
      <div className={styles.divePosition}>
        <input
          type="text"
          value={dive.position}
          onChange={(e) => handleInputChange(e, 'position')} // Use the new handleInputChange function
          className={styles.input}
          ref={diveInputRef}
          readOnly={!isEditing}
        />
      </div>
      {/* Dive DD */}
      <div className={styles.diveDD}>
        <input
          type="text"
          value={dive.dd}
          onChange={(e) => handleInputChange(e, 'dd')} // Use the new handleInputChange function
          className={styles.input}
          ref={diveInputRef}
          readOnly={!isEditing}
        />
      </div>
    </div>
  );
};

export default Dive;
