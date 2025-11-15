import { z } from 'zod';

export const searchIndexSchema = z.array(
  z.object({
    booth_id: z.string(),
    tokens: z.array(z.string()),
  })
);
export type SearchIndex = z.infer<typeof searchIndexSchema>;
