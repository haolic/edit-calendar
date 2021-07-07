import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Datepicker from '../datepicker';
import Datepanel from '../datepanel';
import Daypanel from '../daypanel';

import './index.less';

interface ICalendar {
  defaultCurrentDate?: string;
  currentDate?: string;
}

const Calendar: React.FC<ICalendar> = (props) => {
  const { defaultCurrentDate, currentDate } = props;

  const [nowDate, setNowDate] = useState<string>(dayjs().format());

  useEffect(() => {
    setNowDate(currentDate || defaultCurrentDate || dayjs().format());
  }, [currentDate]);

  const changeDate = (val: string) => {
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
