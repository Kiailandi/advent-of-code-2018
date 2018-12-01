fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => console.log(err || data.split('\n').reduce((a, b) => a + parseInt(b, 10), 0)));
