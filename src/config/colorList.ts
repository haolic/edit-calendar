const colorList = [
  '#025DF4',
  '#DB6BCF',
  '#2498D1',
  '#BBBDE6',
  '#4045B2',
  '#21A97A',
  '#FF745A',
  '#007E99',
  '#FFA8A8',
  '#2391FF',
  '#FFC328',
  '#A0DC2C',
  '#946DFF',
  '#626681',
  '#EB4185',
  '#CD8150',
  '#36BCCB',
  '#327039',
  '#803488',
  '#83BC99',
];

const toHex = (color: string) => {
  const values = color
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',');
  const a = parseFloat(values[3] || '1');
  const r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255);
  const g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255);
  const b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
  return (
    '#' +
    ('0' + r.toString(16)).slice(-2) +
    ('0' + g.toString(16)).slice(-2) +
    ('0' + b.toString(16)).slice(-2)
  );
};

const toRgba = (val: string, opacity?: string | number) => {
  //HEX十六进制颜色值转换为RGB(A)颜色值
  if (/^#/g.test(val)) {
    const a = val.slice(1, 3);
    const b = val.slice(3, 5);
    const c = val.slice(5, 7);

    const rgba = `rgb(${parseInt(a, 16)},${parseInt(b, 16)},${parseInt(c, 16)}${
      opacity || opacity === 0 ? `,${opacity}` : ''
    })`;

    return rgba;
  } else {
    return '无效颜色值';
  }
};

const list = colorList.map((el) => {
  return {
    lineColor: toHex(toRgba(el, 0.5)),
    backgroundColor: toHex(toRgba(el, 0.2)),
  };
});

export default list;
