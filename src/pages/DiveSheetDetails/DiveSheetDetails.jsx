import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './DiveSheetDetails.module.css';
import divesheetbackground from '/src/divesheetbackground.png';
import * as sheetService from '../../services/sheetService';
import SixDiveComponent from '../../components/SixDiveComponent/SixDiveComponent';
import ElevenDiveComponent from '../../components/ElevenDiveComponent/ElevenDiveComponent';

const DiveSheetDetails = ({ profile }) => {
  const [diveSheet, setDiveSheet] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedDiveSheet, setEditedDiveSheet] = useState(null);
  const [titleInput, setTitleInput] = useState('');

  const { diveSheetId } = useParams();

  useEffect(() => {
    const fetchDiveSheet = async () => {
      const diveSheetData = await sheetService.show(diveSheetId);
      setDiveSheet(diveSheetData);
      setEditedDiveSheet(diveSheetData);
      setTitleInput(diveSheetData.title);
    };

    fetchDiveSheet();
  }, [diveSheetId]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
    // Perform save/update logic using the editedDiveSheet state
    // You can make an API call to update the dive sheet data
    // For simplicity, we will just log the edited dive sheet data
    console.log(editedDiveSheet);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedDiveSheet((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (!diveSheet || !editedDiveSheet) {
    return <div>Loading...</div>; // Add a loading state while the diveSheet is being fetched
  }

  const { title, dives, isElevenDive } = editedDiveSheet; // Destructure the title, dives, and isElevenDive from editedDiveSheet

  return (
    <>
      <div className={styles.fullContainer}>
        <div className={styles.titleContainer}>
          <label className={styles.label}>Title:</label>
          {editMode ? (
            <input
              type="text"
              name="title"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              className={`${styles.input} ${editMode ? '' : styles.readOnly}`}
              disabled={!editMode}
            />
          ) : (
            <p className={styles.title}>{title}</p>
          )}
          <label className={styles.label}>
            <input
              type="checkbox"
              checked={isElevenDive}
              disabled={!editMode}
              onChange={() => {}}
            />
            Is this sheet 11 dives?
          </label>
        </div>
        <div className={styles.container}>
          <div className={styles.infoContainer}>
            <div className={styles.Name}>
              <h1>
                {profile && profile.firstName} {profile && profile.lastName}
              </h1>
            </div>
            <div className={styles.School}>
              <h1>School</h1>
            </div>
            <div className={styles.Grade}>
              <h1>{profile && profile.grade}</h1>
            </div>
            <div className={styles.Gender}>
              <div className={styles.genderBoy}>
                {profile && profile.gender === 'Male' ? 'x' : null}
              </div>
              <div className={styles.genderGirl}>
                {profile && profile.gender === 'Female' ? 'x' : null}
              </div>
            </div>
          </div>
          <form className={styles.overlayForm} onSubmit={handleSaveClick}>
            {isElevenDive ? (
              <ElevenDiveComponent
                dives={dives}
                handleDiveChange={handleInputChange}
                handleDiveSelect={handleInputChange}
                selectedDiveIndex={0}
                diveOptions={[]}
                className={`${styles.diveOptionsContainer} ${
                  editMode ? '' : styles.readOnly
                }`}
                disabled={!editMode}
              />
            ) : (
              <SixDiveComponent
                dives={dives}
                handleDiveChange={handleInputChange}
                handleDiveSelect={handleInputChange}
                selectedDiveIndex={0}
                diveOptions={[]}
                className={`${styles.diveOptionsContainer} ${
                  editMode ? '' : styles.readOnly
                }`}
                disabled={!editMode}
              />
            )}
            {editMode && (
              <button type="submit" className={styles.saveButton}>
                Save
              </button>
            )}
          </form>
          <img
            src={divesheetbackground}
            className={styles.backgroundImage}
            id={styles.sheet}
            alt="Dive Sheet Background"
          />
          {!editMode && (
            <div className={styles.btnContainer}>
              <button className="Edit" type="button" onClick={handleEditClick}>
                Edit
              </button>
              <button className="Print" type="button">
                Print
              </button>
              <button className="Delete" type="button">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DiveSheetDetails;
