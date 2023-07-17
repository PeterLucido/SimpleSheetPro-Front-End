import { useState, useEffect } from 'react';
import * as sheetService from '../../services/sheetService';
import SheetCard from '../../components/SheetCard/SheetCard';
import styles from './SheetList.module.css';

const SheetList = ({ user }) => {
  const [diveSheetsInList, setDiveSheetsInList] = useState([]);

  useEffect(() => {
    const fetchAllSheets = async () => {
      const data = await sheetService.index();
      setDiveSheetsInList(data);
    };
    if (user) fetchAllSheets();
  }, [user]);

  return (
    <div className={styles.container}>
      <div className={styles.sheetCardContainer}>
        {diveSheetsInList.map((diveSheet) => (
          <SheetCard key={diveSheet._id} diveSheet={diveSheet} />
        ))}
      </div>
    </div>
  );
};

export default SheetList;
