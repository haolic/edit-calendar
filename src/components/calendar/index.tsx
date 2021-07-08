import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Datepicker from '../datepicker';
import Datepanel from '../datepanel';
import Daypanel from '../daypanel';

import './index.less';

export interface IEventItem {
  timeRange: [string, string] | string;
  title?: string;
  isEventFirstDay: boolean;
  isEventLastDay: boolean;
}

interface ICalendar {
  defaultCurrentDate?: Dayjs;
  currentDate?: Dayjs;
  onChange?: (val: Dayjs) => void;
  eventList?: IEventItem[];
}

const Calendar: React.FC<ICalendar> = (props) => {
  const { defaultCurrentDate, currentDate, onChange, eventList } = props;

  const [nowDate, setNowDate] = useState<Dayjs>(dayjs());

  useEffect(() => {
    setNowDate(currentDate || defaultCurrentDate || dayjs());
  }, [currentDate]);

  const changeDate = (val: Dayjs) => {
    setNowDate(currentDate || val);
    if (typeof onChange === 'function') {
      onChange(val);
    }
  };
  return (
    <div className="hlc-calendar">
      <Datepicker value={nowDate} onChange={changeDate} />
      <Daypanel />
      <Datepanel value={nowDate} eventList={eventList || []} />
    </div>
  );
};

export default Calendar;
