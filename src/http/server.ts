import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createGoalRoute } from "./routes/create-goal";
import { pedingGoalsRoute } from "./routes/peding-goals";
import { createGoalCompletionRoute } from "./routes/create-goal-completion";
import { summaryRoute } from "./routes/summary";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, { origin: "*" });

app.register(createGoalRoute);
app.register(pedingGoalsRoute);
app.register(createGoalCompletionRoute);
app.register(summaryRoute);

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
