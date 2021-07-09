import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/zh';
import 'dayjs/locale/en';
import Calendar, { EventList } from './index';

dayjs.locale('zh');

const App = () => {
  const [date, setDate] = useState(dayjs());

  const eventList: EventList = [
    {
      timeRange: [
        dayjs().format('YYYY-MM-DD'),
        dayjs().add(7, 'days').format('YYYY-MM-DD'),
      ],
      color: '#fff1b8',
      title:
        '2NVIDIA凌晨正式发布了GeForce RTX3090、RTX3080和RTX3070系列显卡，9月17日起陆续开售。',
    },
    {
      timeRange: dayjs().add(1, 'day').format('YYYY-MM-DD'),
      color: '#f4ffb8',
      title:
        '3AMD于10月29日凌晨正式发布RX 6000系列显卡与RDNA 2显卡架构，正式引入DX 12 Ultimate支持，包括实时光线追踪、可变速率着色、网格着色器以及采样器反馈，这次发布的RX 6000系列显卡一共有三款，分别是RX 6900 XT、RX 6800XT以及RX 6800显卡。',
    },
    {
      timeRange: dayjs().add(1, 'day').format('YYYY-MM-DD'),
      color: '#b5f5ec',
      title:
        '3AMD于000系列显卡与RDNA 2显卡架构，正式引入DX 12 Ultimate支持，包括实时光线追踪、可变速率着色、网格着色器以及采样器反馈，这次发布的RX 6000系列显卡一共有三款，分别是RX 6900 XT、RX 6800XT以及RX 6800显卡。',
    },
    {
      timeRange: [
        dayjs().subtract(5, 'days').format('YYYY-MM-DD'),
        dayjs().add(7, 'days').format('YYYY-MM-DD'),
      ],
      color: '#d6e4ff',
      title:
        '1式发布RX 6000系列显卡与RDNA 2显卡架构，正式引入DX 12 Ultimate支持，包括实时光线追踪、可变速率着色、网格着色器以及采样器反馈，这次发布的RX 6000系列显卡一共有三款，分别是RX 6900 XT、RX 6800XT以及RX 6800显卡。',
    },
    {
      timeRange: [
        dayjs().subtract(10, 'days').format('YYYY-MM-DD'),
        dayjs().add(10, 'days').format('YYYY-MM-DD'),
      ],
      color: '#d6e4ff',
      title:
        '1式发布RX 6000系列显卡与RDNA 2显卡架构，正式引入DX 12 Ultimate支持，包括实时光线追踪、可变速率着色、网格着色器以及采样器反馈，这次发布的RX 6000系列显卡一共有三款，分别是RX 6900 XT、RX 6800XT以及RX 6800显卡。',
    },
    {
      timeRange: [
        dayjs().subtract(3, 'days').format('YYYY-MM-DD'),
        dayjs().add(1, 'days').format('YYYY-MM-DD'),
      ],
      color: '#d6e4ff',
      title:
        '1式发布RX 6000系列显卡与RDNA 2显卡架构，正式引入DX 12 Ultimate支持，包括实时光线追踪、可变速率着色、网格着色器以及采样器反馈，这次发布的RX 6000系列显卡一共有三款，分别是RX 6900 XT、RX 6800XT以及RX 6800显卡。',
    },
  ];

  const changeDate = (newDate: Dayjs) => {
    setDate(newDate);
  };

  return (
    <div>
      <Calendar
        currentDate={date}
        onChange={changeDate}
        eventList={eventList}
      />
    </div>
  );
};

export default App;
