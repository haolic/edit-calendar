import React from 'react';

interface IDatepanel {
  value: string;
}

const Datepanel: React.FC<IDatepanel> = (props) => {
  const { value } = props;
  return <div>{value}</div>;
};
export default Datepanel;
