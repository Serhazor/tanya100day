import { differenceInDays, startOfDay } from "date-fns";

interface Props {
    startDate: Date;
    totalDays: number;
}

export default function ChallengeProgress({ startDate, totalDays }: Props) {
    const today = startOfDay(new Date());
    const start = startOfDay(startDate);

    // Calculate days passed since start. Can't be negative.
    const daysPassed = Math.max(0, differenceInDays(today, start));
    const daysLeft = Math.max(0, totalDays - daysPassed);

    const progressPercent = Math.min(100, (daysPassed / totalDays) * 100);

    return (
        <div className="bg-card text-card-foreground rounded-2xl p-6 shadow-sm border mb-6 relative overflow-hidden">
            {/* Soft gradient background effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center sm:items-start mb-4 gap-4 sm:gap-0">
                <div className="text-center sm:text-left">
                    <h2 className="text-lg font-medium text-muted-foreground mb-1">День Челленджа</h2>
                    <p className="text-4xl font-bold text-primary">{Math.min(daysPassed + 1, totalDays)} <span className="text-xl font-normal text-muted-foreground">/ {totalDays}</span></p>
                </div>

                <div className="text-center sm:text-right">
                    <h2 className="text-lg font-medium text-muted-foreground mb-1">Осталось Дней</h2>
                    <p className="text-4xl font-bold text-accent-foreground">{daysLeft}</p>
                </div>
            </div>

            <div className="relative z-10 w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>
        </div>
    );
}
