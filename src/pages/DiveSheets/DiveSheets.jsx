// DiveSheets.js

import React, { useState } from 'react'
import styles from './DiveSheets.module.css'

const DiveSheet = ({ title }) => (
  <div className={styles.container}>
    <h1>{title}</h1>
    <button>Open</button>
  </div>
);

const DiveSheets = () => {
  const [diveSheets, setDiveSheets] = useState([]);
  const [newDiveSheetTitle, setNewDiveSheetTitle] = useState('');

  const createDiveSheet = (e) => {
    e.preventDefault();
    if (newDiveSheetTitle !== '') {
      setDiveSheets([...diveSheets, newDiveSheetTitle]);
      setNewDiveSheetTitle('');
    }
  };

  return (
    <div>
      {diveSheets.length === 0 ? (
        <div className={styles.container}>
          <h1>Create a Dive Sheet</h1>
          <button className={styles.button} onClick={createDiveSheet}>Create</button>
        </div>
      ) : (
        diveSheets.map((title, index) => (
          <DiveSheet key={index} title={title} />
        ))
      )}
    </div>
  );
};

export default DiveSheets;
