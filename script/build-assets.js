/*  */

const { parse } = require('csv-parse/sync');
const { readFileSync, writeFileSync } = require('fs');

const ids = readFileSync(process.cwd() + '/assets/booths/allIds.txt')
  .toString()
  .split('\n');
const booths = ids.map(id =>
  JSON.parse(
    readFileSync(process.cwd() + '/assets/booths/' + id + '.json').toString()
  )
);
writeFileSync(process.cwd() + '/public/booths.json', JSON.stringify(booths));
