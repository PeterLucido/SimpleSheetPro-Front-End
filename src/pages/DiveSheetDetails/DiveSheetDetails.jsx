import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styles from './DiveSheetDetails.module.css';
import divesheetbackground from '/src/divesheetbackground.png';
import * as sheetService from '../../services/sheetService';
import SixDiveComponent from '../../components/SixDiveComponent/SixDiveComponent';
import ElevenDiveComponent from '../../components/ElevenDiveComponent/ElevenDiveComponent';
import { getDives } from '../../services/diveService';


const DiveSheetDetails = ({ handleDeleteSheet, profile }) => {
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
  const [isEditing, setIsEditing] = useState(false);
  // console.log(profile);

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
        // console.error('Error fetching dive sheet:', error);
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
    setIsEditing(false);
    e.preventDefault();
  
    try {
      console.log('diveSheet ID:', diveSheet._id);
      console.log('editedDiveSheet ID:', editedDiveSheet._id);
  
      const updatedSheet = {
        _id: diveSheet._id,
        title: title,
        dives: dives,
      };
  
      console.log('Updated sheet data:', updatedSheet);
  
      // Call the API to update the dive sheet
      const updatedDiveSheet = await sheetService.update(updatedSheet, diveSheet._id); // Corrected argument order here
  
      console.log('Updated dive sheet:', updatedDiveSheet);
  
      // Update the editedDiveSheet state with the updated data
      setEditedDiveSheet(updatedDiveSheet);
  
      // Optionally show a success message or redirect
      // Redirect to the dive sheet list or show a success message
    } catch (error) {
      console.error('Error updating dive sheet:', error);
      // Handle error during update, such as displaying an error message.
    }
  }
  
  
  
  
  
  
  

  const handleEdit = () => {
    setIsEditing(true);
  };

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
            readOnly={!isEditing}
          />
        </div>
        <div className={styles.container}>
          <div className={styles.infoContainer}>
            <div className={styles.Name}>
              <h1>{profile && profile.firstName} {profile && profile.lastName}</h1>
            </div>
            <div className={styles.School}>
              <h1>School</h1>
            </div>
            <div className={styles.Grade}>
              <h1>{profile && profile.grade}</h1>
            </div>
            <div className={styles.Gender}>
              <div className={styles.genderBoy}>{profile && profile.gender === 'Male' ? 'x' : null}</div>
              <div className={styles.genderGirl}>{profile && profile.gender === 'Female' ? 'x' : null}</div>
            </div>
          </div>
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
                isEditing={isEditing}
              />
            ) : (
              <SixDiveComponent
                dives={dives}
                handleDiveChange={handleDiveChange}
                handleDiveSelect={handleDiveSelect}
                selectedDiveIndex={selectedDiveIndex}
                diveOptions={diveOptions}
                isEditing={isEditing}
              />
            )}
          </form>
        </div>
        <div className={styles.btnContainer}>
          {isEditing ? (
            <button className="Save" type="submit" onClick={handleDiveSheetSubmit}>
              Save
            </button>
          ) : (
            <button className="Edit" onClick={handleEdit}>
              Edit
            </button>
          )}
          <button className="Print">
            Print
          </button>
          <button className="Delete" onClick={() => handleDeleteSheet(diveSheet._id)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default DiveSheetDetails;
