import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './DiveSheetDetails.module.css';
import divesheetbackground from '/src/divesheetbackground.png';
import * as sheetService from '../../services/sheetService';
import SixDiveComponent from '../../components/SixDiveComponent/SixDiveComponent';
import ElevenDiveComponent from '../../components/ElevenDiveComponent/ElevenDiveComponent';
import { getDives } from '../../services/diveService'; // Adjust the import path as needed

const DiveSheetDetails = ({ handleDeleteSheet }) => {
  const [diveSheet, setDiveSheet] = useState(null);
  const [editedDiveSheet, setEditedDiveSheet] = useState(null);
  const [titleInput, setTitleInput] = useState('');
  const [isElevenDive, setIsElevenDive] = useState(false);
  const [diveSheetDives, setDiveSheetDives] = useState(Array(6).fill({ diveNumber: '', dive: '', position: '', dd: '' }));
  const [selectedDiveIndex, setSelectedDiveIndex] = useState(null);
  const inputDiveContainerRefs = useRef([]);
  const { diveSheetId } = useParams();
  const [diveData, setDiveData] = useState([]);
  const navigate = useNavigate(); // <-- Use useNavigate for navigation

  useEffect(() => {
    const fetchDiveSheet = async () => {
      try {
        const diveSheetData = await sheetService.show(diveSheetId);
        setDiveSheet(diveSheetData);
        setEditedDiveSheet(diveSheetData);
        if (diveSheetData) {
          setTitleInput(diveSheetData.title);
          setIsElevenDive(diveSheetData.is11Dive);
          setDiveSheetDives(diveSheetData.dives);
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
        // Handle error retrieving dive data
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

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {
      setIsElevenDive(checked);
      setEditedDiveSheet((prevState) => ({
        ...prevState,
        is11Dive: checked,
      }));
    } else if (name === 'title') {
      setTitleInput(value);
      setEditedDiveSheet((prevState) => ({
        ...prevState,
        title: value,
      }));
    }
  };

  const clearContainer = (index, fieldName, fieldValue) => {
    setEditedDiveSheet((prevState) => {
      const updatedDives = [...prevState.dives];
      updatedDives[index] = { ...editedDiveSheet.dives[index], [fieldName]: fieldValue };
      
      // If all fields in the cleared container are empty, remove the dive
      if (
        updatedDives[index].diveNumber === '' &&
        updatedDives[index].dive === '' &&
        updatedDives[index].position === '' &&
        updatedDives[index].dd === ''
      ) {
        updatedDives.splice(index, 1);
      }

      return {
        ...prevState,
        dives: updatedDives,
      };
    });
  };

  const handleDiveChange = (e, index, fieldName) => {
    const { value } = e.target;

    setEditedDiveSheet((prevState) => {
      const updatedDives = [...prevState.dives];
      updatedDives[index] = { ...updatedDives[index], [fieldName]: value };
      return {
        ...prevState,
        dives: updatedDives,
      };
    });

    setSelectedDiveIndex(index);
  };

  const handleDiveSelect = (option, index) => {
    setEditedDiveSheet((prevState) => {
      const updatedDives = [...prevState.dives];
      updatedDives[index] = { ...option };
      return {
        ...prevState,
        dives: updatedDives,
      };
    });

    setSelectedDiveIndex(null);
  };

  async function handleDiveSheetSubmit(e) {
    e.preventDefault();
  
    try {
      console.log('Dive sheet form data:', editedDiveSheet); // Add this log to check the value of diveSheetFormData
  
      const updatedSheet = {
        title: titleInput,
        dives: editedDiveSheet.dives,
        is11Dive: isElevenDive,
      };
  
      console.log('Updated sheet data:', updatedSheet); // Add this log to check the value of updatedSheet
  
      // ... (Existing code)
    } catch (error) {
      console.error('Error updating dive sheet:', error);
      // Handle error during update, such as displaying an error message.
    }
  }

  // const handleDelete = async () => {
  //   console.log('Deleting dive sheet with ID:', diveSheetId); // Add this line to check the value
  //   try {
  //     await sheetService.deleteSheet(diveSheetId);
  //     navigate('/diveSheets');
  //   } catch (error) {
  //     console.error('Error deleting dive sheet:', error);
  //   }
  // };
  

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
            value={titleInput}
            onChange={handleInputChange}
            className={styles.input}
          />
          <label>
            <input
              type="checkbox"
              checked={isElevenDive}
              onChange={handleInputChange}
            />
            Is this sheet 11 dives?
          </label>
        </div>
        <div className={styles.container}>
          <div className={styles.infoContainer}>
            {/* ... (Existing code for profile info) */}
          </div>
          <img
            src={divesheetbackground}
            className={styles.backgroundImage}
            id={styles.sheet}
            alt="Dive Sheet Background"
          />
          <form className={styles.overlayForm} onSubmit={handleDiveSheetSubmit}>
            {isElevenDive ? (
              <ElevenDiveComponent
                dives={diveSheetDives}
                handleDiveChange={handleDiveChange}
                handleDiveSelect={handleDiveSelect}
                selectedDiveIndex={selectedDiveIndex}
                diveOptions={[]}
              />
            ) : (
              <SixDiveComponent
                dives={diveSheetDives}
                handleDiveChange={handleDiveChange}
                handleDiveSelect={handleDiveSelect}
                selectedDiveIndex={selectedDiveIndex}
                diveOptions={[]}
              />
            )}
            <button className="Save" type="submit">
              Save
            </button>
            <button className="Print">Print</button>
            <button className="Delete" onClick={() => handleDeleteSheet(diveSheet._id)}>
              Delete
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DiveSheetDetails;
