import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import classnames from 'classnames';
import { DATE_FORMAT_STR } from '@/config/constant';

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
              const cls = classnames('hlc-dateitem', {
                'not-current-month':
                  currentDayjs.isBefore(dayjsMonthStart) ||
                  currentDayjs.isAfter(dayjsMonthEnd),
                  'current-date': currentDayjs.isSame(dayjs(), 'day')
              });
              return (
                <div key={date} className={cls}>
                  <span className="date-text">{dayjs(date).format('DD')}</span>
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
