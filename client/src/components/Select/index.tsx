import React, { useState } from 'react'

import styles from './select.module.scss';
import Option from 'components/Option';

import { ISelect, ISelectValue } from './interface';

const Select:React.FC<ISelect> = ({ values, activeValue, onChange }) => {
  const [optionsListActive, setOptionsListActive] = useState(false);

  const handleChange = (value: ISelectValue) => {
    setOptionsListActive(false);
    onChange(value);
  }

  return (
    <div className={styles.selectWrapper}>
      <h5 className={styles.select} onClick={() => setOptionsListActive(!optionsListActive)}>
        <img src={activeValue.icon} alt={`${activeValue.title} icon`} />
        {activeValue.title}
      </h5>
      <ul className={[styles.optionsList, optionsListActive ? styles.optionsActive : ''].join(' ')}>
        {values.map((value, index) => (
          <Option 
            key={index} 
            value={value}
            isActive={value.title === activeValue.title} 
            onChange={handleChange} 
          />
        ))}
      </ul>
    </div>
  )
}

export default Select;