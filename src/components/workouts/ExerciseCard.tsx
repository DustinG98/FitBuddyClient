import { Button, Card, Chip, Text } from "react-native-paper";
import { AiExercise } from "../../models/workouts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCustomTheme } from "../../theme/hooks";
import { StyleSheet, View } from "react-native";

export const ExerciseCard = ({exercise}: {exercise: AiExercise}) => {
    const theme = useCustomTheme();
    return (
        <Card style={{ marginVertical: 10, backgroundColor: theme.colors.cardBackground }}>
            <Card.Title subtitleVariant="labelMedium" titleVariant="titleLarge" titleStyle={{fontWeight: 'bold'}} title={exercise.name} subtitle={exercise.category} />
            <Card.Content style={styles.cardContent}>
                <Text variant="labelMedium">{exercise.sets} x {exercise.reps}</Text>
                <Text variant="labelMedium">Equipment: {exercise.equipment}</Text>
            </Card.Content>
            <Card.Content style={styles.cardContent}>
                <Text variant="bodyMedium">{exercise.description}</Text>
                <Text variant="bodyMedium">
                    <Text style={{fontWeight: "bold"}} variant="bodyMedium">Tips:</Text> 
                    {` ${exercise.tips}`}
                </Text>
            </Card.Content>
            <Card.Content style={styles.muscleContent}>
                <Text style={{fontWeight: "bold"}} variant="headlineSmall">Target Muscles</Text>
                <View style={styles.targetMuscleContainer}>
                {
                    exercise.targetMuscles?.map((muscle, i) => {
                        return (
                            <Chip style={{ margin: 2, backgroundColor: muscle.activation === 'high' ? theme.colors.primary : muscle.activation === 'medium' ? theme.colors.lightPrimary : theme.colors.lightestPrimary }}>
                                <Text style={{color: theme.colors.darkText, fontWeight: 'bold'}}>{muscle.muscleName} </Text>
                                {
                                    muscle.activation === 'high' ? <>
                                        
                                        <MaterialCommunityIcons name="chevron-triple-up" size={16} color="black" />
                                    </> : muscle.activation === 'medium' ? <>
                                        <MaterialCommunityIcons name="chevron-double-up" size={16} color="black" />
                                    </> : muscle.activation === 'low' ? <>
                                        <MaterialCommunityIcons name="chevron-up" size={16} color="black" />
                                    </> : null
                                }
                            </Chip>
                        )
                    })
                }
                </View>
            </Card.Content>
            <Card.Actions>
                <Button mode="text">
                    <Text style={{color: theme.colors.lightGray}}>Replace Workout?</Text>
                </Button>
            </Card.Actions>
        </Card>
    )
} 

const styles = StyleSheet.create({
    muscleContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        marginVertical: 10,
    },
    targetMuscleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        alignItems: 'center',
    }
})