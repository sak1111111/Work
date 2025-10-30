import React from 'react';
import BasicHooks from './BasicHooks';
import AdvancedHooks from './AdvancedHooks';
import CustomHooks from './CustomHooks';

const HooksTests = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Тестирование React хуков</h1>
      <p>Этот компонент демонстрирует все виды React хуков</p>
      
      <BasicHooks />
      <AdvancedHooks />
      <CustomHooks />
    </div>
  );
};

export default HooksTests;