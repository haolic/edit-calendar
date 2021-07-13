import React from 'react';
import './index.less';
const Daypanel = (props) => {
    const { firstDayOfWeek } = props;
    let dayList = ['日', '一', '二', '三', '四', '五', '六'];
    if (firstDayOfWeek === 1) {
        dayList = ['一', '二', '三', '四', '五', '六', '日'];
    }
    return (React.createElement("div", { className: "hlc-daypanel" }, dayList.map((el) => {
        return (React.createElement("div", { key: el, className: "hlc-daypanel-item" },
            "\u661F\u671F",
            el));
    })));
};
export default Daypanel;
