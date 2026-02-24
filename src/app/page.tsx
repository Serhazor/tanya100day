"use client";

import { useState, useEffect } from "react";
import { differenceInDays, startOfDay, addDays } from "date-fns";
import workoutDataJson from "@/data/workouts.json";
import type { WorkoutData } from "@/types";
import ChallengeProgress from "@/components/ChallengeProgress";
import DaySelector from "@/components/DaySelector";
import ExerciseItem from "@/components/ExerciseItem";
import { PlayCircle } from "lucide-react";

const START_DATE = new Date(2026, 1, 23); // Months are 0-indexed in JS. Feb is 1. Feb 23, 2026.
const data = workoutDataJson as WorkoutData;
const TOTAL_DAYS = data.workouts.length;

export default function Home() {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const today = startOfDay(new Date());
    const start = startOfDay(START_DATE);
    const passed = Math.max(0, differenceInDays(today, start));

    // Default to the current day, or cap at max days
    setCurrentDayIndex(Math.min(passed, TOTAL_DAYS - 1));
  }, []);

  const handlePrev = () => setCurrentDayIndex(prev => Math.max(0, prev - 1));
  const handleNext = () => setCurrentDayIndex(prev => Math.min(TOTAL_DAYS - 1, prev + 1));

  const handleSelectDate = (dateStr: string) => {
    if (!dateStr) return;
    const selectedDate = startOfDay(new Date(dateStr));
    const start = startOfDay(START_DATE);
    const diff = differenceInDays(selectedDate, start);

    if (diff >= 0 && diff < TOTAL_DAYS) {
      setCurrentDayIndex(diff);
    }
  };

  if (!isMounted) return null; // Avoid hydration mismatch

  const dayData = data.workouts[currentDayIndex];
  const currentDate = addDays(START_DATE, currentDayIndex);
  const isRestDay = dayData.exercises.length === 0;

  return (
    <main className="container min-h-screen py-8 pb-20">
      <header className="mb-8 text-center pt-4">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2">
          100 Дней Любви к Себе
        </h1>
        <p className="text-muted-foreground">Твой путь к совершенству тела и духа</p>
      </header>

      <ChallengeProgress startDate={START_DATE} totalDays={TOTAL_DAYS} />

      <DaySelector
        currentDay={currentDayIndex}
        totalDays={TOTAL_DAYS}
        currentDate={currentDate}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelectDate={handleSelectDate}
      />

      <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {isRestDay ? (
          <div className="bg-card border rounded-2xl p-8 text-center shadow-sm">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🧘‍♀️</span>
            </div>
            <h3 className="text-xl font-bold mb-2">День Отдыха</h3>
            <p className="text-muted-foreground">Сегодня даем телу восстановиться. Проведи время с пользой для души!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header / Rounds / Videos */}
            <div className="bg-secondary/30 rounded-2xl p-5 border border-secondary">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {dayData.rounds && (
                  <div className="bg-background px-4 py-2 rounded-lg border font-medium text-foreground">
                    Кругов: <span className="text-primary font-bold">{dayData.rounds}</span>
                  </div>
                )}
                <div className="flex gap-3">
                  {dayData.warmup_url && (
                    <a
                      href={dayData.warmup_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#FF0000]/10 text-[#FF0000] px-4 py-2 rounded-lg font-medium hover:bg-[#FF0000]/20 transition-colors"
                    >
                      <PlayCircle size={18} />
                      <span className="text-sm">Разминка</span>
                    </a>
                  )}
                  {dayData.cooldown_url && (
                    <a
                      href={dayData.cooldown_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#FF0000]/10 text-[#FF0000] px-4 py-2 rounded-lg font-medium hover:bg-[#FF0000]/20 transition-colors"
                    >
                      <PlayCircle size={18} />
                      <span className="text-sm">Заминка</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Exercises List */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span>Упражнения на сегодня</span>
              </h3>
              <div className="space-y-3">
                {dayData.exercises.map((exercise, idx) => (
                  <ExerciseItem
                    key={idx}
                    exercise={exercise}
                    explanation={data.explanations[exercise.name]}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
