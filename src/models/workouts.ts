export interface TargetReps {
    min: number;
    max: number;
}

export interface WorkoutPlanWorkout {
    workoutId: string;
    name: string;
    thumbnail: string;
    targetSets: number;
    targetReps: TargetReps;
    completed: boolean;
}
