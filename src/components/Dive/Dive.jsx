// Dive.jsx
import React, { useEffect, useRef } from 'react';
import styles from './Dive.module.css';

const Dive = ({
  dive,
  handleDiveChange,
  handleDiveSelect,
  index,
  selectedDiveIndex,
  diveOptions,
  editMode,
}) => {
  const diveNumberInputRef = useRef(null);
  const diveInputRef = useRef(null);
  const positionInputRef = useRef(null);
  const ddInputRef = useRef(null);

  useEffect(() => {
    if (selectedDiveIndex === index && diveNumberInputRef.current) {
      diveNumberInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedDiveIndex, index]);

  let className = styles.diveContainer;
  if (index >= 0 && index <= 10) {
    className = styles[`diveContainer${index}`];
  }

  const readOnly = !editMode; // Invert createMode to determine the readOnly state

  return (
    <div className={className}>
      <div className={styles.diveNumber}>
        <input
          type="text"
          value={dive.diveNumber}
          onChange={(e) => handleDiveChange(e, index, 'diveNumber')}
          className={styles.input}
          ref={diveNumberInputRef}
          readOnly={readOnly}
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
      <div className={styles.dive}>
        <input
          type="text"
          value={dive.dive}
          onChange={(e) => handleDiveChange(e, index, 'dive')}
          className={styles.input}
          ref={diveInputRef}
          readOnly={readOnly}
        />
      </div>
      <div className={styles.divePosition}>
        <input
          type="text"
          value={dive.position}
          onChange={(e) => handleDiveChange(e, index, 'position')}
          className={styles.input}
          ref={positionInputRef}
          readOnly={readOnly}
        />
      </div>
      <div className={styles.diveDD}>
        <input
          type="text"
          value={dive.dd}
          onChange={(e) => handleDiveChange(e, index, 'dd')}
          className={styles.input}
          ref={ddInputRef}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default Dive;