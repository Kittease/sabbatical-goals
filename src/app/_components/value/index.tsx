import { type GoalStatus } from "@prisma/client";
import { Check, X } from "lucide-react";

import { cn } from "@/lib/tailwind";

interface ValueProps {
  value: GoalStatus | "N/A";
  className?: string;
}

const Value = ({ value, className }: ValueProps) => {
  return (
    <span
      className={cn(
        "size-6 flex items-center justify-center rounded-sm transition-all duration-300",
        {
          "N/A": "bg-gray-600/50",
          WAITING: "bg-gray-200 text-gray-400",
          COMPLETED: "bg-green-500",
          FAILED: "bg-red-500",
        }[value],
        className
      )}
    >
      {
        {
          "N/A": null,
          WAITING: <span className="text-sm font-medium">?</span>,
          COMPLETED: <Check className="size-4 text-gray-50" />,
          FAILED: <X className="size-4 text-gray-50" />,
        }[value]
      }
    </span>
  );
};

export default Value;
