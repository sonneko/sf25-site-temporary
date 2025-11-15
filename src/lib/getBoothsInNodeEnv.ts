import { readFileSync } from 'fs';
import { type Booth, boothSchema } from '../types/booth';

let booths: Booth[] = [];

export function getBoothsInNodeEnv(): Booth[] {
  const ids = readFileSync(
    process.cwd() + '/assets/booths/allIds.txt',
    'utf8'
  ).split(',');
  const files = ids.map(id =>
    readFileSync(process.cwd() + '/assets/booths/' + id + '.json', 'utf8')
  );
  booths = [];
  files.forEach(file => {
    const parsed = JSON.parse(file);
    if (parsed['not-complete']) return; // not-complete: trueは無視する
    const booth = boothSchema.parse(JSON.parse(file));
    (booths as Booth[]).push(booth);
  });
  return booths;
}
