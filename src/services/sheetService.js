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


async function create(diveSheetFormData) {
  try{
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(diveSheetFormData)
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

async function show(diveSheetId) {
  try {
    const res = await fetch(`${BASE_URL}/${diveSheetId}`, {
      headers: {'Authorization': `Bearer ${tokenService.getToken()}`}
    })
    console.log(diveSheetId)
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

async function update(updatedSheet, diveSheetId) {
  try {
    console.log('Updating dive sheet with ID:', diveSheetId);
    console.log('Update data:', updatedSheet);
    const res = await fetch(`${BASE_URL}/${diveSheetId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedSheet) // Pass updatedSheet as the body
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
}


async function deleteSheet(diveSheetId) {
  try {
    const res = await fetch(`${BASE_URL}/${diveSheetId}`, {
      method: 'DELETE',
      headers: {'Authorization': `Bearer ${tokenService.getToken()}`}
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}


export { 
  index, 
  create,
  show,
  update,
  deleteSheet
}

