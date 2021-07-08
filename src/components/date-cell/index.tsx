import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import classnames from 'classnames';

import './index.less';

interface IDateCell {
  date: Dayjs;
  dayjsMonthStart: Dayjs;
  dayjsMonthEnd: Dayjs;
}

const DateCell: React.FC<IDateCell> = (props) => {
  const { date, dayjsMonthStart, dayjsMonthEnd } = props;
  const day = date.day();
  const cls = classnames('hlc-dateitem', {
    'not-current-month':
      date.isBefore(dayjsMonthStart) || date.isAfter(dayjsMonthEnd), // 不是当月
    'current-date': date.isSame(dayjs(), 'day'), // 今天
    weekend: day === 0 || day === 6, // 周末
  });
  return (
    <div key={date.format()} className={cls}>
      <span className="date-text">{date.format('D')}</span>
      <div className="hlc-event hlc-event-start">事件</div>
    </div>
  );
};

export default DateCell;
