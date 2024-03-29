import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NewDiveSheet.module.css';
import SixDiveComponent from '../../components/SixDiveComponent/SixDiveComponent';
import ElevenDiveComponent from '../../components/ElevenDiveComponent/ElevenDiveComponent';
import divesheetbackground from '/src/DivSheet.png';
import * as sheetService from '../../services/sheetService';
import { getDives } from '../../services/diveService';
import VolOrOp from '../../components/VolOrOp/VolOrOp';
import DiveSheet from '../../components/DiveSheet/DiveSheet';
import divegif from '/src/divegif.gif';

const NewDiveSheet = ({ profile }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [isElevenDive, setIsElevenDive] = useState(false);
  const [dives, setDives] = useState(Array(6).fill({ diveNumber: '', dive: '', position: '', dd: '' }));
  const [selectedDiveIndex, setSelectedDiveIndex] = useState(null);
  const [diveOptions, setDiveOptions] = useState([]);
  const [diveData, setDiveData] = useState([]);
  const containerRef = useRef(null);
  const inputDiveContainerRefs = useRef([]);
  const navigate = useNavigate();
  const [isEditing] = useState(true);
  const [isShrinking, setIsShrinking] = useState(false);
  
  // console.log(profile);
  // console.log(diveData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const diveData = await getDives();
        setDiveData(diveData);
      } catch (error) {
        // Handle error retrieving dive data
      }
    };

    fetchData();
  }, []);

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

    // console.log('filteredDives:', filteredDives);

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

  const handleDiveSheetSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true); // Start the animation
      setIsShrinking(true); // Trigger the shrinking and moving up animation
      
      const newDiveSheet = {
        title: title,
        dives: dives,
        is11Dive: isElevenDive,
      };
  
      const create = await sheetService.create(newDiveSheet, profile);
      console.log('Dive sheet saved:', create);
      // Redirect to the dive sheet list after the animation
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/diveSheets'); // Replace '/dive-sheet-list' with the actual URL of your dive sheet list page
      }, 1000); // Adjust the delay time (in milliseconds) to match the duration of your animation
    } catch (error) {
      setIsSubmitting(false);
      console.error('Error creating dive sheet:', error);
      // Handle error during dive sheet creation, such as displaying an error message.
    }
  };
  
  

  return (
      <div className={styles.mainContainer}>
        <div className={styles.volOrOpColumn}>
        {/* <VolOrOp /> */}
        </div>
        <div className={styles.diveSheetColumn}>
          <DiveSheet />
        </div>
        <div className={styles.infoInputColumn}>
          <h1>info input container</h1>
        </div>
      </div>
  );
};

export default NewDiveSheet;
