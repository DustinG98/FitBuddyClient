import { View, Text, Image } from "react-native"
import { WorkoutPlanWorkout } from "../../models/workouts"

export default function WorkoutPlanCard ({ workout }: { workout: WorkoutPlanWorkout }) {
    return (
        <View>
            <Image source={{ uri: workout.thumbnail }} />
            <View>
                <Text>{workout.name}</Text>
                <Text>{workout.targetSets} sets x {workout.targetReps.min}-{workout.targetReps.max} reps</Text>
            </View>
        </View>
    )
}