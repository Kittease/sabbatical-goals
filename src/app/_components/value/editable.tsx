"use client";

import { type GoalStatus } from "@prisma/client";
import { ButtonHTMLAttributes, useState, useTransition } from "react";

import { cn } from "@/lib/tailwind";
import { type Goal } from "@/app/types";

import { updateGoalStatus } from "./actions";
import Value from ".";

interface ValueEditableProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  goal: Goal;
  date: Date;
  initialValue: GoalStatus;
}

const ValueEditable = ({
  goal,
  date,
  initialValue,
  ...restProps
}: ValueEditableProps) => {
  const [, startTransition] = useTransition();
  const [value, setValue] = useState<GoalStatus>(initialValue);

  const handleClick = () => {
    let newValue: GoalStatus;

    switch (value) {
      case "WAITING":
        newValue = "COMPLETED";
        break;

      case "COMPLETED":
        newValue = "FAILED";
        break;

      case "FAILED":
        newValue = "WAITING";
        break;
    }

    setValue(newValue);

    startTransition(async () => {
      const success = await updateGoalStatus(goal, date, newValue);
      if (!success) {
        setValue(value);
      }
    });
  };

  return (
    <button
      {...restProps}
      onClick={handleClick}
      className={cn("size-6 cursor-pointer", restProps.className)}
    >
      <Value
        value={restProps.disabled ? "N/A" : value}
        className={
          {
            WAITING: restProps.disabled
              ? "cursor-default"
              : "hover:bg-gray-400 hover:text-gray-200",
            COMPLETED: "hover:bg-green-600",
            FAILED: "hover:bg-red-600",
          }[value]
        }
      />
    </button>
  );
};

export default ValueEditable;
