// import React, { useState, useEffect } from 'react';
// import styles from './DiveSheets.module.css';
// import * as sheetService from '../../services/sheetService';

// const DiveSheets = ({ profileId }) => {
//   const [diveSheets, setDiveSheets] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchDiveSheets = async () => {
//       try {
//         const fetchedDiveSheets = await sheetService.index(profileId);
//         setDiveSheets(fetchedDiveSheets);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching dive sheets:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchDiveSheets();
//   }, [profileId]);

//   console.log('isLoading:', isLoading);
//   console.log('diveSheets:', diveSheets);

//   if (isLoading) {
//     return (
//       <div className={styles.container}>
//         <h1>Loading dive sheets...</h1>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <h1>Dive Sheets</h1>
//       {diveSheets.length === 0 ? (
//         <div>No dive sheets found.</div>
//       ) : (
//         <ul>
//           {diveSheets.map((diveSheet) => (
//             <li key={diveSheet._id}>{diveSheet.title}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default DiveSheets;

import { useState, useEffect } from 'react'

import * as sheetService from '../../services/sheetService';
import styles from './DiveSheets.module.css';

const DiveSheets = ({ user }) => {
  const [sheetsInList, setSheetsInList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllSheets = async () => {
      try {
        const data = await sheetService.index();
        setSheetsInList(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dive sheets:', error);
        setIsLoading(false);
      }
    };

    if (user) {
      fetchAllSheets();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <h1>Loading dive sheets...</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Dive Sheets</h1>
      {sheetsInList.length === 0 ? (
        <div>No dive sheets found.</div>
      ) : (
        <div>{sheetsInList[0].title}</div>
      )}
    </div>
  );
  
};

export default DiveSheets;
