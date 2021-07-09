import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import chunk from 'lodash/chunk';
import DateCell from '../date-cell';

import './index.less';
import { IEventItem } from '@/components/types';
import dateInfoGen from '@/utils/dateInfoGen';

interface IDatepanel {
  value: Dayjs;
  eventList: IEventItem[];
}

export interface DateCellItem {
  date: Dayjs;
  eventList: IEventItem[];
}

const Datepanel: React.FC<IDatepanel> = (props) => {
  const { value, eventList } = props;
  const dayjsMonthStart = value.startOf('month');
  const dayjsMonthEnd = value.endOf('month');

  const [allDate, setAllDate] = useState<DateCellItem[][]>([]);

  useEffect(() => {
    console.log(eventList);
    const startDate = value.startOf('month').startOf('week');

    const endDate = startDate.add(42, 'days');

    const arr = dateInfoGen(startDate, endDate, eventList);

    setAllDate(chunk(arr, 7));
  }, [value, eventList]);

  return (
    <div className="hlc-datepanel">
      {allDate.map((dateRow, rowIdx) => {
        return (
          <div key={rowIdx} className="hlc-daterow">
            {dateRow.map((item) => {
              const { date, eventList } = item;
              return (
                <DateCell
                  key={date.format()}
                  date={date}
                  events={eventList || []}
                  dayjsMonthEnd={dayjsMonthEnd}
                  dayjsMonthStart={dayjsMonthStart}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
export default Datepanel;
