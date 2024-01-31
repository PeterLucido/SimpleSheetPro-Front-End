import { useState } from 'react';
import styles from './VolOp.module.css';

const VolOrOp = () => {
    const [selectedOption, setSelectedOption] = useState('Vol');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <select
                value={selectedOption}
                onChange={handleChange}
                className={styles.dropdown}
            >
                <option value="V">Voluntary</option>
                <option value="O">Optional</option>
            </select>
        </div>
    );
};

export default VolOrOp;
