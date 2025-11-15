'use client';
import type { Booth } from '../types/booth';
import { boothSchema } from '../types/booth';
import { z } from 'zod';

let boothsCash: null | Booth[] = null;

async function fetchBooths(): Promise<Booth[]> {
  const json = await fetch('/booths.json').then(res => res.json());
  try {
    const parsed = z.array(boothSchema).parse(json);
    return parsed;
  } catch (err) {
    throw new Error('invalid /booths.json with' + err);
  }
}

export async function getBooths(): Promise<Booth[]> {
  if (boothsCash !== null) return boothsCash;
  boothsCash = await fetchBooths();
  return boothsCash;
}
