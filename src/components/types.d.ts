import { Dayjs } from 'dayjs';

export interface IEventItem {
  timeRange: [string, string] | string;
  title?: string;
  isEventFirstDay?: boolean;
  isEventLastDay?: boolean;
  [key: string]: any;
}

export interface ICalendar {
  defaultCurrentDate?: Dayjs;
  currentDate?: Dayjs;
  onChange?: (val: Dayjs) => void;
  eventList?: IEventItem[];
}