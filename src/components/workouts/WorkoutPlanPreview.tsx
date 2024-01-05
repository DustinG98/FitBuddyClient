// {
//     "workoutPlanId": "fd4d1d19-cf31-4636-a31c-1596640f136d",
//     "sortKey": "PLAN#fd4d1d19-cf31-4636-a31c-1596640f136d",
//     "planName": "Lean Muscle Gain",
//     "createdAt": 1704320478895,
//     "cautionMessage": "Ensure proper form and technique to prevent injury.",
//     "message": "Let's build lean muscle and strength!",
//     "description": "This personalized fitness plan is designed to help you gain lean muscle and strength, tailored to your professional fitness level and full gym access."
// }

import { Dimensions, StyleSheet } from "react-native"
import { StoredWorkoutPlanOverview } from "../../models/workouts"
import { router } from "expo-router";
import { Button, Card, Icon, Text } from "react-native-paper";
import { useCustomTheme } from "../../theme/hooks";

export function WorkoutPlanPreview({preview}: {preview: StoredWorkoutPlanOverview}) {
    const theme = useCustomTheme();
    function navigateToWorkoutPlan() {
        router.push(`/workout/${preview.workoutPlanId}`)
    }
    function edit() {
        console.log('edit')
    }
    function deletePlan() {
        console.log('delete')
    }
    return (
        <Card onPress={() => navigateToWorkoutPlan()} style={{
            ...styles.container,
            backgroundColor: theme.colors.cardBackground,
        }}>
            <Card.Content>
                <Text style={{fontWeight: 'bold'}} variant="headlineSmall">{preview.planName}</Text>
                <Text variant="labelMedium">{preview.description}</Text>
            </Card.Content>
            <Card.Actions>
                <Button mode="text" onPress={() => edit()}>
                    <Icon
                        source="pencil"
                        color={theme.colors.lightGray}
                        size={24}
                    />
                </Button>
                <Button mode="text" onPress={() => deletePlan()}>
                    <Icon
                        source="delete"
                        color={theme.colors.error}
                        size={24}
                    />
                </Button>
            </Card.Actions>
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 10,
        width: Dimensions.get('window').width * 0.9,
    }
})