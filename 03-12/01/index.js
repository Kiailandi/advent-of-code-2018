fs = require('fs');

const getMap = (items) => {
  const map = {};
  items.forEach(item => {
    for(let i = item.i + 1; i < item.i + 1 + item.w; i++) {
      for(let j = item.j + 1; j < item.j + 1 + item.h; j++) {
        map[`${i}-${j}`] = (map[`${i}-${j}`] || 0) + 1;
      }
    }
  });
  return map;
};

const getOverlaps = (data) => {
  const items = data.map(r => { const matches = /(\d*),(\d*): (\d*)x(\d*)/g.exec(r); return { i: parseInt(matches[1]), j: parseInt(matches[2]), w: parseInt(matches[3]), h: parseInt(matches[4])}});
  return Object.values(getMap(items)).filter(v => v > 1).length;
}

fs.readFile('./input.txt', 'utf8', (err, data) => console.log(err || getOverlaps(data.split('\n'))));