import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { createGoalCompletion } from "../../functions/create-goal-completion";

export async function createGoalCompletionRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/completions",
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async (request) => {
      const { goalId } = request.body;

      const { goalCompletion } = await createGoalCompletion({
        goalId,
      });

      return {
        goalCompletionId: goalCompletion.id,
      };
    }
  );
}
