import React from 'react';
import { addMonths, subMonths } from 'date-fns';

interface CustomHeaderProps {
  date: Date;
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => {
  const month = date.toLocaleString('ru', { month: 'long' });
  const year = date.getFullYear();

  return (
    <div className="custom-header">
      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        &#60;
      </button>
      <span>{`${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`}</span>
      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        &#62;
      </button>
    </div>
  );
};

export default CustomHeader;
