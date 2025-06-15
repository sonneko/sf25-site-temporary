import z from 'zod';
import path from 'path';
import { openFile } from './yamlLoader';

export const constantsSchema = z.object({
  'head-title': z.string(),
  'head-description': z.string(),
  // TODO: その他の定数定義
});
export type Constants = z.infer<typeof constantsSchema>;

export default class ConstantsManager {
  private static constants: Constants | null = null;

  private static load() {
    if (this.constants === null) {
      const filePath: string = path.join(
        process.cwd(),
        'assets/constants.yaml'
      );
      const file = openFile(filePath);
      this.constants = constantsSchema.parse(file);
    }
  }

  public static get(key: keyof Constants): string {
    this.load();
    return this.constants![key];
  }
}
