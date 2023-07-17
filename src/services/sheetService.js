import * as tokenService from './tokenService';

// const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/diveSheets`;
// const profileId = '64b21412c245d76e78b02f8e'; // Replace with the actual owner's profile ID
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/diveSheets`;


async function index() {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    });
    const data = await res.json();
    console.log('Fetched dive sheets:', data);
    return data;
  } catch (err) {
    console.error(err);
  }
}



// async function createDiveSheet(profileId, diveSheet) {
//   try {
//     const response = await fetch(`/api/diveSheets/${profileId}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(diveSheet),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to create dive sheet');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error creating dive sheet:', error);
//     throw new Error(`Error creating dive sheet: ${error.message}`);
//   }
// }

// export { index, createDiveSheet };
export { index };
