import React from 'react';
import './index.less';

const Daypanel = () => {
  const dayList = ['一', '二', '三', '四', '五', '六', '日'];
  return (
    <div className="hlc-daypanel">
      {dayList.map((el) => {
        return <div key={el} className="hlc-daypanel-item">星期{el}</div>;
      })}
    </div>
  );
};

export default Daypanel;
