import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Calendar from './index';

const App = () => {
  const [date, setDate] = useState(dayjs());

  const changeDate = (newDate: Dayjs) => {
    setDate(newDate);
  };
  return (
    <div>
      <Calendar currentDate={date} onChange={changeDate} />
    </div>
  );
};

export default App;
