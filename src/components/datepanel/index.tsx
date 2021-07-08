import React, { useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import chunk from 'lodash/chunk';
import DateCell from '../date-cell';

import './index.less';

interface IDatepanel {
  value: Dayjs;
}

const Datepanel: React.FC<IDatepanel> = (props) => {
  const { value } = props;
  const dayjsMonthStart = value.startOf('month');
  const dayjsMonthEnd = value.endOf('month');

  const [allDate, setAllDate] = useState<Dayjs[][]>([]);

  useEffect(() => {
    const startDate = value.startOf('month').startOf('week');

    const endDate = startDate.add(42, 'days');

    const arr = [];

    for (
      let i = startDate;
      i.valueOf() < endDate.valueOf();
      i = i.add(1, 'day')
    ) {
      arr.push(i);
    }

    setAllDate(chunk(arr, 7));
  }, [value]);

  return (
    <div className="hlc-datepanel">
      {allDate.map((dateRow, rowIdx) => {
        return (
          <div key={rowIdx} className="hlc-daterow">
            {dateRow.map((date) => {
              return (
                <DateCell
                  key={date.format()}
                  date={date}
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
