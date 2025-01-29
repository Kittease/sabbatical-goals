import { type Days } from "@prisma/client";
import { addDays, format, isAfter } from "date-fns";
import { fr } from "date-fns/locale";
import { Fragment } from "react";

import Value from "@/app/_components/value";
import prisma from "@/lib/prisma";
import { Pen } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const GoalsPage = async () => {
  const days = await prisma.days.findMany({
    orderBy: {
      date: "asc",
    },
  });
  const weeks = days.reduce<Array<Days[]>>((acc, day, index) => {
    const weekIndex = Math.floor(index / 5);
    acc[weekIndex] = acc[weekIndex] || [];
    acc[weekIndex].push(day);
    return acc;
  }, []);

  const today = new Date();

  return (
    <div className="grid grid-rows-9 grid-flow-col auto-cols-max">
      <div className="grid grid-rows-subgrid row-span-9 font-bold">
        <Link href="/edit" className="row-span-3 self-center place-self-center">
          <Pen />
        </Link>

        <p>7h30 de sommeil</p>
        <p>Sport</p>
        <p>Stream du matin</p>
        <p>Déjeuner sain</p>
        <p>Stream de l&apos;après-midi</p>
        <p>Dîner sain</p>
      </div>

      {weeks.map((days, weekIndex) => {
        const weekStart = format(days[0].date, "dd/LL");
        const weekEnd = format(addDays(days[0].date, 6), "dd/LL");

        return (
          <Fragment key={`${weekStart}-${weekEnd}`}>
            <div className="w-6 row-span-9" />

            <h2 className="grid grid-rows-subgrid col-span-5 row-span-2 font-bold">
              <span className="text-xl">Semaine {weekIndex + 1}</span>
              <span>
                ({weekStart} - {weekEnd})
              </span>
            </h2>

            {days.map((day) => {
              const dayName = format(day.date, "EEEE", { locale: fr });
              const formattedDayName =
                dayName.charAt(0).toUpperCase() + dayName.slice(1, 3);

              const isFuture = isAfter(day.date, today);

              return (
                <div
                  key={day.date.toISOString()}
                  className="grid grid-rows-subgrid place-items-center row-span-7"
                >
                  <p className="text-xs font-bold">{formattedDayName}</p>

                  <div className="flex items-center justify-center size-8">
                    <Value value={isFuture ? "N/A" : day.sleepHours} />
                  </div>

                  <div className="flex items-center justify-center size-8">
                    <Value value={isFuture ? "N/A" : day.sport} />
                  </div>

                  <div className="flex items-center justify-center size-8">
                    <Value value={isFuture ? "N/A" : day.morningStream} />
                  </div>

                  <div className="flex items-center justify-center size-8">
                    <Value value={isFuture ? "N/A" : day.healthyLunch} />
                  </div>

                  <div className="flex items-center justify-center size-8">
                    <Value value={isFuture ? "N/A" : day.afternoonStream} />
                  </div>

                  <div className="flex items-center justify-center size-8">
                    <Value value={isFuture ? "N/A" : day.healthyDinner} />
                  </div>
                </div>
              );
            })}
          </Fragment>
        );
      })}
    </div>
  );
};

export default GoalsPage;
