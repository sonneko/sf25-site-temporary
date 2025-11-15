import "server-only";
import type { Booth } from '../types/booth';
import { boothSchema } from '../types/booth';

let booths: Booth[] | null = null;

async function getBooths(): Promise<Booth[]> {
  if (booths !== null) return booths;

  const { readFileSync } = import("fs");

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
    if (parsed['not-complete']) return;
    const booth = boothSchema.parse(JSON.parse(file));
    (booths as Booth[]).push(booth);
  });
  return booths;
}

export async function getBoothsById(id: string): Promise<Booth | undefined> {
  return (await getBooths()).find(booth => booth.booth_id === id);
}

export async function getAllBooths(): Promise<Booth[]> {
  return getBooths();
}

export async function getAllBoothsIDs(): Promise<string[]> {
  return (await getBooths()).map(booth => booth.booth_id);
}
