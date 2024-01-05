import { useState } from "react";
import { AiWorkoutOutput, AiWorkoutPlan, StoredWorkoutPlan } from "../../../models/workouts";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { ExerciseCard } from "../ExerciseCard";
import { Snackbar } from "react-native-paper";

export function AiEditorPresave({ workoutPlan }: { workoutPlan: StoredWorkoutPlan }) {
    const [ activeDay, setActiveDay ] = useState(1)
    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Text style={styles.workoutPlanNameText}>{workoutPlan.planName}</Text>
                    <Text style={styles.workoutPlanDescriptionText}>{workoutPlan.description}</Text>
                    {/* TODO: turn the day text into a button that slides down to show the exercises  */}
                    {
                        workoutPlan.fitnessPlan.days.map((day, i) => {
                            return (
                                <View key={i}>
                                    <TouchableHighlight style={activeDay === (i+1) ? styles.activeDaySelector : styles.inactiveDaySelector} onPress={() => setActiveDay(i + 1)}>
                                            <View style={styles.workoutPlanNameContainer}>
                                                <Image style={styles.image} source={{uri: `${process.env.EXPO_PUBLIC_PLANS_BUCKET}/${day.imageUrl}`}} />
                                                <Text style={ styles.inactiveDayNameText}>{day.dayName}</Text>
                                            </View>
                                    </TouchableHighlight>
                                    {
                                        activeDay === (i + 1) ?
                                        <View>
                                        {
                                            day.exercises?.map((exercise, j) => <ExerciseCard exercise={exercise} key={j} />)
                                        }
                                        </View> : null
                                    }

                                </View>
                            )
                        })
                    }
                </View>
                <Text>{workoutPlan.cautionMessage}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    workoutPlanNameContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: 150,
        maxHeight: 150,
        borderRadius: 16,
        paddingVertical: 24,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 100,
        maxWidth: 100,
        height: 100,
    },
    dayContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#fff',
        paddingVertical: 24,
    },
    activeDaySelector: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 16,
        marginVertical: 10,
    },
    inactiveDaySelector: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 16,
        marginVertical: 10,
        height: 200,
    },
    inactiveDayNameText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 10,
    },
    activeDayNameText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 10,
    },
    hidden: {
        display: 'none',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 10,
        backgroundColor: '#101214',
    },

    workoutPlanNameText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    workoutPlanDescriptionText: {
        color: '#fff',
        fontSize: 12,
    },
})