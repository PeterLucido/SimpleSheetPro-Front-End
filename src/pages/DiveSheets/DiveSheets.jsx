import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const DiveSheet = ({ title }) => (
  <div className="flex flex-col justify-items-center items-center border border-blue-500 m-auto p-5 w-80 h-48 rounded-lg absolute inset-0 gap-4">
    <h1>{title}</h1>
    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">Open</button>
  </div>
);

const DiveSheets = () => {
  const [diveSheets, setDiveSheets] = useState([]);
  const [newDiveSheetTitle, setNewDiveSheetTitle] = useState('');

  const createDiveSheet = (e) => {
    e.preventDefault();
    if (newDiveSheetTitle !== '') {
      setDiveSheets([...diveSheets, newDiveSheetTitle]);
      setNewDiveSheetTitle('');
    }
  };

  return (
    <div>
      {diveSheets.length === 0 ? (
        <div className="flex flex-col justify-center items-center border border-blue-500 m-auto p-5 w-80 h-48 rounded-lg absolute inset-0 gap-4">
          <h1>Create a Dive Sheet</h1>
          <NavLink to="/NewDiveSheet" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
            Create
          </NavLink>
        </div>
      ) : (
        diveSheets.map((title, index) => (
          <DiveSheet key={index} title={title} />
        ))
      )}
    </div>
  );
};

export default DiveSheets;
