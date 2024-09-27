import { count, eq, sql } from "drizzle-orm";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";

import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);

interface CreatGoalCompletionRequest {
  goalId: string;
}
export async function createGoalCompletion({
  goalId,
}: CreatGoalCompletionRequest) {
  const currentYear = dayjs().year();
  const currentWeek = dayjs().week();

  const goalCompletionCounts = db.$with("goal_completion_counts").as(
    db
      .select({
        goalId: goals.id,
        completionCount: count(goalCompletions.id).as("completionCount"),
      })
      .from(goalCompletions)
      .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
      .groupBy(goals.id)
  );

  const result = await db
    .with(goalCompletionCounts)
    .select({
      isInComplete: sql`COALESCE(${goals.desiredWeeklyFrequency}, 0) > COALESCE(${goalCompletionCounts.completionCount}, 0)`,
    })
    .from(goals)
    .leftJoin(goalCompletionCounts, eq(goalCompletionCounts.goalId, goals.id))
    .where(eq(goals.id, goalId))
    .limit(1);

  const { isInComplete } = result[0];
  console.log({ isInComplete });

  if (!isInComplete) {
    throw new Error("Goal already completed this week!");
  }

  const [goalCompletion] = await db
    .insert(goalCompletions)
    .values({
      goalId,
    })
    .returning();

  return {
    goalCompletion,
  };
}
