import { DateCellItem } from '../components/types';
import { IEventItem } from '../components/types';
import dayjs, { Dayjs } from 'dayjs';
import colorList from '../config/colorList';

const dateInfoGen = (
  startDate: Dayjs,
  endDate: Dayjs,
  eventList: IEventItem[]
) => {
  const arr: DateCellItem[] = [];
  const reduceEventList = [...eventList];

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

    // console.log(item.eventList);
    // if (item.eventList && item.eventList.length) {
    //   item.eventList.reduce((a, b, i) => {
    //     if (a && b && (b.eventIndex as number) - (a.eventIndex as number) > 1) {
    //       const nextItem = item.eventList.splice(i, 1);
    //       item.eventList.splice(i - 1, 0, nextItem[0]);
    //       return nextItem[0];
    //     }
    //     return b;
    //   });
    // }

    // console.log(item);
    arr.push(item);
  }
  return arr;
};

export default dateInfoGen;
