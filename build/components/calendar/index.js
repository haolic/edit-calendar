import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh';
import 'dayjs/locale/en';
import Datepicker from '../datepicker';
import Datepanel from '../datepanel';
import Daypanel from '../daypanel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './index.less';
const Calendar = (props) => {
    const { defaultCurrentDate, currentDate, onChange, eventList } = props;
    const [firstDayOfWeek, setFirstDayOfWeek] = useState(7);
    /**
     * 组件根据dayjs的每周起始为1还是0来渲染两种日历布局，
     * 中国地区每周从周一开始.day()为1，周日结束.day() === 7。
     * ISO国际标准每周从周日.day()为0，周六结束.day() === 6。
     */
    const firstDay = dayjs().startOf('week').day();
    useEffect(() => {
        if (firstDay === 0) {
            setFirstDayOfWeek(7);
        }
        else {
            setFirstDayOfWeek(1);
        }
    }, [firstDay]);
    const [nowDate, setNowDate] = useState(dayjs());
    useEffect(() => {
        setNowDate(currentDate || defaultCurrentDate || dayjs());
    }, [currentDate]);
    const changeDate = (val) => {
        setNowDate(currentDate || val);
        if (typeof onChange === 'function') {
            onChange(val);
        }
    };
    return (React.createElement("div", { className: "hlc-calendar" },
        React.createElement(Datepicker, { value: nowDate, onChange: changeDate }),
        React.createElement(Daypanel, { firstDayOfWeek: firstDayOfWeek }),
        React.createElement(DndProvider, { backend: HTML5Backend },
            React.createElement(Datepanel, { value: nowDate, eventList: eventList || [], firstDayOfWeek: firstDayOfWeek }))));
};
export default Calendar;
