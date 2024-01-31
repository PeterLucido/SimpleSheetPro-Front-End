
import styles from './DiveSheet.module.css';
import divesheetbackground from '/src/DivSheet.png';
import VolOrOp from '../VolOrOp/VolOrOp';

const DiveSheet = () => {
  return ( 
    <div className={styles.main}>
      <div className={styles.volOrOpColumn}>
        <div className={styles.volOrOp1}>
          <VolOrOp/>
        </div>
        <div className={styles.volOrOp2}>
          <VolOrOp/>
        </div>
        <div className={styles.volOrO3}>
          <VolOrOp/>
        </div>
        <div className={styles.volOrOp4}>
          <VolOrOp/>
        </div>
        <div className={styles.volOrOp5}>
          <VolOrOp/>
        </div>
        <div className={styles.volOrOp6}>
          <VolOrOp/>
        </div>
        <div className={styles.volOrOp7}>
          <VolOrOp/>
        </div>
        <div className={styles.volOrOp8}>
          <VolOrOp/>
        </div>
        <div className={styles.volOrOp9}>
          <VolOrOp/>
        </div>
        <div className={styles.volOrOp10}>
          <VolOrOp/>
        </div>
        <div className={styles.volOrOp11}>
          <VolOrOp/>
        </div>
      </div>
      <div className={styles.diveSheetColumn}>
          <img
              src={divesheetbackground}
              className={styles.backgroundImage}
              id={styles.sheet}
              alt="Dive Sheet Background"
            />
        </div>
    </div>
  )
}

export default DiveSheet;