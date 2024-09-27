import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { getWeekPendingGoals } from "../../functions/get-week-pending-goals";

export async function pedingGoalsRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/pending-goals",
    {
      schema: {},
    },
    async (request) => {
      const { pendingGoals } = await getWeekPendingGoals();

      return {
        pendingGoals,
      };
    }
  );
}
