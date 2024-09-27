import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { getWeekSummary } from "../../functions/get-week-summary";

export async function summaryRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/summary",
    {
      schema: {},
    },
    async (request) => {
      const { summary } = await getWeekSummary();

      return {
        summary,
      };
    }
  );
}
