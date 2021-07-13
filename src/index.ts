import Calendar from './components/calendar';

import Datepicker from './components/datepicker';
import Datepanel from './components/datepanel';

import { IEventItem as Item } from './components/types';

import './icon.css';
import './variable.css';

export default Calendar;

export { Datepicker, Datepanel };

export type IEventItem = Item;
export type EventList = Item[];
