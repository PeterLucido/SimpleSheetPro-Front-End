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
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (selectedDiveIndex === index && inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedDiveIndex, index]);

  return (
    <div className={`${styles.diveContainer} ${styles[`diveContainer${index + 1}`]}`} ref={inputRef}>
      {/* Dive Number */}
      <div className={styles.diveNumber}>
        <input
          type="text"
          value={dive.diveNumber}
          onChange={(e) => handleDiveChange(e, index, 'diveNumber')}
          className={styles.input}
          ref={inputRef}
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
          onChange={(e) => handleDiveChange(e, index, 'dive')}
          className={styles.input}
          ref={diveInputRef}
        />
      </div>
      {/* Dive Position */}
      <div className={styles.divePosition}>
        <input
          type="text"
          value={dive.position}
          onChange={(e) => handleDiveChange(e, index, 'position')}
          className={styles.input}
          ref={diveInputRef}
        />
      </div>
      {/* Dive DD */}
      <div className={styles.diveDD}>
        <input
          type="text"
          value={dive.dd}
          onChange={(e) => handleDiveChange(e, index, 'dd')}
          className={styles.input}
          ref={diveInputRef}
        />
      </div>
    </div>
  );
};

export default Dive;
