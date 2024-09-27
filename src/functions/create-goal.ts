import { db } from "../db";
import { goals } from "../db/schema";

interface CreatGoalRequest {
  title: string;
  desiredWeeklyFrequency: number;
}
export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreatGoalRequest) {
  const [goal] = await db
    .insert(goals)
    .values({
      title,
      desiredWeeklyFrequency,
    })
    .returning();

  return {
    goal,
  };
}
