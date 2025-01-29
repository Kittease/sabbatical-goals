'use server'

import { Days, type GoalStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { type Goal } from "@/app/types";
import prisma from "@/lib/prisma";
import { Routes } from "@/lib/routes";
import { getAdminUser } from "@/lib/supabase/server";

export async function updateGoalStatus(
  goal: Goal,
  date: Date,
  status: GoalStatus
) {
  const adminUser = await getAdminUser();

  if (!adminUser) {
    return false;
  }

  const goalColumn = ({
    SLEEP_HOURS: "sleepHours",
    SPORT: "sport",
    MORNING_STREAM: "morningStream",
    HEALTHY_LUNCH: "healthyLunch",
    AFTERNOON_STREAM: "afternoonStream",
    HEALTHY_DINNER: "healthyDinner",
  } as const)[goal] satisfies keyof Days;

  await prisma.days.update({
    data: { [goalColumn]: status },
    where: { date }
  })

  revalidatePath(Routes.GOALS);
  revalidatePath(Routes.GOALS_EDITABLE);

  return true;
}