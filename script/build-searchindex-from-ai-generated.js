const { readFileSync, writeFileSync } = require('fs');

const trimed = readFileSync(
  process.cwd() + '/public/ai-generated-search-index.json'
)
  .toString()
  .replaceAll(' ', '')
  .replaceAll('\n', '');
writeFileSync(process.cwd() + '/public/search-index-last.json', trimed);
