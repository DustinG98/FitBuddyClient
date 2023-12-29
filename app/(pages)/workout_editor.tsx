import { useAppSelector } from '../../src/redux/hooks';
import { AiEditorPresave } from '../../src/components/workouts/workout_editor/AiEditorPresave';

export default function WorkoutEditorPage () {
    const { createdWorkoutPlan } = useAppSelector(state => state.workoutsState)
  return (
    createdWorkoutPlan ? <AiEditorPresave workoutPlan={createdWorkoutPlan} /> : null
  );
}
