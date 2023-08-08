import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styles from './DiveSheetDetails.module.css';
import divesheetbackground from '/src/divesheetbackground.png';
import * as sheetService from '../../services/sheetService';
import SixDiveComponent from '../../components/SixDiveComponent/SixDiveComponent';
import ElevenDiveComponent from '../../components/ElevenDiveComponent/ElevenDiveComponent';
import { getDives } from '../../services/diveService';

const DiveSheetDetails = ({ handleDeleteSheet }) => {
  const [diveSheet, setDiveSheet] = useState(null);
  const [diveOptions, setDiveOptions] = useState([]);
  const [editedDiveSheet, setEditedDiveSheet] = useState(null);
  const [title, setTitle] = useState('');
  const [editedIsElevenDive, setEditedIsElevenDive] = useState(false);
  const [dives, setDives] = useState([]);
  const [selectedDiveIndex, setSelectedDiveIndex] = useState(null);
  const inputDiveContainerRefs = useRef([]);
  const { diveSheetId } = useParams();
  const [diveData, setDiveData] = useState([]);

  useEffect(() => {
    const fetchDiveSheet = async () => {
      try {
        const diveSheetData = await sheetService.show(diveSheetId);
        setDiveSheet(diveSheetData);
        setEditedDiveSheet(diveSheetData);

        // Set the initial form values from the fetched diveSheetData
        if (diveSheetData) {
          setTitle(diveSheetData.title);
          setEditedIsElevenDive(diveSheetData.is11Dive);
          setDives([...diveSheetData.dives]); // Make sure to create a new array
        }
      } catch (error) {
        console.error('Error fetching dive sheet:', error);
        // Handle the error, show a message, or redirect the user if needed
      }
    };

    const fetchDiveData = async () => {
      try {
        const diveData = await getDives();
        setDiveData(diveData);
      } catch (error) {
        console.error('Error retrieving dive data:', error);
      }
    };

    fetchDiveSheet();
    fetchDiveData();
  }, [diveSheetId]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        selectedDiveIndex !== null &&
        inputDiveContainerRefs.current[selectedDiveIndex] &&
        !inputDiveContainerRefs.current[selectedDiveIndex].contains(event.target)
      ) {
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

  // const handleCheckboxChange = (e) => {
  //   setEditedIsElevenDive(e.target.checked);
  //   setDives((prevDives) => {
  //     if (e.target.checked) {
  //       return Array(11).fill({ diveNumber: '', dive: '', position: '', dd: '' });
  //     } else {
  //       return prevDives.slice(0, 6);
  //     }
  //   });
  // };

  const clearContainer = (index, fieldName, fieldValue) => {
    setDives((prevDives) => {
      const updatedDives = [...prevDives];
      updatedDives[index] = { ...updatedDives[index], [fieldName]: fieldValue };
      return updatedDives;
    });
  };

  const handleDiveChange = (e, index, fieldName) => {
    const { value } = e.target;

    if (!value) {
      clearContainer(index, fieldName, value);
      setDiveOptions((prevOptions) => {
        const updatedOptions = [...prevOptions];
        updatedOptions[index] = [];
        return updatedOptions;
      });
      return;
    }

    if (value.length < (dives[index][fieldName] || '').length) {
      setDives((prevDives) => {
        const updatedDives = [...prevDives];
        updatedDives[index] = { ...updatedDives[index], [fieldName]: value };

        updatedDives[index] = Object.keys(updatedDives[index]).reduce((obj, key) => {
          if (key !== fieldName) {
            obj[key] = '';
          }
          return obj;
        }, updatedDives[index]);

        return updatedDives;
      });
    } else {
      setDives((prevDives) => {
        const updatedDives = [...prevDives];
        updatedDives[index] = { ...updatedDives[index], [fieldName]: value };
        return updatedDives;
      });
    }

    const { diveNumber, dive, position, dd } = {
      ...dives[index],
      [fieldName]: value,
    };

    const filteredDives = diveData.filter((item) => {
      const { diveNumber: itemDiveNumber, dive: itemDive, position: itemPosition, dd: itemDD } = item;
      return (
        (!diveNumber || itemDiveNumber.includes(diveNumber)) &&
        (!dive || itemDive.toLowerCase().includes(dive.toLowerCase())) &&
        (!position || itemPosition.toLowerCase() === position.toLowerCase()) &&
        (!dd || itemDD === dd)
      );
    });

    setDiveOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = filteredDives;
      return updatedOptions;
    });

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

  async function handleDiveSheetSubmit(e) {
    e.preventDefault();

    try {
      const updatedSheet = {
        title: title,
        dives: dives,
        is11Dive: editedIsElevenDive, // Use the edited value here
      };

      console.log('Updated sheet data:', updatedSheet);

      // ... (Existing code for updating the dive sheet)
    } catch (error) {
      console.error('Error updating dive sheet:', error);
      // Handle error during update, such as displaying an error message.
    }
  }

  if (!diveSheet || !editedDiveSheet) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.fullContainer}>
        <div className={styles.titleContainer}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
            className={styles.input}
          />
          {/* <label>
            <input
              type="checkbox"
              checked={editedIsElevenDive}
              onChange={handleCheckboxChange}
            />
            Is this sheet 11 dives?
          </label> */}
        </div>
        <div className={styles.container}>
          {/* ... (Existing code for profile info) */}
          <img
            src={divesheetbackground}
            className={styles.backgroundImage}
            id={styles.sheet}
            alt="Dive Sheet Background"
          />
          <form className={styles.overlayForm} onSubmit={handleDiveSheetSubmit}>
            {editedIsElevenDive ? (
              <ElevenDiveComponent
                dives={dives}
                handleDiveChange={handleDiveChange}
                handleDiveSelect={handleDiveSelect}
                selectedDiveIndex={selectedDiveIndex}
                diveOptions={diveOptions}
              />
            ) : (
              <SixDiveComponent
                dives={dives}
                handleDiveChange={handleDiveChange}
                handleDiveSelect={handleDiveSelect}
                selectedDiveIndex={selectedDiveIndex}
                diveOptions={diveOptions}
              />
            )}
          </form>
        </div>
        <div className={styles.btnContainer}>
          <button className="Save" type="submit">
            Save
          </button>
          <button className="Print">Print</button>
          <button className="Delete" onClick={() => handleDeleteSheet(diveSheet._id)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default DiveSheetDetails;
