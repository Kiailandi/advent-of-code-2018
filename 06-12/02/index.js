fs = require('fs');

const getManhattanDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const formatData = (data) => data.map(p => { return {x: parseInt(p.split(',')[0].trim()), y: parseInt(p.split(',')[1].trim())} });

const getBiggestArea = (data) => {
  const map = {};
  const maxX = data.reduce((a, b) => a.x > b.x ? a : b).x;
  const minX = data.reduce((a, b) => a.x < b.x ? a : b).x;
  const maxY = data.reduce((a, b) => a.y > b.y ? a : b).y;
  const minY = data.reduce((a, b) => a.y < b.y ? a : b).y;

  for(let i = minX; i < maxX; i++) {
    for(let j = minY; j < maxY; j++) {
      map[`${i}-${j}`] = data.map(p => getManhattanDistance({x: i, y: j}, p)).reduce((a, b) => a + b, 0) < 10000;
    }
  }

  return Object.values(map).filter(p => p).length;
};

fs.readFile('./input.txt', 'utf8', (err, data) => console.log(err || getBiggestArea(formatData(data.split('\n')))));