import React from 'react';
import dayjs from 'dayjs';

import { IDatepicker } from '../types';

import './index.less';


const Datepicker: React.FC<IDatepicker> = (props) => {
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

  return (
    <div className="hlc-datepicker-wrap">
      <div onClick={subtract} className="hlc-calendar-datepicker-btn">
        <i className="hlc-calendar-icon">&#xe658;</i>
      </div>
      <div>{value.format('YYYY 年 MM 月')}</div>
      <div onClick={addDate} className="hlc-calendar-datepicker-btn">
        <i className="hlc-calendar-icon">&#xe659;</i>
      </div>
      <div className="hlc-to-today">
        <span className="hlc-to-today-text" role="button" onClick={goToday}>
          今天
        </span>
      </div>
    </div>
  );
};

export default Datepicker;
