import React, { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh';
import 'dayjs/locale/en';
import Calendar from './index';
dayjs.locale('zh');
const App = () => {
    const [date, setDate] = useState(dayjs());
    const eventList = [
        {
            timeRange: [
                dayjs().format('YYYY-MM-DD'),
                dayjs().add(7, 'days').format('YYYY-MM-DD'),
            ],
            title: 'RTX3070系列显卡，9月17日起陆续开售。',
        },
        {
            timeRange: dayjs().add(1, 'day').format('YYYY-MM-DD'),
            title: '以及RX 6800显卡。',
        },
        {
            timeRange: dayjs().add(1, 'day').format('YYYY-MM-DD'),
            title: '显卡。',
        },
        {
            timeRange: dayjs().add(1, 'day').format('YYYY-MM-DD'),
            title: '显卡。',
        },
        {
            timeRange: dayjs().add(1, 'day').format('YYYY-MM-DD'),
            title: '显卡。',
        },
        {
            timeRange: dayjs().add(1, 'day').format('YYYY-MM-DD'),
            title: '显卡。',
        },
        {
            timeRange: dayjs().add(1, 'day').format('YYYY-MM-DD'),
            title: '显卡。',
        },
        {
            timeRange: dayjs().add(1, 'day').format('YYYY-MM-DD'),
            title: '显卡。',
        },
        {
            timeRange: dayjs().add(1, 'day').format('YYYY-MM-DD'),
            title: '显卡。',
        },
        {
            timeRange: [
                dayjs().subtract(5, 'days').format('YYYY-MM-DD'),
                dayjs().add(7, 'days').format('YYYY-MM-DD'),
            ],
            title: '1式发布RX 次发布的RX 6000系列显卡一共有三款，分别是RX 6900 XT、RX 6800XT以及RX 6800显卡。',
        },
        {
            timeRange: [
                dayjs().subtract(10, 'days').format('YYYY-MM-DD'),
                dayjs().add(10, 'days').format('YYYY-MM-DD'),
            ],
            title: '事件',
        },
        {
            timeRange: [
                dayjs().subtract(3, 'days').format('YYYY-MM-DD'),
                dayjs().add(1, 'days').format('YYYY-MM-DD'),
            ],
            title: '着色、网格着色器以及采样器反馈，这次发布的RX 6000系列显卡一共有三款，分别是RX 6900 XT、RX 6800XT以及RX 6800显卡。',
        },
    ];
    const changeDate = (newDate) => {
        setDate(newDate);
    };
    return (React.createElement("div", null,
        React.createElement(Calendar, { currentDate: date, onChange: changeDate, eventList: eventList })));
};
export default App;