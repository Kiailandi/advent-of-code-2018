fs = require('fs');

const getPolymer = (data) => {
  let oldLength = data.length;
  let reduced = true;
  let i = 0;
  while(reduced){
    if(i > data.length - 2) {
      reduced = data.length < oldLength;
      oldLength = data.length;
      i = 0;
    }
    if((data[i] === data[i+1].toUpperCase()  || data[i] === data[i+1].toLowerCase()) && (data[i] !== data[i+1])) {
      /** is there a better way to do this? */
      data[i] = '';
      data[i+1] = '';
      data = data.join('').split('');
    }
    i++;
  };
  return data;
};

const getBestPolymerLength = (data) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  return Math.min(...alphabet.map(l => getPolymer(data.replace(new RegExp(l,"gi"), '').split('')).length));
};

fs.readFile('./input.txt', 'utf8', (err, data) => console.log(err || getBestPolymerLength(data)));