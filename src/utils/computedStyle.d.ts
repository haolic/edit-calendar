import React from 'react';
import { IEventItem } from '../components/types';
import { Dayjs } from 'dayjs';
declare const computedStyle: (cell: IEventItem, date: Dayjs) => {
    style?: React.CSSProperties | undefined;
    classname: {
        [key: string]: boolean;
    };
};
export default computedStyle;
