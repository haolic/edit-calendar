import React from 'react';
import dayjs from 'dayjs';
import classnames from 'classnames';
import isoWeek from 'dayjs/plugin/isoWeek';
import { IDateCell } from '@/components/types';
import computedStyle from '@/utils/computedStyle';
import { CELL_PADDING } from '@/config/constant';

import './index.less';

dayjs.extend(isoWeek);

const DateCell: React.FC<IDateCell> = (props) => {
  const { date, events, dayjsMonthStart, dayjsMonthEnd } = props;
  const day = date.day();
  const cls = classnames('hlc-dateitem', {
    'not-current-month':
      date.isBefore(dayjsMonthStart) || date.isAfter(dayjsMonthEnd), // 不是当月
    'current-date': date.isSame(dayjs(), 'day'), // 今天
    weekend: day === 0 || day === 6 || day === 7, // 周末
  });

  return (
    <div key={date.format()} className={cls} style={{ padding: CELL_PADDING }}>
      <span className="date-text">{date.format('D')}</span>
      {events.map((eventItem, idx) => {
        const { isEventFirstDay, title } = eventItem;

        const eventInWeekFirstDay = day === date.startOf('week').day();

        const showThisEventBox = isEventFirstDay || eventInWeekFirstDay;
        let style = undefined;
        let extraClassName = undefined;
        if (showThisEventBox) {
          const computedStyleObj = computedStyle(eventItem, date);
          style = computedStyleObj.style;
          extraClassName = computedStyleObj.classname;
        }
        const cls = classnames('hlc-event', extraClassName, {
          'hlc-event-first-day': isEventFirstDay,
          'hlc-event-week-first-day': eventInWeekFirstDay,
        });

        return (
          <div key={idx} className={cls} style={style}>
            {/* 事件起始日期或不是起始日期，但是在每周第一天里需要显示title */}
            {showThisEventBox && (
              <div className="hlc-event-text">{title || '未命名事件'}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DateCell;
