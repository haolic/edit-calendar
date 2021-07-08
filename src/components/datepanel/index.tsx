import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import classnames from 'classnames';

import './index.less';

interface IDatepanel {
  value: dayjs.Dayjs;
}

const Datepanel: React.FC<IDatepanel> = (props) => {
  const { value } = props;
  const dayjsMonthStart = value.startOf('month');
  const dayjsMonthEnd = value.endOf('month');

  const [allDate, setAllDate] = useState<dayjs.Dayjs[][]>([]);

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

    setAllDate(_.chunk(arr, 7));
  }, [value]);

  return (
    <div className="hlc-datepanel">
      {allDate.map((dateRow, rowIdx) => {
        return (
          <div key={rowIdx} className="hlc-daterow">
            {dateRow.map((date) => {
              const currentDayjs = date;
              const day = currentDayjs.day();
              const cls = classnames('hlc-dateitem', {
                'not-current-month':
                  currentDayjs.isBefore(dayjsMonthStart) ||
                  currentDayjs.isAfter(dayjsMonthEnd), // 不是当月
                'current-date': currentDayjs.isSame(dayjs(), 'day'), // 今天
                weekend: day === 0 || day === 6, // 周末
              });
              return (
                <div key={date.format()} className={cls}>
                  <span className="date-text">{date.format('D')}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
export default Datepanel;
