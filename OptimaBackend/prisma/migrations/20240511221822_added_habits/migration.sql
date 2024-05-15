-- CreateTable
CREATE TABLE "Habit" (
    "habitId" SERIAL NOT NULL,
    "habitName" TEXT NOT NULL,
    "description" TEXT,
    "unit" TEXT,
    "remindMe" BOOLEAN NOT NULL,
    "remindTime" TIMESTAMP(3),

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("habitId")
);

-- CreateTable
CREATE TABLE "HabitEntry" (
    "entryId" SERIAL NOT NULL,
    "quantity" DOUBLE PRECISION,
    "habitHabitId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HabitEntry_pkey" PRIMARY KEY ("entryId")
);

-- AddForeignKey
ALTER TABLE "HabitEntry" ADD CONSTRAINT "HabitEntry_habitHabitId_fkey" FOREIGN KEY ("habitHabitId") REFERENCES "Habit"("habitId") ON DELETE RESTRICT ON UPDATE CASCADE;
