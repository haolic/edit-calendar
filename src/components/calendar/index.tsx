import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Datepicker from '../datepicker';
import Datepanel from '../datepanel';
import Daypanel from '../daypanel';

import './index.less';

interface ICalendar {
  defaultCurrentDate?: dayjs.Dayjs;
  currentDate?: dayjs.Dayjs;
  onChange?: (val: dayjs.Dayjs) => void;
}

const Calendar: React.FC<ICalendar> = (props) => {
  const { defaultCurrentDate, currentDate } = props;

  const [nowDate, setNowDate] = useState<dayjs.Dayjs>(dayjs());

  useEffect(() => {
    setNowDate(currentDate || defaultCurrentDate || dayjs());
  }, [currentDate]);

  const changeDate = (val: dayjs.Dayjs) => {
    setNowDate(currentDate || val);
  };
  return (
    <div className="hlc-calendar">
      <Datepicker value={nowDate} onChange={changeDate} />
      <Daypanel />
      <Datepanel value={nowDate} />
    </div>
  );
};

export default Calendar;
