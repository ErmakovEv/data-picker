import {
  addDays,
  addYears,
  eachDayOfInterval,
  endOfWeek,
  isSameDay,
  startOfWeek,
  subWeeks,
  subYears,
} from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker';
import { locale } from './locale.tsx';
import { forwardRef, ReactNode, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.min.css';
import './Calendar.css';

registerLocale('ru', locale);

interface TCalendar {
  classname?: string;
  month: 1 | 2; // 1 или 2
  isRange: boolean;
  isInline: boolean;
  excludeDays: Date[];
  previouslySelectedDates: Date[];
  getSelectedDate: (dates: Date[]) => void;
}

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
}

function Calendar({
  month,
  isRange,
  isInline,
  excludeDays,
  previouslySelectedDates,
  getSelectedDate,
}: TCalendar) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoverDates, setHoverDates] = useState<Date[]>([]);

  const handleDatesChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      const datesInRange = eachDayOfInterval({ start, end });

      const filteredDates = datesInRange.filter((date) => {
        return !excludeDays.find((excludeDate) => isSameDay(date, excludeDate));
      });
      getSelectedDate(filteredDates);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date) {
      getSelectedDate([date]);
    }
  };

  const getDayClassName = (date: Date) => {
    if (hoverDates.some((hoverDate) => isSameDay(date, hoverDate))) {
      return 'react-datepicker__day--hover-day';
    }

    return previouslySelectedDates.some(
      (selectedDate) =>
        selectedDate.getDate() === date.getDate() &&
        selectedDate.getMonth() === date.getMonth() &&
        selectedDate.getFullYear() === date.getFullYear()
    )
      ? 'previously-selected'
      : '';
  };

  const setToday = () => {
    const today = new Date();
    if (isRange) {
      handleDatesChange([today, today]);
    } else {
      handleDateChange(today);
    }
  };

  const setYesterday = () => {
    const yesterday = addDays(new Date(), -1);
    if (isRange) {
      handleDatesChange([yesterday, yesterday]);
    } else {
      handleDateChange(yesterday);
    }
  };

  const setThisWeek = () => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    const end = endOfWeek(new Date(), { weekStartsOn: 1 });
    handleDatesChange([start, end]);
  };

  const setLastWeek = () => {
    const start = startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 });
    const end = endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 });
    handleDatesChange([start, end]);
  };

  const handleMouseEnter = (dateRange: Date[]) => {
    setHoverDates(dateRange);
  };

  const handleMouseLeave = () => {
    setHoverDates([]);
  };

  const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
    ({ value, onClick }, ref) => (
      <button className="custom-input" onClick={onClick} ref={ref}>
        <img src="./1.svg" alt="calendar icon" className="calendar-icon" />
        {value}
      </button>
    )
  );

  const MyContainer = ({
    className,
    children,
  }: {
    className: string;
    children: ReactNode;
  }) => (
    <div className={className}>
      <div className="calendar">{children}</div>
      <div className="button-group">
        <button
          onClick={setToday}
          onMouseEnter={() => handleMouseEnter([new Date()])}
          onMouseLeave={handleMouseLeave}
        >
          Сегодня
        </button>
        <button
          onClick={setYesterday}
          onMouseEnter={() => handleMouseEnter([addDays(new Date(), -1)])}
          onMouseLeave={handleMouseLeave}
        >
          Вчера
        </button>
        <button
          onClick={setThisWeek}
          onMouseEnter={() =>
            handleMouseEnter(
              eachDayOfInterval({
                start: startOfWeek(new Date(), { weekStartsOn: 1 }),
                end: endOfWeek(new Date(), { weekStartsOn: 1 }),
              })
            )
          }
          onMouseLeave={handleMouseLeave}
        >
          Текущая неделя
        </button>
        <button
          onClick={setLastWeek}
          onMouseEnter={() =>
            handleMouseEnter(
              eachDayOfInterval({
                start: startOfWeek(subWeeks(new Date(), 1), {
                  weekStartsOn: 1,
                }),
                end: endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
              })
            )
          }
          onMouseLeave={handleMouseLeave}
        >
          Прошлая неделя
        </button>
      </div>
    </div>
  );

  const commonProps = {
    showIcon: true,
    toggleCalendarOnIconClick: true,
    selected: startDate,
    locale: 'ru',
    minDate: subYears(new Date(), 1),
    maxDate: addYears(new Date(), 1),
    startDate: startDate || undefined,
    inline: isInline,
    excludeDates: excludeDays,
    monthsShown: month,
    icon: 'fa fa-calendar',
    dayClassName: getDayClassName,
    calendarContainer: MyContainer,
    dateFormat: 'dd.MM.yyyy',
    customInput: <CustomInput />,
  };

  return (
    <div className="wrapper">
      <div>
        {isRange ? (
          <DatePicker
            onChange={handleDatesChange}
            endDate={endDate || undefined}
            selectsRange={true}
            {...commonProps}
          />
        ) : (
          <DatePicker onChange={handleDateChange} {...commonProps} />
        )}
      </div>
    </div>
  );
}

export default Calendar;
