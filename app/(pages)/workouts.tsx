import { useAppDispatch, useAppSelector } from '../../src/redux/hooks';
import { AiEditorPresave } from '../../src/components/workouts/workout_editor/AiEditorPresave';
import { useEffect } from 'react';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { FetchUsersWorkoutPlans, FetchWorkoutPlan } from '../../src/redux/actions/workouts';
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { WorkoutPlanPreview } from '../../src/components/workouts/WorkoutPlanPreview';
import { useCustomTheme } from '../../src/theme/hooks';

const EmptyState = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height * 0.8,
      }}
    >
      <Text style={{ color: '#fff' }}>It's quiet here...</Text>
    </View>
  )
}


export default function Workouts () {
    const theme = useCustomTheme();
    const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();
    const { usersWorkoutPlans, usersWorkoutPlansLoading } = useAppSelector(state => state.workoutsState)

    useEffect(() => {
      if(!usersWorkoutPlans && !usersWorkoutPlansLoading) {
        dispatch(FetchUsersWorkoutPlans())
      }
    }, [usersWorkoutPlans])

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold', margin: 20}}>My Workout Plans</Text>
      { usersWorkoutPlansLoading && !usersWorkoutPlans ? <ActivityIndicator size="large" color="#FFDD00" /> : usersWorkoutPlans ?
      <>
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          numColumns={1}
          decelerationRate={"fast"}
          data={usersWorkoutPlans}
          keyExtractor={(item) => item?.workoutPlanId}
          renderItem={({item}) => {
              return (
                <WorkoutPlanPreview preview={item}/>
              )
          }}
          refreshControl={<RefreshControl tintColor='#FFDD00'  refreshing={usersWorkoutPlansLoading} onRefresh={() => dispatch(FetchUsersWorkoutPlans())}/>}
          ListEmptyComponent={<EmptyState/>}
        />
      </> : null
      }
    </View>

  );
}