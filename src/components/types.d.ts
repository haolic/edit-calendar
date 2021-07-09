import { Dayjs } from 'dayjs';

interface IEventItem {
  timeRange: [string, string] | string;
  title?: string;
  isEventFirstDay?: boolean;
  isEventLastDay?: boolean;
  [key: string]: any;
}

interface ICalendar {
  defaultCurrentDate?: Dayjs;
  currentDate?: Dayjs;
  onChange?: (val: Dayjs) => void;
  eventList?: IEventItem[];
}

interface IDateCell {
  date: Dayjs;
  events: IEventItem[];
  dayjsMonthStart: Dayjs;
  dayjsMonthEnd: Dayjs;
}

interface IDatepanel {
  value: Dayjs;
  eventList: IEventItem[];
}

interface DateCellItem {
  date: Dayjs;
  eventList: IEventItem[];
}


interface IDatepicker {
  value: Dayjs;
  onChange: (val: Dayjs) => void;
}