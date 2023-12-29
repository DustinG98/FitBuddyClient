// {
//     "num_of_workouts_per_day": 4,
//     "current_weight": "105 lbs",
//     "height": "5'6\"",
//     "fitness_level": 5,
//     "num_of_days": 5,
//     "time_to_workout_daily": "3 hours",
//     "fitness_goals": "Gain Lean Muscle",
//     "workout_types_enjoyed": [
//         "Weight Training",
//         "Bodyweight Exercises"
//     ],
//     "workout_types_not_enjoyed": [
//         "Yoga",
//         "Cardio"
//     ],
//     "equipment_access": [
//         "full gym access"
//     ]
// }

export enum FitnessLevel {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Advanced =  'Advanced',
    Expert = 'Expert',
    Professional =  'Professional',
}

export enum FitnessGoals {
    LoseWeight = 'Lose Weight',
    GainLeanMuscle = 'Gain Lean Muscle',
    GainMuscleMass = 'Gain Muscle Mass',
    MaintainWeight = 'Maintain Weight',
}

export enum WorkoutTypes {
    WeightTraining = 'Weight Training',
    BodyweightExercises = 'Bodyweight Exercises',
    Yoga = 'Yoga',
    Cardio = 'Cardio',
}

export enum EquipmentAccess {
    FullGymAccess = 'Full Gym Access',
    LimitedGymAccess = 'Limited Gym Access',
    NoGymAccess = 'No Gym Access',
}

export interface CreateWorkoutPlanInput {
    num_of_workouts_per_day: number; // 1-5
    current_weight: string; // lbs or kg
    height: string; // 5'6"
    fitness_level: FitnessLevel; // 1-5
    num_of_days: number; // 1-7
    time_to_workout_daily: string; // 1-6 hours
    fitness_goals: FitnessGoals; // lose weight, gain lean muscle, gain muscle mass, maintain weight
    workout_types_enjoyed: WorkoutTypes[]; // weight training, bodyweight exercises, yoga, cardio
    workout_types_not_enjoyed: WorkoutTypes[]; // weight training, bodyweight exercises, yoga, cardio
    equipment_access: EquipmentAccess; // full gym access, limited gym access, no gym access
}

export interface AiWorkoutOutput {
    message: string;
    cautionMessage: string;
    fitnessPlan: AiWorkoutPlan;
}

export interface AiWorkoutPlan {
    planName: string;
    description: string;
    days: AiWorkoutDay[];
}

export interface AiExercise {
    name: string;
    category: string;
    description: string;
    tips?: string;
    equipment?: string;
    sets?: number;
    reps?: number;
    duration?: string;
}

export interface AiWorkoutDay {
    dayNumber: number;
    dayName: string;
    exercises?: AiExercise[];
}
