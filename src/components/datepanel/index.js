import React, { useEffect, useState } from 'react';
import chunk from 'lodash/chunk';
import dayjs from 'dayjs';
import DateCell from '../date-cell';
import dateInfoGen from '@/utils/dateInfoGen';
import './index.less';
const Datepanel = (props) => {
    const { value, eventList, firstDayOfWeek } = props;
    const dayjsMonthStart = value.startOf('month');
    const dayjsMonthEnd = value.endOf('month');
    const [eventListState, setEventListState] = useState(eventList);
    useEffect(() => {
        const sortedEventList = eventList.sort((a, b) => {
            let _a = a.timeRange;
            let _b = b.timeRange;
            if (Array.isArray(a.timeRange)) {
                _a = a.timeRange[0];
            }
            if (Array.isArray(b.timeRange)) {
                _b = b.timeRange[0];
            }
            if (dayjs(_a).isAfter(dayjs(_b))) {
                return 0;
            }
            else {
                return -1;
            }
        });
        setEventListState(sortedEventList.map((el, idx) => {
            return {
                ...el,
                eventIndex: idx,
            };
        }));
    }, [eventList]);
    const [allDate, setAllDate] = useState([]);
    useEffect(() => {
        const startDate = value.startOf('month').startOf('week');
        const endDate = startDate.add(42, 'days');
        const arr = dateInfoGen(startDate, endDate, eventListState);
        setAllDate(chunk(arr, 7));
    }, [value, eventListState, firstDayOfWeek]);
    const onEventDrop = (item, cell) => {
        if (!cell) {
            return;
        }
        const newList = [...eventListState];
        const currentDropEvent = newList[item.eventIndex];
        const { timeRange } = currentDropEvent;
        if (Array.isArray(timeRange)) {
            // 数组，日期起始结束都需要变
            const offsetDate = cell.date.diff(dayjs(item.timeRange[0]), 'days');
            currentDropEvent.timeRange = [
                dayjs(item.timeRange[0]).add(offsetDate, 'days').format(),
                dayjs(item.timeRange[1]).add(offsetDate, 'days').format(),
            ];
        }
        else {
            currentDropEvent.timeRange = cell.date.format();
        }
        setEventListState(newList);
    };
    return (React.createElement("div", { className: "hlc-datepanel" }, allDate.map((dateRow, rowIdx) => {
        return (React.createElement("div", { key: rowIdx, className: "hlc-daterow" }, dateRow.map((item) => {
            const { date, eventList } = item;
            return (React.createElement(DateCell, { key: date.format(), date: date, events: eventList || [], dayjsMonthEnd: dayjsMonthEnd, dayjsMonthStart: dayjsMonthStart, onEventDrop: onEventDrop }));
        })));
    })));
};
export default Datepanel;
