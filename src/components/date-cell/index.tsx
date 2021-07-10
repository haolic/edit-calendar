import React from 'react';
import dayjs from 'dayjs';
import classnames from 'classnames';
import isoWeek from 'dayjs/plugin/isoWeek';
import { IDateCell } from '@/components/types';
import { CELL_PADDING } from '@/config/constant';
import { useDrop } from 'react-dnd';

import './index.less';
import EventLine from '../event-line';

dayjs.extend(isoWeek);

const DateCell: React.FC<IDateCell> = (props) => {
  const { date, events, dayjsMonthStart, dayjsMonthEnd, onEventDrop } = props;
  const [, drop] = useDrop(() => ({
    accept: 'event',
    drop: () => ({ date }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const day = date.day();

  const cls = classnames('hlc-dateitem', {
    'not-current-month':
      date.isBefore(dayjsMonthStart) || date.isAfter(dayjsMonthEnd), // 不是当月
    'current-date': date.isSame(dayjs(), 'day'), // 今天
    weekend: day === 0 || day === 6 || day === 7, // 周末
  });

  return (
    <div
      key={date.format()}
      ref={drop}
      role={'dateCell'}
      className={cls}
      style={{ padding: CELL_PADDING }}
    >
      <span className="date-text">{date.format('D')}</span>
      {events.map((eventItem, idx) => {
        return (
          <EventLine
            key={idx}
            eventItem={eventItem}
            date={date}
            onEventDrop={onEventDrop}
          />
        );
      })}
    </div>
  );
};

export default DateCell;
