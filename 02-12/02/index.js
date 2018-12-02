fs = require('fs');

/** This is a terrible solution that I will eventually refactor. 
 ** I was tired cuz I lost a lot of time debugging stupid errors I made.
 */

const getDiffs = (w1, w2) => {
  if(w1.length != w2.length || w1 === w2) {
      return -1;
  } else {
    let diffIndex = -1;
    for(let i = 0; i < w1.length; i++) {
      if(w1[i] != w2[i]){
        if(diffIndex < 0){
          diffIndex = i;
        } else {
          return -1;
        }
      }
    }
    return diffIndex;
  }
};

const getSiblings = (word, words) => {
  let diffIndex = -1;
  let i = 0;
  while (diffIndex < 0 && i < words.length) {
      diffIndex = getDiffs(word, words[i]);
      i++;
  }
  return [word, diffIndex > -1 ? words[i-1] : '', diffIndex];
};

const getCommon = (data) => {
  const siblings = data.map((word, i) => getSiblings(word, data)).filter(c =>  c[1]);
  return siblings[0][0].split('').filter((v, i) => i != siblings[0][2]).join('');
};

fs.readFile('./input.txt', 'utf8', (err, data) => console.log(err || getCommon(data.split('\n'))));
