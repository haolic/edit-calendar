import React, { useState } from 'react';
import dayjs from 'dayjs';
import Calendar from './index';

const App = () => {
  const [date, setDate] = useState(dayjs());

  const changeDate = (newDate: dayjs.Dayjs) => {
    setDate(newDate);
  };
  return (
    <div>
      <Calendar currentDate={date} onChange={changeDate} />
    </div>
  );
};

export default App;
