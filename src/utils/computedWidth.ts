import { IEventItem } from '@/components/calendar';

const computedWidth = (cell: IEventItem) => {
  console.log(cell);
  return 'calc(100% - 16px)';
};

export default computedWidth;
