const InfoInput = () => {
  return (  
  <div className="validation-component">
    <div className="status">
        <span className="checkmark">✔</span>
        <span className="status-text">VALID</span>
    </div>
    <input type="text" className="input-field" placeholder="MICDS Invite" />
    <input type="text" className="input-field" placeholder="MICDS Invite" />
    <select className="input-field">
        <option selected>11 Dive Sheet</option>
    </select>
    <div className="buttons">
        <button className="btn save">Save</button>
        <button className="btn print">Print</button>
        <button className="btn delete">Delete</button>
    </div>
  </div>
  );
}

export default InfoInput;
