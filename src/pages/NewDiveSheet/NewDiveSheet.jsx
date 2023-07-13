import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './NewDiveSheet.module.css';
import Dive from '../../components/Dive/Dive';
import divesheetbackground from '/src/divesheetbackground.png';
import * as sheetService from '../../services/sheetService';

const Portal = ({ children }) => {
  const portalRoot = document.getElementById('portal');
  const portalRef = useRef(null);

  if (!portalRef.current) {
    portalRef.current = document.createElement('div');
    portalRoot.appendChild(portalRef.current);
  }

  useEffect(() => {
    return () => {
      portalRoot.removeChild(portalRef.current);
    };
  }, [portalRoot]);

  return ReactDOM.createPortal(children, portalRef.current);
};

const NewDiveSheet = () => {
  const [title, setTitle] = useState('');
  const [isElevenDive, setIsElevenDive] = useState(false);
  const [dives, setDives] = useState(Array(6).fill({ diveNumber: '', dive: '', position: '', dd: '' }));
  const [selectedDiveIndex, setSelectedDiveIndex] = useState(null);
  const [diveOptions, setDiveOptions] = useState([]);
  const [diveData, setDiveData] = useState([]);

  useEffect(() => {
    const fetchDiveData = async () => {
      const data = await sheetService.index();
      setDiveData(data);
    };
    fetchDiveData();
  }, []);

  const containerRef = useRef(null);
  const inputDiveContainerRefs = useRef([]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        selectedDiveIndex !== null &&
        inputDiveContainerRefs.current[selectedDiveIndex] &&
        !inputDiveContainerRefs.current[selectedDiveIndex].contains(event.target)
      ) {
        setDiveOptions((prevOptions) => {
          const updatedOptions = [...prevOptions];
          updatedOptions[selectedDiveIndex] = [];
          return updatedOptions;
        });
        setSelectedDiveIndex(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [selectedDiveIndex]);

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

  const clearContainer = (index, fieldName, fieldValue) => {
    setDives((prevDives) => {
      const updatedDives = [...prevDives];
      // Clears only the input values, not the options
      updatedDives[index] = { ...updatedDives[index], [fieldName]: fieldValue };
      return updatedDives;
    });
  };

  const handleDiveChange = (e, index, fieldName) => {
    const { value } = e.target;

    if (value.length < (dives[index][fieldName] || '').length) {
      // Clear all other fields within the same dive container
      setDives((prevDives) => {
        const updatedDives = [...prevDives];
        updatedDives[index] = { ...updatedDives[index], [fieldName]: value };

        // Clear other fields
        updatedDives[index] = Object.keys(updatedDives[index]).reduce((obj, key) => {
          if (key !== fieldName) {
            obj[key] = '';
          }
          return obj;
        }, updatedDives[index]);

        return updatedDives;
      });

      // Fetch dive options based on the updated values
      const { diveNumber, dive, position, dd } = {
        ...dives[index],
        [fieldName]: value,
      };

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

      console.log(filteredDives);

      // Update the dive options state for the current index
      setDiveOptions((prevOptions) => {
        const updatedOptions = [...prevOptions];
        updatedOptions[index] = filteredDives;
        return updatedOptions;
      });

      // Set the selected dive index
      setSelectedDiveIndex(index);

      return;
    }

    // Update the dives state with the new value
    setDives((prevDives) => {
      const updatedDives = [...prevDives];
      updatedDives[index] = { ...updatedDives[index], [fieldName]: value };
      return updatedDives;
    });

    // Fetch dive options based on the updated values
    const { diveNumber, dive, position, dd } = {
      ...dives[index],
      [fieldName]: value,
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

    console.log(filteredDives);

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
    setSelectedDiveIndex(null);
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
              <Dive
                key={index}
                dive={dive}
                handleDiveChange={handleDiveChange}
                handleDiveSelect={handleDiveSelect}
                index={index}
                selectedDiveIndex={selectedDiveIndex}
                diveOptions={diveOptions[index] || []}
                inputRef={(el) => (inputDiveContainerRefs.current[index] = el)}
              />
            ))}
            <button className={styles.submitButton} type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div id="portal"></div>
    </>
  );
};

export default NewDiveSheet;
