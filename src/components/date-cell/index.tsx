import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import classnames from 'classnames';
import { IEventItem } from '../calendar';
import computedWidth from '@/utils/computedWidth';

import './index.less';

interface IDateCell {
  date: Dayjs;
  events: IEventItem[];
  dayjsMonthStart: Dayjs;
  dayjsMonthEnd: Dayjs;
}

const DateCell: React.FC<IDateCell> = (props) => {
  const { date, events, dayjsMonthStart, dayjsMonthEnd } = props;
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
        const width = computedWidth(el);
        return (
          <div key={idx} className={cls} style={{ width }}>
            {isEventFirstDay && (
              <div className="hlc-event-text">{el.title || '未命名'}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DateCell;
