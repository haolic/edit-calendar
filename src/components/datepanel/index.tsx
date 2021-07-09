import React, { useEffect, useState } from 'react';
import chunk from 'lodash/chunk';
import dayjs from 'dayjs';
import DateCell from '../date-cell';
import { IDatepanel, DateCellItem } from '@/components/types';
import dateInfoGen from '@/utils/dateInfoGen';
import './index.less';

const Datepanel: React.FC<IDatepanel> = (props) => {
  const { value, eventList, firstDayOfWeek } = props;
  const dayjsMonthStart = value.startOf('month');
  const dayjsMonthEnd = value.endOf('month');

  const [allDate, setAllDate] = useState<DateCellItem[][]>([]);

  useEffect(() => {
    const startDate = value.startOf('month').startOf('week');
    const endDate = startDate.add(42, 'days');
    const sortedEventList = eventList.sort((a, b) => {
      let _a = a.timeRange;
      let _b = b.timeRange;
      if (Array.isArray(a.timeRange)) {
        _a = a.timeRange[0];
      }
      if (Array.isArray(b.timeRange)) {
        _b = b.timeRange[0];
      }
      if (dayjs(_a as string).isAfter(dayjs(_b as string))) {
        return 0;
      } else {
        return -1;
      }
    });
    const arr = dateInfoGen(startDate, endDate, sortedEventList);
    setAllDate(chunk(arr, 7));
  }, [value, eventList, firstDayOfWeek]);

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
