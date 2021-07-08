import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import classnames from 'classnames';

import './index.less';

interface IDatepanel {
  value: string;
}

const Datepanel: React.FC<IDatepanel> = (props) => {
  const { value } = props;
  const dayjsMonthStart = dayjs(value).startOf('month');
  const dayjsMonthEnd = dayjs(value).endOf('month');

  const [allDate, setAllDate] = useState<string[][]>([]);

  useEffect(() => {
    const startDate = dayjs(value).startOf('month').startOf('week').format();

    const endDate = dayjs(startDate).add(42, 'days').format();

    const arr = [];

    for (
      let i = startDate;
      dayjs(i).valueOf() < dayjs(endDate).valueOf();
      i = dayjs(i).add(1, 'day').format()
    ) {
      arr.push(i);
    }

    setAllDate(_.chunk(arr, 7));
  }, [value]);
  console.log(allDate);
  return (
    <div className="hlc-datepanel">
      {allDate.map((dateRow, rowIdx) => {
        return (
          <div key={rowIdx} className="hlc-daterow">
            {dateRow.map((date) => {
              const currentDayjs = dayjs(date);
              const day = currentDayjs.day();
              const cls = classnames('hlc-dateitem', {
                'not-current-month':
                  currentDayjs.isBefore(dayjsMonthStart) ||
                  currentDayjs.isAfter(dayjsMonthEnd), // 不是当月
                'current-date': currentDayjs.isSame(dayjs(), 'day'), // 今天
                weekend: day === 0 || day === 6, // 周末
              });
              return (
                <div key={date} className={cls}>
                  <span className="date-text">{dayjs(date).format('D')}</span>
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
