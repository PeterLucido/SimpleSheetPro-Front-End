import React, { useState, useEffect, useRef } from 'react';
import styles from './NewDiveSheet.module.css';
import SixDiveComponent from '../../components/SixDiveComponent/SixDiveComponent';
import ElevenDiveComponent from '../../components/ElevenDiveComponent/ElevenDiveComponent';
import divesheetbackground from '/src/divesheetbackground.png';
import * as sheetService from '../../services/sheetService';

const NewDiveSheet = () => {
    const [title, setTitle] = useState('');
    const [isElevenDive, setIsElevenDive] = useState(false);
    const [dives, setDives] = useState(Array(6).fill({ diveNumber: '', dive: '', position: '', dd: '' }));
    const [selectedDiveIndex, setSelectedDiveIndex] = useState(null);
    const [diveOptions, setDiveOptions] = useState([]);
    const [diveData, setDiveData] = useState([]);
    const containerRef = useRef(null);
    const inputDiveContainerRefs = useRef([]);

    useEffect(() => {
        const fetchDiveData = async () => {
            const data = await sheetService.index();
            setDiveData(data);
        };
        fetchDiveData();
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

        console.log('filteredDives:', filteredDives);

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
                <div className={styles.infoContainer}>
                  <div>
                    <h1>Name</h1>
                  </div>
                  <div>
                    <h1>School</h1>
                  </div>
                  <div>
                    <h1>Grade</h1>
                  </div>
                  <div>
                    <h1>Gender</h1>
                  </div>
                </div>
                    <img
                        src={divesheetbackground}
                        className={styles.backgroundImage}
                        id={styles.sheet}
                        alt="Dive Sheet Background"
                    />
                    <form className={styles.overlayForm} onSubmit={handleDiveSheetSubmit}>
                        {isElevenDive ?
                            <ElevenDiveComponent
                                dives={dives}
                                handleDiveChange={handleDiveChange}
                                handleDiveSelect={handleDiveSelect}
                                selectedDiveIndex={selectedDiveIndex}
                                diveOptions={diveOptions}
                                inputRef={(index) => (el) => (inputDiveContainerRefs.current[index] = el)}
                            /> :
                            <SixDiveComponent
                                dives={dives}
                                handleDiveChange={handleDiveChange}
                                handleDiveSelect={handleDiveSelect}
                                selectedDiveIndex={selectedDiveIndex}
                                diveOptions={diveOptions}
                                inputRef={(index) => (el) => (inputDiveContainerRefs.current[index] = el)}
                            />}
                        <button className={styles.submitButton} type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );  
};

export default NewDiveSheet;
