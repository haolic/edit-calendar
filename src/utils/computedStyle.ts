import React from 'react';
import { IEventItem } from '@/components/types';
import dayjs, { Dayjs } from 'dayjs';
import { CELL_PADDING } from '@/config/constant';

const computedStyle = (
  cell: IEventItem,
  date: Dayjs
): {
  style?: React.CSSProperties;
  classname?: string;
} => {
  const { timeRange } = cell;
  if (Array.isArray(timeRange)) {
    // 区间事件
    const [start, end] = timeRange;
    const thisWeek = date.endOf('week');
    const endDayjs = dayjs(end);
    const startDayjs = dayjs(start);
    let classnameStr = '';
    if (endDayjs.isAfter(thisWeek)) {
      // 事件条需要换行，本行事件长度需要填充满本周最后一天。
      const throughNum = thisWeek.diff(date, 'days');

      /**
       * throughNum为事件条需要跨越的日期个数，
       * CELL_PADDING为日期格的padding大小，
       * 2 * throughNum + 1是所有跨越的padding的宽度，
       * 最后的加的throughNum为跨越的日起格边框宽度。
       * 最后加5为模拟折角效果需要延伸的长度。
       */
      let widthStr = `calc(${throughNum + 1}00% + ${
        CELL_PADDING * (2 * throughNum + 1) + throughNum + 5
      }px)`;
      classnameStr = 'hlc-event-need-break';

      const styleObj: { style: React.CSSProperties; classname: string } = {
        style: {
          width: widthStr,
          backgroundColor: cell.color,
        },
        classname: classnameStr,
      };
      if (startDayjs.isBefore(date)) {
        // 需要折行且需要承接上一行
        classnameStr += ' hlc-event-need-prev';

        widthStr = `calc(${throughNum + 1}00% + ${
          CELL_PADDING * (2 * (throughNum + 1)) + throughNum + 10
        }px)`;

        styleObj.classname = classnameStr;
        styleObj.style.width = widthStr;
        styleObj.style.transform = 'translateX(-13px)';
      }
      return styleObj;
    } else {
      // 事件不需要换行
      const throughNum = endDayjs.diff(date, 'days');

      // 计算逻辑一部分同上，最后加offset为需要往前移动5（折角需要5px） + CELL_PADDING像素充满第一个格，(2 * throughNum)不需要加1是因为不需要加最后一个padding。
      const offset = 5 + CELL_PADDING;
      const widthStr = `calc(${throughNum + 1}00% + ${
        CELL_PADDING * (2 * throughNum) + throughNum + offset
      }px)`;
      return {
        style: {
          width: widthStr,
          transform: `translateX(-${offset}px)`,
          backgroundColor: cell.color,
        },
        classname: 'hlc-event-need-prev',
      };
    }
  } else {
    return {
      style: { width: 'calc(100%)', backgroundColor: cell.color },
      classname: '',
    };
  }
};

export default computedStyle;
