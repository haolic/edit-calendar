import React, { useEffect, useState } from 'react';
import chunk from 'lodash/chunk';
import dayjs from 'dayjs';
import DateCell from '../date-cell';
import { IDatepanel, DateCellItem, IEventItem, DropResult } from '../types';
import dateInfoGen from '../../utils/dateInfoGen';
import './index.less';
import computedPosition from '../../utils/computedPosition';

const Datepanel: React.FC<IDatepanel> = (props) => {
  const { value, eventList, firstDayOfWeek } = props;
  const dayjsMonthStart = value.startOf('month');
  const dayjsMonthEnd = value.endOf('month');
  const [isDragging, setIsDragging] = useState(false);
  const [eventListState, setEventListState] = useState(eventList);
  const [currentActiveEventId, setCurrentActiveEventId] = useState('');

  useEffect(() => {
    const bodyClick = () => {
      setCurrentActiveEventId('');
    };
    document.body.addEventListener('click', bodyClick);
    return () => {
      document.body.removeEventListener('click', bodyClick);
    };
  }, []);

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
      if (dayjs(_a as string).isAfter(dayjs(_b as string))) {
        return 0;
      } else {
        return -1;
      }
    });
    setEventListState(
      sortedEventList.map((el, idx) => {
        return {
          ...el,
          eventIndex: idx,
        };
      })
    );
  }, [eventList]);

  const [allDate, setAllDate] = useState<DateCellItem[][]>([]);

  useEffect(() => {
    const startDate = value.startOf('month').startOf('week');
    const endDate = startDate.add(42, 'days');
    const arr = dateInfoGen(startDate, endDate, eventListState);
    setAllDate(chunk(arr, 7));
  }, [value, eventListState, firstDayOfWeek]);

  const onEventDrop = (item: IEventItem, cell: DropResult | null) => {
    if (!cell) {
      return;
    }
    const newList = [...eventListState];
    const currentDropEvent = newList[item.eventIndex as number];
    const { timeRange } = currentDropEvent;
    if (Array.isArray(timeRange)) {
      // ???????????????????????????????????????
      const offsetDate = cell.date.diff(dayjs(item.timeRange[0]), 'days');
      currentDropEvent.timeRange = [
        dayjs(item.timeRange[0]).add(offsetDate, 'days').format(),
        dayjs(item.timeRange[1]).add(offsetDate, 'days').format(),
      ];
    } else {
      currentDropEvent.timeRange = cell.date.format();
    }
    setEventListState(newList);
  };

  const changeIsDragging = (val: boolean) => {
    setIsDragging(val);
  };

  const onEventClick = (val: IEventItem) => {
    setCurrentActiveEventId(val.id as string);
  };
  return (
    <div className="hlc-datepanel">
      {allDate.map((dateRow, rowIdx) => {
        const res = computedPosition(dateRow);
        return (
          <div key={rowIdx} className="hlc-daterow">
            {res.map((item) => {
              const { date, eventList } = item;
              return (
                <DateCell
                  key={date.format()}
                  date={date}
                  events={eventList || []}
                  dayjsMonthEnd={dayjsMonthEnd}
                  dayjsMonthStart={dayjsMonthStart}
                  onEventDrop={onEventDrop}
                  isDragging={isDragging}
                  changeIsDragging={changeIsDragging}
                  currentActiveEventId={currentActiveEventId}
                  eventClick={onEventClick}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
export default Datepanel;
