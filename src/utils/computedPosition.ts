import _ from 'lodash';
import { DateCellItem, IEventItem } from '../components/types';

let a = 0;

const computedPosition = (list: DateCellItem[]) => {
  const obj: { [key: string]: any } = {};
  list.forEach((el) => {
    if (Array.isArray(el.eventList)) {
      el.eventList.forEach((item: IEventItem) => {
        const id: string = item.id as string;

        if (obj[id]) {
          item.position = obj[id][0].position;
          obj[id].push(item);
        }
      });

      el.eventList.forEach((item) => {
        console.log(a++);
        const id: string = item.id as string;
        if (!obj[id]) {
          obj[id] = [item];
          const minObj = _.minBy(el.eventList, (o: any) => o.position);
          if (minObj === undefined) {
            item.position = 0;
          } else {
            let position = 0;
            for (let i = 0; i < el.eventList.length; i += 1) {
              const isFind = _.find(
                el.eventList,
                (o) => o.position === position
              );
              if (isFind) {
                position += 1;
                continue;
              } else {
                item.position = position;
                break;
              }
            }
          }
        }
      });
    }
  });
  return list;
};

export default computedPosition;
