import React from 'react';
import dayjs from 'dayjs';
import './index.less';

interface IEventStatus {
  timeRange: [string, string] | string;
}

const EventStatus: React.FC<IEventStatus> = (props) => {
  const { timeRange } = props;
  let endTime = '';
  if (Array.isArray(timeRange)) {
    endTime = timeRange[1];
  } else {
    endTime = timeRange;
  }
  const nowStr = dayjs().format('YYYY-MM-DD');
  if (dayjs(endTime).isBefore(dayjs(nowStr))) {
    // 已逾期
    return <span className="event-overdue">已逾期</span>;
  }
  if (dayjs(endTime).isSame(dayjs(nowStr), 'day')) {
    // 今日到期
    return <span className="event-dueToday">到期</span>;
  }
  if (dayjs(endTime).diff(dayjs(nowStr), 'days') < 3) {
    // 将到期
    return <span className="event-willExpire">将到期</span>;
  }

  return null;
};

export default EventStatus;
