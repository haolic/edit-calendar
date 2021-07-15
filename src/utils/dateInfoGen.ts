import { DateCellItem } from '../components/types';
import { IEventItem } from '../components/types';
import dayjs, { Dayjs } from 'dayjs';
import colorList from '../config/colorList';
import { v4 as uuid } from 'uuid';

const dateInfoGen = (
  startDate: Dayjs,
  endDate: Dayjs,
  eventList: IEventItem[]
) => {
  const arr: DateCellItem[] = [];
  const reduceEventList = eventList.map((el) => {
    return {
      ...el,
      id: uuid(),
    };
  });

  for (
    let i = startDate;
    i.valueOf() < endDate.valueOf();
    i = i.add(1, 'day')
  ) {
    const item: DateCellItem = {
      date: i,
      eventList: [],
    };
    reduceEventList.forEach((ev, idx) => {
      const { timeRange } = ev;
      const color = colorList[idx % colorList.length];

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
            ...ev,
            color,
            isEventFirstDay: startDayjs.isSame(i, 'day'),
            isEventLastDay: endDayjs.isSame(i, 'day'),
          });
        }
      } else if (typeof timeRange === 'string') {
        // 单日期
        if (dayjs(timeRange).isSame(i)) {
          item.eventList.push({
            ...ev,
            color,
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
