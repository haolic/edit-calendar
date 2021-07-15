import React, { useEffect } from 'react';
import classnames from 'classnames';
import computedStyle from '../../utils/computedStyle';
import { IEventLine, DropResult } from '../types';
import { useDrag } from 'react-dnd';
import EventStatus from '../event-status';

import './index.less';

const EventLine: React.FC<IEventLine> = (props) => {
  const {
    eventItem,
    date,
    onEventDrop,
    isDragging,
    changeIsDragging,
    currentActiveEventId,
    eventClick,
  } = props;
  const { isEventFirstDay, title, timeRange } = eventItem;
  const day = date.day();
  const eventInWeekFirstDay = day === date.startOf('week').day();
  const showThisEventBox = isEventFirstDay || eventInWeekFirstDay;

  const [{ draging }, drag, dragPreview] = useDrag(
    () => ({
      type: 'event',
      item: { ...eventItem, eventIndex: eventItem.eventIndex },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>();
        changeIsDragging(false);
        onEventDrop(item, dropResult);
      },
      collect: (monitor) => ({
        draging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [eventItem]
  );

  useEffect(() => {
    changeIsDragging(draging);
  }, [draging]);

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
    'hlc-event-active':
      currentActiveEventId === eventItem.id && showThisEventBox,
  });

  return draging ? (
    <div
      className="hlc-event"
      ref={dragPreview}
      style={{
        pointerEvents: isDragging ? 'none' : 'auto',
      }}
    ></div>
  ) : (
    <div
      className={cls}
      style={{
        ...style,
        borderColor: style && style.color,
        pointerEvents: isDragging ? 'none' : 'auto',
      }}
      ref={drag}
      onClick={(e) => {
        e.stopPropagation();
        eventClick(eventItem);
      }}
    >
      {/* 事件起始日期或不是起始日期，但是在每周第一天里需要显示title */}
      <div
        className="hlc-event-start-line"
        style={{
          background: style && style.color,
        }}
      ></div>
      {extraClassName['hlc-event-need-break'] && (
        <div
          className="hlc-event-need-break-block"
          style={{
            borderTop: `2px solid ${style && style.color}`,
            borderLeft: `2px solid ${style && style.color}`,
            borderBottom: `2px solid transparent`,
            borderRight: `2px solid transparent`,
          }}
        ></div>
      )}

      {extraClassName['hlc-event-need-prev'] && (
        <div
          className="hlc-event-need-prev-block"
          style={{
            borderTop: `2px solid transparent`,
            borderLeft: `2px solid transparent`,
            borderBottom: `2px solid ${style && style.color}`,
            borderRight: `2px solid ${style && style.color}`,
          }}
        ></div>
      )}

      {showThisEventBox && (
        <div className="hlc-event-text" title={title}>
          <EventStatus timeRange={timeRange} />
          {title || '未命名事件'}
        </div>
      )}
    </div>
  );
};

export default EventLine;
