import React from 'react';
import dayjs from 'dayjs';
import './index.less';
const Datepicker = (props) => {
    const { value, onChange } = props;
    const addDate = () => {
        onChange(value.add(1, 'month'));
    };
    const subtract = () => {
        onChange(value.subtract(1, 'month'));
    };
    const goToday = () => {
        onChange(dayjs());
    };
    return (React.createElement("div", { className: "hlc-datepicker-wrap" },
        React.createElement("div", { onClick: subtract, className: "hlc-calendar-datepicker-btn" },
            React.createElement("i", { className: "hlc-calendar-icon" }, "\uE658")),
        React.createElement("div", null, value.format('YYYY 年 MM 月')),
        React.createElement("div", { onClick: addDate, className: "hlc-calendar-datepicker-btn" },
            React.createElement("i", { className: "hlc-calendar-icon" }, "\uE659")),
        React.createElement("div", { className: "hlc-to-today" },
            React.createElement("span", { className: "hlc-to-today-text", role: "button", onClick: goToday }, "\u4ECA\u5929"))));
};
export default Datepicker;
