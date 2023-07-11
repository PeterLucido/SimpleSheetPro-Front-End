import React, { useState, useEffect } from 'react';
import styles from './NewDiveSheet.module.css';
import divesheetbackground from '/src/divesheetbackground.png';

const NewDiveSheet = () => {
  const [title, setTitle] = useState('');
  const [isElevenDive, setIsElevenDive] = useState(false);
  const [dives, setDives] = useState(Array(6).fill({ diveNumber: '', dive: '', position: '', dd: '' }));
  const [diveOptions, setDiveOptions] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsElevenDive(e.target.checked);
    setDives(prevDives => {
      if (e.target.checked) {
        return Array(11).fill({ diveNumber: '', dive: '', position: '', dd: '' });
      } else {
        return prevDives.slice(0, 6);
      }
    });
  };

  const handleDiveChange = async (e, index, fieldName) => {
    const { name, value } = e.target;

    // Update the dives state with the new value
    setDives(prevDives => {
      const updatedDives = [...prevDives];
      updatedDives[index] = { ...updatedDives[index], [fieldName]: value };
      return updatedDives;
    });

    // Fetch dive options based on the updated values
    const { diveNumber, dive, position, dd } = {
      ...dives[index],
      [fieldName]: value
    };

    // Log the updated dive and the API request
    console.log('Updated Dive:', { diveNumber, dive, position, dd });
    console.log('Input Field:', name);
    console.log('Input Value:', value);
    console.log('API Request:', { diveNumber, dive, position, dd });
    
    const response = await fetch(`/api/dives?diveNumber=${diveNumber}&dive=${dive}&position=${position}&dd=${dd}`);
    const diveOptions = await response.json();
    
    // Update the diveOptions state for the current index
    setDiveOptions(prevOptions => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = diveOptions;
      return updatedOptions;
    });
  };
  
  const handleDiveSelect = (dive, index) => {
    // fill the rest of the fields with the selected dive's data
    setDives(prevDives => {
      const updatedDives = [...prevDives];
      updatedDives[index] = { ...updatedDives[index], ...dive };
      return updatedDives;
    });
    
    // clear the dive options
    setDiveOptions([]);
  };
  
  const handleDiveSheetSubmit = (e) => {
    e.preventDefault();
    console.log('Dive sheet submitted:', dives);
  };
  
  useEffect(() => {
    const fetchDiveData = async () => {
      console.log('All Dives:', diveData);
      const response = await fetch('/api/dives');
      const diveData = await response.json();
      console.log('All Dives:', diveData);
      // Update your state or perform other actions with the retrieved dive data
    };
  
    fetchDiveData();
  }, []);


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
                  {diveOptions[dive.diveNumber] && (
                    <div className={styles.diveOptions}>
                      {diveOptions[dive.diveNumber].map((option, i) => (
                        <div key={i} onClick={() => handleDiveSelect(option, index)}>
                          {option.diveNumber} - {option.dive}
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
