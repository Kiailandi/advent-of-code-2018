fs = require('fs');

const checkOverlap = (items, map) => {
  let goodOneIndex = -1;
  let k = 0;
  while(goodOneIndex === -1 && k < Object.keys(map).length){
    goodOneIndex = k + 1;
    for(let i = items[k].i + 1; i < items[k].i + 1 + items[k].w && goodOneIndex != -1; i++) {
      for(let j = items[k].j + 1; j < items[k].j + 1 + items[k].h && goodOneIndex != -1; j++) {
        if(map[`${i}-${j}`] > 1) {
            goodOneIndex = -1;
        }
      }
    }
    k++;
  }
  return goodOneIndex;
}

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

const getnotOverlaped = (data) => {
  const items = data.map(r => { const matches = /(\d*),(\d*): (\d*)x(\d*)/g.exec(r); return { i: parseInt(matches[1]), j: parseInt(matches[2]), w: parseInt(matches[3]), h: parseInt(matches[4])}});
  return checkOverlap(items, getMap(items));
} 

fs.readFile('./input.txt', 'utf8', (err, data) => console.log(err || getnotOverlaped(data.split('\n'))));