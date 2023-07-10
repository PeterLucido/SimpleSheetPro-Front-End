// NewDiveSheet.jsx

import React, { useState } from 'react';
import styles from './NewDiveSheet.module.css';
import divesheetbackground from '/src/divesheetbackground.png';

const NewDiveSheet = () => {
  const [title, setTitle] = useState('');
  const [isElevenDive, setIsElevenDive] = useState(false);
  const [dives, setDives] = useState(Array(6).fill({ diveNumber: '', dive: '', position: '', dd: 0 }));

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsElevenDive(e.target.checked);
    setDives(prevDives => {
      if (e.target.checked) {
        return Array(11).fill({ diveNumber: '', dive: '', position: '', dd: 0 });
      } else {
        return prevDives.slice(0, 6);
      }
    });
  };

  const handleDiveChange = (e, index) => {
    const { name, value } = e.target;
    setDives(prevDives => {
      const updatedDives = [...prevDives];
      updatedDives[index] = { ...updatedDives[index], [name]: value };
      return updatedDives;
    });
  };

  const handleDiveSheetSubmit = (e) => {
    e.preventDefault();
    // Handle dive sheet submission logic here
    console.log('Dive sheet submitted:', dives);
  };

  return (
    <>
      <div className={styles.fullContainer}>
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
          />
          <form
            className={styles.overlayForm}
            onSubmit={handleDiveSheetSubmit}
          >
            {dives.map((dive, index) => (
              <div key={index} className={`${styles.diveInputContainer} ${index + 1}`}>
                <div className={styles.divenumber}>
                  <label>Dive {index + 1}:</label>
                  <input
                    type="text"
                    name={`diveNumber-${index}`}
                    placeholder="Dive Number"
                    value={dive.diveNumber}
                    onChange={(e) => handleDiveChange(e, index)}
                  />
                </div>
                <div className={styles.dive}>
                  <label>Dive:</label>
                  <input
                    type="text"
                    name={`dive-${index}`}
                    placeholder="Dive"
                    value={dive.dive}
                    onChange={(e) => handleDiveChange(e, index)}
                  />
                </div>
                <div className={styles.position}>
                  <label>Position:</label>
                  <input
                    type="text"
                    name={`position-${index}`}
                    placeholder="Position"
                    value={dive.position}
                    onChange={(e) => handleDiveChange(e, index)}
                  />
                </div>
                <div className={styles.dd}>
                  <label>DD:</label>
                  <input
                    type="number"
                    name={`dd-${index}`}
                    placeholder="DD"
                    step="0.1"
                    value={dive.dd}
                    onChange={(e) => handleDiveChange(e, index)}
                  />
                </div>
              </div>
            ))}
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>Save</button>
          <button className={styles.button}>Print</button>
          <button className={styles.button}>Delete</button>
        </div>
      </div>
    </>
  );
};

export default NewDiveSheet;
