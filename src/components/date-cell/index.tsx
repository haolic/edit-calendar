import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import classnames from 'classnames';

import './index.less';
import { IEventItem } from '../calendar';

interface IDateCell {
  date: Dayjs;
  events: IEventItem[];
  dayjsMonthStart: Dayjs;
  dayjsMonthEnd: Dayjs;
}

const DateCell: React.FC<IDateCell> = (props) => {
  const { date, events, dayjsMonthStart, dayjsMonthEnd } = props;
  console.log(date.format('YYYY-MM-DD'), events);
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
      {events.map((el, idx) => {
        const { isEventFirstDay } = el;
        const cls = classnames('hlc-event', {
          'hlc-event-start': isEventFirstDay,
        });
        return (
          <div key={idx} className={cls} style={{width: 'calc(200% + 16px)'}}>
            {isEventFirstDay && <div className="hlc-event-text">{el.title || '未命名'}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default DateCell;
