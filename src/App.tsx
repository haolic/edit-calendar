import React, { useState } from 'react';
import dayjs from '_dayjs@1.10.6@dayjs';
import Calendar from './index';

const App = () => {
  // const [date, setDate] = useState(dayjs('2020-02-01').format());

  // const changeDate = () => {
  //   setDate(dayjs(date).subtract(1, 'month').format());
  // };
  return (
    <div>
      <Calendar defaultCurrentDate={dayjs('2020-02-01').format()} />
      {/* <button onClick={changeDate}>点击改变时间</button> */}
    </div>
  );
};

export default App;
