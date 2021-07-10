import { Dayjs } from 'dayjs';

interface IEventItem {
  timeRange: [string, string] | string;
  title?: string;
  isEventFirstDay?: boolean;
  isEventLastDay?: boolean;
  eventIndex?: number;
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
  onEventDrop: IEventLine['onEventDrop'];
}

interface IDatepanel {
  value: Dayjs;
  eventList: IEventItem[];
  firstDayOfWeek: 1 | 7;
}

interface DateCellItem {
  date: Dayjs;
  eventList: IEventItem[];
}

interface IDatepicker {
  value: Dayjs;
  onChange: (val: Dayjs) => void;
}

interface IDayPanel {
  firstDayOfWeek: 1 | 7;
}
interface DropResult {
  date: Dayjs;
  dropEffect: string;
}

interface IEventLine {
  eventItem: IEventItem;
  date: Dayjs;
  onEventDrop: (eventItem: IEventItem, dropResult: DropResult | null) => void;
}
