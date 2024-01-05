import { useLocalSearchParams } from 'expo-router';
import Profile from '../../../src/components/profile/Profile';
import { useAppDispatch, useAppSelector } from '../../../src/redux/hooks';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { FetchWorkoutPlan } from '../../../src/redux/actions/workouts';
import { ActivityIndicator, Text } from 'react-native';
import { AiEditorPresave } from '../../../src/components/workouts/workout_editor/AiEditorPresave';

export default function WorkoutPlanPage () {
  const { id } = useLocalSearchParams();

  const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();
  const { fetchedWorkoutPlan, fetchLoading } = useAppSelector(state => state.workoutsState)



  if(id && typeof id === 'string' && fetchedWorkoutPlan?.workoutPlanId !== id && !fetchLoading) {
    dispatch(FetchWorkoutPlan(id))
  }

  return (
    <>
      {fetchLoading ? <ActivityIndicator size="large" color="#FFDD00" /> : fetchedWorkoutPlan ? <AiEditorPresave workoutPlan={fetchedWorkoutPlan} /> : null}
    </>
  );
}
