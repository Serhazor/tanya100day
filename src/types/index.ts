export interface Exercise {
    name: string;
    reps: number | null;
}

export interface WorkoutDay {
    day_label: string;
    warmup_url: string | null;
    rounds: number | null;
    cooldown_url: string | null;
    exercises: Exercise[];
}

export interface Explanation {
    difficulty: number | null;
    description: string | null;
}

export interface WorkoutData {
    workouts: WorkoutDay[];
    explanations: Record<string, Explanation>;
}
