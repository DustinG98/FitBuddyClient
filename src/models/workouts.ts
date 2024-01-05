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

export enum TargetMuscles {
    Chest = 'Chest',
    Triceps = 'Triceps',
    Biceps = 'Biceps',
    Shoulders = 'Shoulders',
    UpperBack = 'Upper Back',
    LowerBack = 'Lower Back',
    Quadriceps = 'Quadriceps',
    Hamstrings = 'Hamstrings',
    Calves = 'Calves',
    Glutes = 'Glutes',
    Obliques = 'Obliques',
    Core = 'Core',
    Forearms = 'Forearms',
    Lats = 'Lats',
    Traps = 'Traps',
}

export interface TargetMuscle {
    muscleName: TargetMuscles;
    activation: "low" | "medium" | "high";
}

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
    targetMuscles? : TargetMuscle[];
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

interface WorkoutTableItem {
    workoutPlanId: string;
    sortKey: string;
}

export interface StoredWorkoutPlan extends WorkoutTableItem {
    createdAt: number;
    planName: string;
    description: string;
    message: string;
    cautionMessage: string;
    fitnessPlan: {
        days: StoredWorkoutDay[];
    }
}

export interface StoredWorkoutPlanOverview extends WorkoutTableItem {
    createdAt: number;
    planName: string;
    description: string;
    message: string;
    cautionMessage: string;
}

export interface StoredWorkoutDay extends WorkoutTableItem {
    dayName: string;
    exercises: StoredExercise[];
    imageUrl?: string;
}

export interface StoredExercise extends WorkoutTableItem {
    name: string;
    category: string;
    description: string;
    tips?: string;
    equipment?: string;
    targetMuscles?: TargetMuscle[];
    sets?: number;
    reps?: number;
    duration?: string;
}

// "workoutPlan": {
//     "workoutPlanId": "e18763d9-ff5d-4e99-ba39-cd897ed05611",
//     "sortKey": "PLAN#e18763d9-ff5d-4e99-ba39-cd897ed05611",
//     "planName": "Lean Muscle Gain Program",
//     "createdAt": 1704316090423,
//     "cautionMessage": "Please ensure to consult a fitness professional before starting any new fitness plan or making significant changes to your current one.",
//     "message": "Here is your personalized fitness plan!",
//     "description": "This program is designed to help you gain lean muscle mass using a combination of weight training and bodyweight exercises.",
//     "fitnessPlan": {
//         "days": [
//             {
//                 "dayName": "Day 1 - Upper Body",
//                 "exercises": [
//                     {
//                         "sets": 4,
//                         "workoutPlanId": "e18763d9-ff5d-4e99-ba39-cd897ed05611",
//                         "targetMuscles": [
//                             {
//                                 "activation": "high",
//                                 "muscleName": "Chest"
//                             },
//                             {
//                                 "activation": "medium",
//                                 "muscleName": "Triceps"
//                             }
//                         ],
//                         "reps": 8,
//                         "sortKey": "EXERCISE#5f588ea4-5c12-4d49-aed0-8a8466722c6f",
//                         "category": "Weight Training",
//                         "description": "Lay flat on a bench and lift the bar off the rack and move it over the chest. Lower it to the chest then press it back up.",
//                         "equipment": "Barbell, Bench",
//                         "name": "Barbell Bench Press",
//                         "tips": "Keep your feet flat on the floor and your back arched."
//                     },
//                     {
//                         "sets": 3,
//                         "workoutPlanId": "e18763d9-ff5d-4e99-ba39-cd897ed05611",
//                         "targetMuscles": [
//                             {
//                                 "activation": "high",
//                                 "muscleName": "Upper Back"
//                             },
//                             {
//                                 "activation": "medium",
//                                 "muscleName": "Biceps"
//                             }
//                         ],
//                         "reps": 10,
//                         "sortKey": "EXERCISE#b11cabbb-6043-4db5-a843-478fcc576571",
//                         "category": "Bodyweight Exercises",
//                         "description": "Hang from a bar and pull yourself up until your chin is over the bar.",
//                         "equipment": "Pull-Up Bar",
//                         "name": "Pull-Ups",
//                         "tips": "Keep your shoulders down and back throughout the movement."
//                     },
//                     {
//                         "sets": 3,
//                         "workoutPlanId": "e18763d9-ff5d-4e99-ba39-cd897ed05611",
//                         "targetMuscles": [
//                             {
//                                 "activation": "high",
//                                 "muscleName": "Shoulders"
//                             },
//                             {
//                                 "activation": "medium",
//                                 "muscleName": "Triceps"
//                             }
//                         ],
//                         "reps": 12,
//                         "sortKey": "EXERCISE#f2163323-3f7c-4860-8f2d-5142d27ea47a",
//                         "category": "Weight Training",
//                         "description": "Sit on a bench with back support and lift the dumbbells over your head.",
//                         "equipment": "Dumbbells, Bench",
//                         "name": "Dumbbell Shoulder Press",
//                         "tips": "Keep your core engaged and avoid arching your back."
//                     }
//                 ],
//                 "workoutPlanId": "e18763d9-ff5d-4e99-ba39-cd897ed05611",
//                 "imageUrl": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-wrJCcuPQLCYfLc1yu4ZJ3Frh/user-WATeSiANQkZk5Jg1qvkXAuDY/img-EHe0tHJVLbW1Mapvt69avU2S.png?st=2024-01-03T20%3A08%3A26Z&se=2024-01-03T22%3A08%3A26Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-01-03T15%3A14%3A36Z&ske=2024-01-04T15%3A14%3A36Z&sks=b&skv=2021-08-06&sig=hLv3XvA2oBu7KOG51IopPBD7pzglD3JJXxuRUCszlB8%3D",
//                 "sortKey": "DAY#1"
//             },
//             {
//                 "dayName": "Day 2 - Lower Body",
//                 "exercises": [
//                     {
//                         "sets": 4,
//                         "workoutPlanId": "e18763d9-ff5d-4e99-ba39-cd897ed05611",
//                         "targetMuscles": [
//                             {
//                                 "activation": "high",
//                                 "muscleName": "Quadriceps"
//                             },
//                             {
//                                 "activation": "medium",
//                                 "muscleName": "Glutes"
//                             }
//                         ],
//                         "reps": 8,
//                         "sortKey": "EXERCISE#cd1baab1-79c4-4581-a5ab-5fc2b76c4989",
//                         "category": "Weight Training",
//                         "description": "Stand with the barbell on your upper-back, and squat down until your hips are below your knees.",
//                         "equipment": "Barbell, Squat Rack",
//                         "name": "Barbell Squats",
//                         "tips": "Keep your chest up and your knees in line with your toes."
//                     },
//                     {
//                         "sets": 3,
//                         "workoutPlanId": "e18763d9-ff5d-4e99-ba39-cd897ed05611",
//                         "targetMuscles": [
//                             {
//                                 "activation": "high",
//                                 "muscleName": "Hamstrings"
//                             },
//                             {
//                                 "activation": "medium",
//                                 "muscleName": "Calves"
//                             }
//                         ],
//                         "reps": 12,
//                         "sortKey": "EXERCISE#c03b8086-2838-42b4-8db8-084e1e8def01",
//                         "category": "Bodyweight Exercises",
//                         "description": "Step forward and lower your body until your front thigh is parallel to the ground.",
//                         "equipment": "None",
//                         "name": "Lunges",
//                         "tips": "Keep your torso upright and step out far enough so that your knee stays directly above your ankle."
//                     },
//                     {
//                         "sets": 3,
//                         "workoutPlanId": "e18763d9-ff5d-4e99-ba39-cd897ed05611",
//                         "targetMuscles": [
//                             {
//                                 "activation": "high",
//                                 "muscleName": "Hamstrings"
//                             },
//                             {
//                                 "activation": "medium",
//                                 "muscleName": "Lower Back"
//                             }
//                         ],
//                         "reps": 10,
//                         "sortKey": "EXERCISE#00d8e788-3258-40f4-9ca3-7741e18351a2",
//                         "category": "Weight Training",
//                         "description": "Hold a bar with an overhand grip, and bend at your hips to lower your torso until it's almost parallel to the floor.",
//                         "equipment": "Barbell",
//                         "name": "Romanian Deadlifts",
//                         "tips": "Keep your back straight and push your hips back as you lower the bar."
//                     }
//                 ],
//                 "workoutPlanId": "e18763d9-ff5d-4e99-ba39-cd897ed05611",
//                 "imageUrl": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-wrJCcuPQLCYfLc1yu4ZJ3Frh/user-WATeSiANQkZk5Jg1qvkXAuDY/img-rNdi7z3dmgcZoC6GrO953rgD.png?st=2024-01-03T20%3A08%3A42Z&se=2024-01-03T22%3A08%3A42Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-01-03T08%3A27%3A17Z&ske=2024-01-04T08%3A27%3A17Z&sks=b&skv=2021-08-06&sig=dFjyaX5FaU6s1BhN82oopIlGRhGA6T6sGKf1mv5DhBU%3D",
//                 "sortKey": "DAY#2"
//             },
//             {
//                 "dayName": "Day 3 - Rest",
//                 "exercises": [],
//                 "workoutPlanId": "e18763d9-ff5d-4e99-ba39-cd897ed05611",
//                 "sortKey": "DAY#3"
//             },
//             {
//                 "dayName": "Day 4 - Upper Body",
//                 "exercises": [
//                     {
//                         "sets": 4,
//                         "workoutPlanId": "e18763d9-ff5d-4e99-ba39-cd897ed05611",
//                         "targetMuscles": [
//                             {
//                                 "activation": "high",
//                                 "muscleName": "Chest"
//                             },
//                             {
//                                 "activation": "medium",
//                                 "muscleName": "Shoulders"
//                             }
//                         ],
//                         "reps": 10,
//                         "sortKey": "EXERCISE#8e2bc105-9654-4c47-b73c-66d4aca16a6d",
//                         "category": "Weight Training",
//                         "description": "Lie on a bench and lift the dumbbells directly over the chest. Lower them to the sides in a wide arc.",
//                         "equipment": "Dumbbells, Bench",
//                         "name": "Dumbbell Chest Flyes",
//                         "tips": "Keep a slight bend in your elbows and focus on squeezing your chest muscles."
//                     },
//                     {
//                         "sets": 3,
//                         "workoutPlanId": "e18763d9-ff5d-4e99-ba39-cd897ed05611",
//                         "targetMuscles": [
//                             {
//                                 "activation": "high",
//                                 "muscleName": "Triceps"
//                             },
//                             {
//                                 "activation": "medium",
//                                 "muscleName": "Shoulders"
//                             }
//                         ],
//                         "reps": 12,
//                         "sortKey": "EXERCISE#bbbbd474-4b20-43b3-b004-7ed6fda381e1",
//                         "category": "Bodyweight Exercises",
//                         "description": "Hold onto parallel bars and lower your body until your shoulders are below your elbows.",
//                         "equipment": "Parallel Bars",
//                         "name": "Tricep Dips",
//                         "tips": "Keep your elbows close to your body and your shoulders down."
//                     },
//                     {
//                         "sets": 3,
//                         "workoutPlanId": "e18763d9-ff5d-4e99-ba39-cd897ed05611",
//                         "targetMuscles": [
//                             {
//                                 "activation": "high",
//                                 "muscleName": "Upper Back"
//                             },
//                             {
//                                 "activation": "medium",
//                                 "muscleName": "Biceps"
//                             }
//                         ],
//                         "reps": 8,
//                         "sortKey": "EXERCISE#db8281d3-8563-47dc-bf7f-8b4de37409cd",
//                         "category": "Weight Training",
//                         "description": "Bend at the hips and grip a barbell with an overhand grip. Pull the bar towards the lower chest.",
//                         "equipment": "Barbell",
//                         "name": "Barbell Rows",
//                         "tips": "Keep your back straight and lead with your elbows."
//                     }
//                 ],
//                 "workoutPlanId": "e18763d9-ff5d-4e99-ba39-cd897ed05611",
//                 "imageUrl": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-wrJCcuPQLCYfLc1yu4ZJ3Frh/user-WATeSiANQkZk5Jg1qvkXAuDY/img-FPsqroexPd6cqjYVM5NH5IXi.png?st=2024-01-03T20%3A09%3A13Z&se=2024-01-03T22%3A09%3A13Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-01-03T15%3A11%3A41Z&ske=2024-01-04T15%3A11%3A41Z&sks=b&skv=2021-08-06&sig=7/wC14umCkBh4g/E9NjiInxcNDjdeV0KjgGQTcs/0HM%3D",
//                 "sortKey": "DAY#4"
//             },
//             {
//                 "dayName": "Day 5 - Functional Training",
//                 "exercises": [
//                     {
//                         "sets": 3,
//                         "workoutPlanId": "e18763d9-ff5d-4e99-ba39-cd897ed05611",
//                         "targetMuscles": [
//                             {
//                                 "activation": "high",
//                                 "muscleName": "Core"
//                             }
//                         ],
//                         "reps": 60,
//                         "sortKey": "EXERCISE#ae0edcec-9f19-47bd-96cc-a37fe78c4362",
//                         "category": "Bodyweight Exercises",
//                         "description": "Hold a push-up position with your body forming a straight line from head to heels.",
//                         "equipment": "None",
//                         "name": "Plank",
//                         "tips": "Engage your core and keep your hips in line with your shoulders and ankles."
//                     },
//                     {
//                         "sets": 3,
//                         "workoutPlanId": "e18763d9-ff5d-4e99-ba39-cd897ed05611",
//                         "targetMuscles": [
//                             {
//                                 "activation": "high",
//                                 "muscleName": "Obliques"
//                             }
//                         ],
//                         "reps": 20,
//                         "sortKey": "EXERCISE#54c6f371-fdd5-4a78-bf15-36d61589af36",
//                         "category": "Bodyweight Exercises",
//                         "description": "Sit on the floor with your knees bent and lean back slightly. Twist your torso from side to side.",
//                         "equipment": "None",
//                         "name": "Russian Twists",
//                         "tips": "Keep your core engaged and maintain a straight back."
//                     },
//                     {
//                         "sets": 4,
//                         "workoutPlanId": "e18763d9-ff5d-4e99-ba39-cd897ed05611",
//                         "targetMuscles": [
//                             {
//                                 "activation": "high",
//                                 "muscleName": "Lower Back"
//                             },
//                             {
//                                 "activation": "medium",
//                                 "muscleName": "Glutes"
//                             }
//                         ],
//                         "reps": 8,
//                         "sortKey": "EXERCISE#5a71a509-f4c7-4a00-88e5-60b5808a7d94",
//                         "category": "Weight Training",
//                         "description": "Stand behind a loaded barbell. Bend at your hips and knees to grab the bar.",
//                         "equipment": "Barbell, Weight Plates",
//                         "name": "Barbell Deadlifts",
//                         "tips": "Keep your back straight and push your hips back as you lift the bar."
//                     }
//                 ],
//                 "workoutPlanId": "e18763d9-ff5d-4e99-ba39-cd897ed05611",
//                 "imageUrl": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-wrJCcuPQLCYfLc1yu4ZJ3Frh/user-WATeSiANQkZk5Jg1qvkXAuDY/img-twk4JgiojKr7qOAnnipwUhsT.png?st=2024-01-03T20%3A08%3A56Z&se=2024-01-03T22%3A08%3A56Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-01-02T21%3A17%3A32Z&ske=2024-01-03T21%3A17%3A32Z&sks=b&skv=2021-08-06&sig=guN7Vr9obQ%2Bb9Ose3xXAGcrW7SsIJTOJ35qXhQknYuY%3D",
//                 "sortKey": "DAY#5"
//             }
//         ]
//     }
// }