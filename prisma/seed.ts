import { TZDate } from '@date-fns/tz'
import { PrismaClient } from '@prisma/client'
import { eachDayOfInterval, isWeekend } from 'date-fns'

const prisma = new PrismaClient()

async function main() {
  const startDate = new TZDate("2025-02-03", "UTC")
  const endDate = new TZDate("2025-05-02", "UTC")

  const days = eachDayOfInterval({ start: startDate, end: endDate })
    .filter((date) => !isWeekend(date))

  await prisma.days.createMany({
    data: days.map((date) => ({
      date,
    })),
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })