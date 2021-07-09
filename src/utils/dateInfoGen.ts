import { DateCellItem } from '@/components/datepanel';
import { IEventItem } from '@/components/types';
import dayjs, { Dayjs } from 'dayjs';

const dateInfoGen = (
  startDate: Dayjs,
  endDate: Dayjs,
  eventList: IEventItem[]
) => {
  const arr: DateCellItem[] = [];

  for (
    let i = startDate;
    i.valueOf() < endDate.valueOf();
    i = i.add(1, 'day')
  ) {
    const item: DateCellItem = {
      date: i,
      eventList: [],
    };
    eventList.forEach((event) => {
      const { timeRange } = event;
      if (Array.isArray(timeRange)) {
        // 区间
        const [start, end] = timeRange;
        const startDayjs = dayjs(start);
        const endDayjs = dayjs(end);
        if (
          (startDayjs.isBefore(i, 'day') && endDayjs.isAfter(i, 'day')) ||
          startDayjs.isSame(i, 'day') ||
          endDayjs.isSame(i, 'day')
        ) {
          item.eventList.push({
            ...event,
            isEventFirstDay: startDayjs.isSame(i, 'day'),
            isEventLastDay: endDayjs.isSame(i, 'day'),
          });
        }
      } else if (typeof timeRange === 'string') {
        // 单日期
        if (dayjs(timeRange).isSame(i)) {
          item.eventList.push({
            ...event,
            isEventFirstDay: true,
            isEventLastDay: true,
          });
        }
      }
    });
    arr.push(item);
  }
  return arr;
};

export default dateInfoGen;
