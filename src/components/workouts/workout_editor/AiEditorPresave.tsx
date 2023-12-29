import { useState } from "react";
import { AiWorkoutOutput, AiWorkoutPlan } from "../../../models/workouts";
import { ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Exercise } from "../Exercise";

export function AiEditorPresave({ workoutPlan }: { workoutPlan: AiWorkoutOutput }) {
    const [ activeDay, setActiveDay ] = useState(1)
    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Text style={styles.workoutPlanNameText}>{workoutPlan.fitnessPlan.planName}</Text>
                    <Text style={styles.workoutPlanDescriptionText}>{workoutPlan.fitnessPlan.description}</Text>
                    {/* TODO: turn the day text into a button that slides down to show the exercises  */}
                    {
                        workoutPlan.fitnessPlan.days.map((day, i) => {
                            return (
                                <View key={i}>
                                    <TouchableHighlight style={activeDay === (i+1) ? styles.activeDaySelector : styles.inactiveDaySelector} onPress={() => setActiveDay(i + 1)}>
                                        <Text style={activeDay === (i+1) ? styles.activeDayNameText : styles.inactiveDayNameText}>{day.dayName}</Text>
                                    </TouchableHighlight>
                                    {
                                        activeDay === (i + 1) ?
                                        <View>
                                        {
                                            day.exercises?.map((exercise, j) => <Exercise exercise={exercise} key={j} />)
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
    activeDaySelector: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#FFDD00',
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
        backgroundColor: '#212529',
        paddingVertical: 10,
        borderRadius: 16,
        marginVertical: 10,
    },
    inactiveDayNameText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    activeDayNameText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
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