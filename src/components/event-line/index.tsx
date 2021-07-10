import React from 'react';
import classnames from 'classnames';
import computedStyle from '@/utils/computedStyle';
import { IEventLine, DropResult } from '@/components/types';
import { useDrag } from 'react-dnd';

import './index.less';

const EventLine: React.FC<IEventLine> = (props) => {
  const { eventItem, date, onEventDrop } = props;
  const { isEventFirstDay, title } = eventItem;
  const day = date.day();
  const eventInWeekFirstDay = day === date.startOf('week').day();
  const showThisEventBox = isEventFirstDay || eventInWeekFirstDay;

  const [, drag] = useDrag(
    () => ({
      type: 'event',
      item: { ...eventItem, eventIndex: eventItem.eventIndex },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>();
        onEventDrop(item, dropResult);
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [eventItem]
  );

  let style = undefined;
  let extraClassName: {
    [key: string]: boolean;
  } = {};
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
    <div className={cls} style={style} ref={drag}>
      {/* 事件起始日期或不是起始日期，但是在每周第一天里需要显示title */}
      <div
        className="hlc-event-start-line"
        style={{
          background: style && style.color,
        }}
      ></div>
      {showThisEventBox && (
        <div className="hlc-event-text">{title || '未命名事件'}</div>
      )}
    </div>
  );
};

export default EventLine;
