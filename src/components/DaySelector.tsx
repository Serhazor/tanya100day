"use client";

import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface Props {
    currentDay: number;
    totalDays: number;
    currentDate: Date;
    onPrev: () => void;
    onNext: () => void;
    onSelectDate: (dateStr: string) => void;
}

export default function DaySelector({ currentDay, totalDays, currentDate, onPrev, onNext, onSelectDate }: Props) {
    return (
        <div className="flex items-center justify-between mb-6 bg-card border rounded-2xl p-2 shadow-sm">
            <button
                onClick={onPrev}
                disabled={currentDay === 0}
                className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-secondary disabled:opacity-30 disabled:hover:bg-transparent transition-colors shadow-sm bg-background border"
                aria-label="Предыдущий день"
            >
                <ChevronLeft size={24} className="text-foreground" />
            </button>

            <div className="flex flex-col items-center relative group">
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1 flex items-center gap-1">
                    <CalendarDays size={12} />
                    <span>День {currentDay + 1}</span>
                </span>

                <div className="relative">
                    <div className="text-xl font-bold text-foreground text-center cursor-pointer hover:text-primary transition-colors pr-2">
                        {format(currentDate, "d MMMM yyyy", { locale: ru })}
                    </div>
                    <input
                        type="date"
                        value={format(currentDate, "yyyy-MM-dd")}
                        onChange={(e) => onSelectDate(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
            </div>

            <button
                onClick={onNext}
                disabled={currentDay === totalDays - 1}
                className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-secondary disabled:opacity-30 disabled:hover:bg-transparent transition-colors shadow-sm bg-background border"
                aria-label="Следующий день"
            >
                <ChevronRight size={24} className="text-foreground" />
            </button>
        </div>
    );
}
