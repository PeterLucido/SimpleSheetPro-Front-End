// NewDiveSheet.jsx

import React, { useState } from 'react';
import styles from './NewDiveSheet.module.css';
import divesheetbackground from '/src/divesheetbackground.png';

const NewDiveSheet = () => {
  const [title, setTitle] = useState('');
  const [isElevenDive, setIsElevenDive] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsElevenDive(e.target.checked);
  };

  return (
    <>
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
      <div className={styles.leftcontainer}>
        <h1>1m</h1>
      </div>
      <img src={divesheetbackground} className={styles.backgroundImage} id={styles.sheet}/>
      <form className={styles.overlayForm}>
        {/* Your form fields and buttons here */}
      </form>
      <div className={styles.rightcontainer}>
        <h1>1m</h1>
      </div>
    </div>
    <div className={styles.buttonContainer}>
      <button className={styles.button}>Save</button>
      <button className={styles.button}>Print</button>
      <button className={styles.button}>Delete</button>
    </div>
    </>
  );
};

export default NewDiveSheet;
