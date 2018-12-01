fs = require('fs');

const repeat = (values) => { 
  const freqs = {};
  let found;
  let i = 0;
  let freq = 0;

  while(!found) {
    freq = freq + parseInt(values[i], 10);
    freqs[freq] = (freqs[freq] || 0) + 1;
    if(freqs[freq] > 1){
      found = true;
    } else {
      i = i === values.length - 1 ? 0 : i + 1; 
    }
  }
  return freq;
}; 

fs.readFile('./input.txt', 'utf8', (err, data) => console.log(err || repeat(data.split('\n'))));
