import React, { useEffect, useRef } from 'react';
import styles from './Dive.module.css';

const Dive = ({
  dive,
  handleDiveChange,
  handleDiveSelect,
  index,
  selectedDiveIndex,
  diveOptions,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (selectedDiveIndex === index && inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedDiveIndex, index]);

  let className = styles.diveContainer;
  if (index >= 0 && index <= 10) {
    className = styles[`diveContainer${index}`];
  }

  return (
    <div className={className} ref={inputRef}>
      <div className={styles.diveNumber}>
        <input
          type="text"
          value={dive.diveNumber}
          onChange={(e) => handleDiveChange(e, index, 'diveNumber')}
          className={styles.input}
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
        />
      </div>
      <div className={styles.divePosition}>
        <input
          type="text"
          value={dive.position}
          onChange={(e) => handleDiveChange(e, index, 'position')}
          className={styles.input}
        />
      </div>
      <div className={styles.diveDD}>
        <input
          type="text"
          value={dive.dd}
          onChange={(e) => handleDiveChange(e, index, 'dd')}
          className={styles.input}
        />
      </div>
    </div>
  );
};

export default Dive;
