fs = require('fs');

const countOccurences = (word) => {
  const occ = {};
  word.split('').forEach(c => occ[c] = (occ[c] || 0) + 1);
  return occ;
}

const getChecksum = (data) => {
  const acc = [0, 0];
  data.forEach(word => { const arr = Object.values(countOccurences(word)); arr.includes(2) && acc[0]++; arr.includes(3) && acc[1]++; });
  return acc[0] * acc[1];
};

fs.readFile('./input.txt', 'utf8', (err, data) => console.log(err || getChecksum(data.split('\n'))));
