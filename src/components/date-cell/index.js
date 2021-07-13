import React from 'react';
import dayjs from 'dayjs';
import classnames from 'classnames';
import isoWeek from 'dayjs/plugin/isoWeek';
import { CELL_PADDING } from '../../config/constant';
import { useDrop } from 'react-dnd';
import './index.less';
import EventLine from '../event-line';
dayjs.extend(isoWeek);
const DateCell = (props) => {
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
        'not-current-month': date.isBefore(dayjsMonthStart) || date.isAfter(dayjsMonthEnd),
        'current-date': date.isSame(dayjs(), 'day'),
        weekend: day === 0 || day === 6 || day === 7, // 周末
    });
    return (React.createElement("div", { key: date.format(), ref: drop, role: 'dateCell', className: cls, style: { padding: CELL_PADDING } },
        React.createElement("span", { className: "date-text" }, date.format('D')),
        events.map((eventItem, idx) => {
            return (React.createElement(EventLine, { key: idx, eventItem: eventItem, date: date, onEventDrop: onEventDrop }));
        })));
};
export default DateCell;
