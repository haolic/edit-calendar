export interface IEventItem {
  timeRange: [string, string] | string;
  title?: string;
  isEventFirstDay?: boolean;
  isEventLastDay?: boolean;
  [key: string]: any;
}
