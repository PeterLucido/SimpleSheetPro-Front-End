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
    <Link to={`/DiveSheets/${diveSheet._id}`}>
      <div className={styles.SheetCard}>
          <h2>{diveSheet.title}</h2>
      </div>
    </Link>
  );
};

export default SheetCard