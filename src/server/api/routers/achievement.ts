import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { formatAchievement } from "~/server/lib/gemini";

export const achievement = createTRPCRouter({
  format: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      const formatted = await formatAchievement(input.text);
      return {
        formatted,
      };
    }),
});
