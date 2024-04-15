// InfoContainer.jsx
import styles from './InfoContainer.module.css';

const InfoContainer = ({
  inviteText1,
  inviteText2,
  // diveSheetOptions,
  selectedDiveSheet,
  onDiveSheetChange,
  onSaveClick,
  onPrintClick,
  onDeleteClick
}) => {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.validSign}>
        <div className={styles.statusIcon}></div>
        VALID
      </div>
      <input type="text" value={inviteText1} className={styles.inputField} />
      <input type="text" value={inviteText2} className={styles.inputField} />
      <select className={styles.dropdown} value={selectedDiveSheet} onChange={onDiveSheetChange}>
        <option value="11 Dive Sheet">11 Dive Sheet</option>
        <option value="6 Dive Sheet">6 Dive Sheet</option>
      </select>
      <div className={styles.actionButtons}>
        <button onClick={onSaveClick} className={styles.saveButton}>Save</button>
        <button onClick={onPrintClick} className={styles.printButton}>Print</button>
        <button onClick={onDeleteClick} className={styles.deleteButton}>Delete</button>
      </div>
    </div>
  );
};

export default InfoContainer;
