import { DateCellItem } from '../components/types';
import { IEventItem } from '../components/types';
import { Dayjs } from 'dayjs';
declare const dateInfoGen: (startDate: Dayjs, endDate: Dayjs, eventList: IEventItem[]) => DateCellItem[];
export default dateInfoGen;
