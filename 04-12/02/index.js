fs = require('fs');

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
        for(let i = startSleep; i < item.minute; i++ )
          residentSleepers[currentGuard][i] = (residentSleepers[currentGuard][i] || 0) + 1;
        break;
      default:
        currentGuard = /#(\d*)/g.exec(item.action)[1];
        if(!residentSleepers[currentGuard]) {
          residentSleepers[currentGuard] = {};
        };
        break;
    }
  });

  /** Please refactor me (?) */
  const residentSleeper = Object.keys(residentSleepers).filter(rs => Object.keys(residentSleepers[rs]).length).map(rs => { const minute = Object.keys(residentSleepers[rs]).reduce((a, b) => residentSleepers[rs][a] > residentSleepers[rs][b] ? a : b); return [rs, minute, residentSleepers[rs][minute]]; }).sort((a, b) => b[2] - a[2])[0];
  return parseInt(residentSleeper[0]) * residentSleeper[1];
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