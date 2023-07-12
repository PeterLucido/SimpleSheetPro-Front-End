import React, { useState, useEffect, useRef } from 'react';
import styles from './NewDiveSheet.module.css';
import divesheetbackground from '/src/divesheetbackground.png';

const NewDiveSheet = () => {
  const [title, setTitle] = useState('');
  const [isElevenDive, setIsElevenDive] = useState(false);
  const [dives, setDives] = useState(Array(6).fill({ diveNumber: '', dive: '', position: '', dd: '' }));
  const [selectedDiveIndex, setSelectedDiveIndex] = useState(null);
  const [diveOptions, setDiveOptions] = useState([]);

  const diveData = [
    { diveNumber: '101', dive: 'Forward Dive', position: 'C', dd: 1.2 },
    { diveNumber: '101', dive: 'Forward Dive', position: 'B', dd: 1.3 },
    { diveNumber: '101', dive: 'Forward Dive', position: 'A', dd: 1.4 },
    { diveNumber: '102', dive: 'Forward 1 SS', position: 'C', dd: 1.4 },
    { diveNumber: '102', dive: 'Forward 1 SS', position: 'B', dd: 1.5 },
    { diveNumber: '102', dive: 'Forward 1 SS', position: 'A', dd: 1.6 },
    { diveNumber: '103', dive: 'Forward 1 1/2 SS', position: 'C', dd: 1.6 },
    { diveNumber: '103', dive: 'Forward 1 1/2 SS', position: 'B', dd: 1.7 },
    { diveNumber: '103', dive: 'Forward 1 1/2 SS', position: 'A', dd: 2.0 }
  ];

  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setDiveOptions([]);
        setSelectedDiveIndex(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsElevenDive(e.target.checked);
    setDives((prevDives) => {
      if (e.target.checked) {
        return Array(11).fill({ diveNumber: '', dive: '', position: '', dd: '' });
      } else {
        return prevDives.slice(0, 6);
      }
    });
  };

  const handleDiveChange = (e, index, fieldName) => {
    const { value } = e.target;

    // Update the dives state with the new value
    setDives((prevDives) => {
      const updatedDives = [...prevDives];
      updatedDives[index] = { ...updatedDives[index], [fieldName]: value };
      return updatedDives;
    });

    // Fetch dive options based on the updated values
    const { diveNumber, dive, position, dd } = {
      ...dives[index],
      [fieldName]: value
    };

    // Clear the suggestions if the field is empty
    if (!value) {
      setDiveOptions((prevOptions) => {
        const updatedOptions = [...prevOptions];
        updatedOptions[index] = [];
        return updatedOptions;
      });
      return;
    }

    // Filter diveData based on diveNumber, dive, position, and dd
    const filteredDives = diveData.filter((item) => {
      const { diveNumber: itemDiveNumber, dive: itemDive, position: itemPosition, dd: itemDD } = item;
      return (
        (!diveNumber || itemDiveNumber.includes(diveNumber)) &&
        (!dive || itemDive.toLowerCase().includes(dive.toLowerCase())) &&
        (!position || itemPosition.toLowerCase() === position.toLowerCase()) &&
        (!dd || itemDD === dd)
      );
    });

    // Update the dive options state for the current index
    setDiveOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = filteredDives;
      return updatedOptions;
    });

    // Set the selected dive index
    setSelectedDiveIndex(index);
  };

  const handleDiveSelect = (option, index) => {
    setDives((prevDives) => {
      const updatedDives = [...prevDives];
      updatedDives[index] = { ...updatedDives[index], ...option };
      return updatedDives;
    });
    setDiveOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = [];
      return updatedOptions;
    });
  };

  const handleDiveSheetSubmit = (e) => {
    e.preventDefault();
    console.log('Dive sheet submitted:', dives);
  };

  return (
    <>
      <div className={styles.fullContainer} ref={containerRef}>
        <div className={styles.titleContainer}>
          <label>Title:</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
          <label>
            <input
              type="checkbox"
              checked={isElevenDive}
              onChange={handleCheckboxChange}
            />
            Is this sheet 11 dives?
          </label>
        </div>
        <div className={styles.container}>
          <img
            src={divesheetbackground}
            className={styles.backgroundImage}
            id={styles.sheet}
            alt="Dive Sheet Background"
          />
          <form className={styles.overlayForm} onSubmit={handleDiveSheetSubmit}>
            {dives.map((dive, index) => (
              <div key={index} className={`diveInputContainer-dive-${index}`}>
                <div className={styles.divenumber}>
                  <input
                    type="text"
                    name={`diveNumber-${index}`}
                    value={dive.diveNumber}
                    onChange={(e) => handleDiveChange(e, index, 'diveNumber')}
                  />
                  {selectedDiveIndex === index && diveOptions[index] && diveOptions[index].length > 0 && (
                    <div className={styles.diveOptions}>
                      {diveOptions[index].map((option, i) => (
                        <div
                          key={i}
                          onClick={() => handleDiveSelect(option, index)}
                          className={styles.diveOption}
                        >
                          {option.diveNumber} - {option.dive} ({option.position} - {option.dd})
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className={styles.dive}>
                  <input
                    type="text"
                    name={`dive-${index}`}
                    value={dive.dive}
                    onChange={(e) => handleDiveChange(e, index, 'dive')}
                  />
                </div>
                <div className={styles.position}>
                  <input
                    type="text"
                    name={`position-${index}`}
                    value={dive.position}
                    onChange={(e) => handleDiveChange(e, index, 'position')}
                  />
                </div>
                <div className={styles.dd}>
                  <input
                    type="text"
                    name={`dd-${index}`}
                    value={dive.dd}
                    onChange={(e) => handleDiveChange(e, index, 'dd')}
                  />
                </div>
              </div>
            ))}
            <button className={styles.submitButton} type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewDiveSheet;
