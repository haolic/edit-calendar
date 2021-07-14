import React from 'react';
import { IDayPanel } from '../types';
import './index.less';

const Daypanel: React.FC<IDayPanel> = (props) => {
  const { firstDayOfWeek } = props;

  let dayList = ['日', '一', '二', '三', '四', '五', '六'];
  if (firstDayOfWeek === 1) {
    dayList = ['一', '二', '三', '四', '五', '六', '日'];
  }

  return (
    <div className="hlc-daypanel">
      {dayList.map((el) => {
        return (
          <div key={el} className="hlc-daypanel-item">
            星期{el}{window.screen.availWidth} {window.screen.width} {window.devicePixelRatio}
          </div>
        );
      })}
    </div>
  );
};

export default Daypanel;
