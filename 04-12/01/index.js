fs = require('fs');

/** there are surely more concise ways of doing this,
 *  but I wanted to have some easy-to-look-at data to work with */
const getResidentSleeper = (data) => {
  const residentSleepers = {};
  let currentGuard = '';
  let startSleep = 0;  
  data.forEach((item) => {
    switch (item.action) {
      case 'falls asleep':
        startSleep = item.minute;
        break;
      case 'wakes up':
        residentSleepers[currentGuard]['napSum'] += (item.minute - startSleep);
        for(let i = startSleep; i < item.minute; i++ )
          residentSleepers[currentGuard]['napMap'][i] = (residentSleepers[currentGuard]['napMap'][i] || 0) + 1;
        break;
      default:
        currentGuard = /#(\d*)/g.exec(item.action)[1];
        if(!residentSleepers[currentGuard]) {
          residentSleepers[currentGuard] = {};
          residentSleepers[currentGuard]['napSum'] = 0;
          residentSleepers[currentGuard]['napMap'] = {};
        };
        break;
    }
  });
  const residentSleeper = Object.keys(residentSleepers).reduce((a, b) => residentSleepers[a]['napSum'] > residentSleepers[b]['napSum'] ? a : b);
  const napMap = residentSleepers[residentSleeper]['napMap'];
  const prefNapMin = Object.keys(napMap).reduce((a, b) => napMap[a] > napMap[b] ? a : b);
  return parseInt(residentSleeper) * prefNapMin;
};

const sortData = (data) => data.sort((a, b) => {
  return (a.year - b.year || a.month - b.month || a.day - b.day || a.hour - b.hour || a.minute - b.minute);
});

const parseData = (data) => data.map(r =>{
  const matches = /\[(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d)\] (.*)/g.exec(r);
  return {
    year: parseInt(matches[1]),
    month: parseInt(matches[2]),
    day: parseInt(matches[3]),
    hour: parseInt(matches[4]),
    minute: parseInt(matches[5]),
    action: matches[6]
  };
});

fs.readFile('./input.txt', 'utf8', (err, data) => console.log(err || getResidentSleeper(sortData(parseData(data.split('\n'))))));