import Calendar from './Calendar/Calendar';

const previouslySelectedDates = [
  new Date(2024, 6, 10),
  new Date(2024, 6, 15),
  new Date(2024, 6, 20),
  new Date(2024, 6, 20),
];

const excludeDays = [new Date(2024, 6, 8)];

function App() {
  return (
    <Calendar
      month={2}
      isRange={true}
      isInline={false}
      excludeDays={excludeDays}
      previouslySelectedDates={previouslySelectedDates}
      getSelectedDate={(dates: Date[]) =>
        console.log(dates.map((date) => date.toLocaleDateString()))
      }
    />
  );
}

export default App;
