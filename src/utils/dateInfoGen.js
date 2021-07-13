import dayjs from 'dayjs';
import colorList from '@/config/colorList';
const dateInfoGen = (startDate, endDate, eventList) => {
    const arr = [];
    for (let i = startDate; i.valueOf() < endDate.valueOf(); i = i.add(1, 'day')) {
        const item = {
            date: i,
            eventList: [],
        };
        eventList.forEach((ev, idx) => {
            const { timeRange } = ev;
            const color = colorList[idx % colorList.length];
            if (Array.isArray(timeRange)) {
                // 区间
                const [start, end] = timeRange;
                const startDayjs = dayjs(start);
                const endDayjs = dayjs(end);
                if ((startDayjs.isBefore(i, 'day') && endDayjs.isAfter(i, 'day')) ||
                    startDayjs.isSame(i, 'day') ||
                    endDayjs.isSame(i, 'day')) {
                    item.eventList.push({
                        ...ev,
                        color,
                        isEventFirstDay: startDayjs.isSame(i, 'day'),
                        isEventLastDay: endDayjs.isSame(i, 'day'),
                    });
                }
            }
            else if (typeof timeRange === 'string') {
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
