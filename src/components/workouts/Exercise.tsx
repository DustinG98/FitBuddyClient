import { Dimensions, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import { AiExercise } from "../../models/workouts"

export function Exercise({exercise}: {exercise: AiExercise}) {
    return (
        <View style={styles.container}>
            <Text style={styles.nameText}>{exercise.name}</Text>
            <View style={styles.infoContainer}>
                
                <View style={styles.infoPill}>
                    <Text style={styles.categoryText}>{exercise.category}</Text>
                </View>
                <View style={styles.infoPill}>
                    <Text style={styles.categoryText}>{exercise.reps} x {exercise.sets}</Text>
                </View>
                <View style={styles.infoPill}>
                    <Text style={styles.categoryText}>{exercise.equipment}</Text>
                </View>
            </View>
            <Text style={styles.descriptionText}>{exercise.description}</Text>
            <Text style={styles.descriptionText}>Equipment: {exercise.equipment}</Text>
            <Text style={styles.tipsText}>Tip: {exercise.tips}</Text>
            <TouchableOpacity style={styles.replaceButton}>
                <Text style={styles.replaceText}>Replace workout?</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 10,
        borderRadius: 16,
        marginVertical: 10,
        backgroundColor: '#212529',
    },
    nameText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    descriptionText: {
        color: '#fff',
        fontSize: 12,
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * 0.8,
        alignItems: 'center',
    },
    infoPill: {
        backgroundColor: '#FFDD00',
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    categoryText: {
        color: '#000000',
        fontSize: 12,
        fontWeight: 'bold',
    },
    // gray tips text
    tipsText: {
        color: 'gray',
        fontSize: 10,
    },
    replaceButton: {
        backgroundColor: '#FFDD00',
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    replaceText: {
        color: '#101214',
        fontSize: 10,
    }
})