import { z } from 'zod';

export const BoothKindSchema = z
  .enum(['volu', 'club', 'grad', 'clas', 'oper'])
  .describe('企画種別: 有志(volu)、クラブ(club)、学年(grad)、クラス(clas)、運営(oper)');
export type BoothKind = z.infer<typeof BoothKindSchema>;

export const BoothLocationSchema = z
  .enum(['out', 'inside'])
  .describe('企画の開催場所: 屋外(out) または 屋内(inside)');
export type BoothLocation = z.infer<typeof BoothLocationSchema>;

export const IsFoodBoothSchema = z
  .boolean()
  .describe('trueなら食品企画、falseなら非食品企画');
export type IsFoodBooth = z.infer<typeof IsFoodBoothSchema>;

export const BoothSchema = z.object({
  id: z
    .string()
    .describe('企画ID: 英数字で一意。例: amusement_volu'),
  type: BoothKindSchema,
  locate: BoothLocationSchema,
  isFood: IsFoodBoothSchema,
  name: z
    .string()
    .describe('企画名: 表示用の日本語名称。例: アミューズメント課'),
  description: z
    .string()
    .describe('企画の説明文。'),
  place: z
    .string()
    .describe('当日の会場場所名。例: 中庭、体育館、教室番号など'),
  groupName: z
    .string()
    .describe('出展団体名: クラス名やクラブ名などの識別に使用'),
});
export type Booth = z.infer<typeof BoothSchema>;
