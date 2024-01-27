import { useState } from 'react';
import './Rules.module.css'

const Rules = () => {
  const [showRules, setShowRules] = useState(false);

  const toggleRules = () => {
    setShowRules(!showRules);
  };

  return (
    <div className="rules-container">
      <button className="rules-icon" onClick={toggleRules}>
        ℹ️
      </button>
      {showRules && (
        <div className="rules-popup">
          <h2>Diving Rules</h2>
          {/* Insert your diving rules content here */}
          <p>Rule 1: ...</p>
          <p>Rule 2: ...</p>
          {/* Add more rules as needed */}
          <button className="close-btn" onClick={toggleRules}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Rules;
