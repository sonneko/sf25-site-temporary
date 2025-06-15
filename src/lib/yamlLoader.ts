import fs from 'fs';
import yaml from 'js-yaml';
import type { Schema } from 'zod';

export function openFile(filePath: string) {
  try {
    const fileContents: string = fs.readFileSync(filePath, 'utf8');
    return fileContents;
  } catch (e) {
    throw new Error(`Failed to open file: ${filePath}.\n error_message: ${e}`);
  }
}

export function parseContents(
  fileContents: string,
  schema: Schema,
  filePath: string
) {
  try {
    const parsed = schema.parse(yaml.load(fileContents));
    return parsed;
  } catch (e) {
    throw new Error(`Failed to parse file: ${filePath}.\n error_message: ${e}`);
  }
}
