import { Link } from 'react-router-dom'

import styles from './SheetCard.module.css'

const SheetCard = ({ diveSheet }) => {

  if (!diveSheet) {
    return (
      <Link to="/divesheets/new">
        <div className={styles.SheetCard}>
          <h2>Create a Dive Sheet</h2>
          <p>Click here to create a new dive sheet.</p>
        </div>
      </Link>
    );
  }

  return (
    <div className={styles.SheetCard}>
      <Link to={`/DiveSheets/${diveSheet._id}`}>
        <h2>{diveSheet.title}</h2>
      </Link>
    </div>
  );
};

export default SheetCard