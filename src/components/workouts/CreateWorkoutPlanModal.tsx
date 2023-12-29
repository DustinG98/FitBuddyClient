import { useEffect, useState } from "react";
import { CreateWorkoutPlanInput, EquipmentAccess, FitnessGoals, WorkoutTypes, FitnessLevel } from "../../models/workouts";
import { ActivityIndicator, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { State } from "../../redux/types/state";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { CreateWorkoutPlan } from "../../redux/actions/workouts";
import { router, useNavigation } from "expo-router";

// inputs for creating a workout plan

// num_of_workouts_per_day: number; // 1-5
//     current_weight: string; // lbs or kg
//     height: string; // 5'6"
//     fitness_level: FitnessLevel; // 1-5
//     num_of_days: number; // 1-7
//     time_to_workout_daily: string; // 1-6 hours
//     fitness_goals: FitnessGoals; // lose weight, gain lean muscle, gain muscle mass, maintain weight
//     workout_types_enjoyed: WorkoutTypes[]; // weight training, bodyweight exercises, yoga, cardio
//     workout_types_not_enjoyed: WorkoutTypes[]; // weight training, bodyweight exercises, yoga, cardio
//     equipment_access: EquipmentAccess[]; // full gym access, limited gym access, no gym access
// }

export function CreateWorkoutPlanModal({ modalOpen, toggleModal }: { modalOpen: boolean, toggleModal: () => void}) {
    const { createdWorkoutPlan = undefined, creationLoading } = useAppSelector((state:State) => {
        return state.workoutsState
    })
    const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();


    const [numOfWorkoutsPerDay, setNumOfWorkoutsPerDay] = useState(1);
    const [currentWeight, setCurrentWeight] = useState('');
    const [height, setHeight] = useState('');
    const [fitnessLevel, setFitnessLevel] = useState(FitnessLevel.Beginner);
    const [numOfDays, setNumOfDays] = useState(1);
    const [timeToWorkoutDaily, setTimeToWorkoutDaily] = useState('');
    const [fitnessGoals, setFitnessGoals] = useState(FitnessGoals.LoseWeight);
    const [workoutTypesEnjoyed, setWorkoutTypesEnjoyed] = useState([WorkoutTypes.WeightTraining, WorkoutTypes.BodyweightExercises]);
    const [workoutTypesNotEnjoyed, setWorkoutTypesNotEnjoyed] = useState([WorkoutTypes.Yoga, WorkoutTypes.Cardio]);
    const [equipmentAccess, setEquipmentAccess] = useState(EquipmentAccess.FullGymAccess);


    function createWorkoutPlan() {
        const workoutPlanInput: CreateWorkoutPlanInput = {
            num_of_workouts_per_day: numOfWorkoutsPerDay,
            current_weight: currentWeight,
            height: height,
            fitness_level: fitnessLevel,
            num_of_days: numOfDays,
            time_to_workout_daily: timeToWorkoutDaily,
            fitness_goals: fitnessGoals,
            workout_types_enjoyed: workoutTypesEnjoyed,
            workout_types_not_enjoyed: workoutTypesNotEnjoyed,
            equipment_access: equipmentAccess
        }

        dispatch(CreateWorkoutPlan(workoutPlanInput))
    }

    function NumOfWorkoutsPerDay(max: number) {
        return (
            // create number bubble buttons
            // 1-max
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>How many workouts per day?</Text>
                <View style={styles.actionContainer}>
                {
                    Array(max).fill(0).map((_, i) => {
                        return (
                            <TouchableHighlight style={numOfWorkoutsPerDay === i+1 ? styles.activeBubbleButton : styles.inactiveBubbleButton} key={`num_workouts_${i}`} onPress={() => setNumOfWorkoutsPerDay(i+1)}>
                                <Text style={numOfWorkoutsPerDay === i+1 ? styles.activeButtonText : styles.inactiveButtonText}>{i+1}</Text>
                            </TouchableHighlight>
                        )
                    })
                }
                </View>
            </View>
        )
    }

    function NumDaysToWorkout(max: number) {
        return (
            // create number bubble buttons
            // 1-max
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>How many days do you want to workout?</Text>
                <View style={styles.actionContainer}>
                {
                    Array(max).fill(0).map((_, i) => {
                        return (
                            <TouchableHighlight style={numOfDays === i+1 ? styles.activeBubbleButton : styles.inactiveBubbleButton} key={`day_selector_${i}`} onPress={() => setNumOfDays(i+1)}>
                                <Text style={numOfDays === i+1 ? styles.activeButtonText : styles.inactiveButtonText}>{i+1}</Text>
                            </TouchableHighlight>
                        )
                    })
                }
                </View>
            </View>
        )
    }

    function FitnessLevelButtons () {
        // create bubble buttons with enum names, set fitness level to enum value
        return (
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>What is your fitness level?</Text>
                <View style={styles.actionContainer}>
                {
                    Object.values(FitnessLevel).map((key, i) => {
                        const enumKey = FitnessLevel[key as keyof typeof FitnessLevel];
                        return (
                            <TouchableHighlight style={fitnessLevel === enumKey ? styles.activeBubbleButton : styles.inactiveBubbleButton} key={`fitness_level_selector_${i}`} onPress={() => setFitnessLevel(enumKey)}>
                                <Text style={fitnessLevel === enumKey ? styles.activeButtonText : styles.inactiveButtonText}>{enumKey}</Text>
                            </TouchableHighlight>
                        )
                    })
                }
                </View>
            </View>
        )
    }

    function FitnessGoalsButtons () {
        // create bubble buttons with enum names, set fitness level to enum value
        return (
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>What are your fitness goals?</Text>
                <View style={styles.actionContainer}>
                {
                    Object.keys(FitnessGoals).map((key, i) => {
                        const enumKey = FitnessGoals[key as keyof typeof FitnessGoals];
                        return (
                            <TouchableHighlight style={fitnessGoals === enumKey ? styles.activeBubbleButton : styles.inactiveBubbleButton} key={enumKey} onPress={() => setFitnessGoals(enumKey)}>
                                <Text style={fitnessGoals === enumKey ? styles.activeButtonText : styles.inactiveButtonText}>{enumKey}</Text>
                            </TouchableHighlight>
                        )
                    })
                }
                </View>
            </View>
        )
    
    }

    function WorkoutTypesButtons () {
        // create bubble buttons with enum names, set fitness level to enum value
        return (
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>What workout types do you enjoy?</Text>
                <View style={styles.actionContainer}>
                {
                    Object.keys(WorkoutTypes).map((key, i) => {
                        const enumKey = WorkoutTypes[key as keyof typeof WorkoutTypes];
                        return (
                            <TouchableHighlight style={workoutTypesEnjoyed.includes(enumKey) ? styles.activeBubbleButton : styles.inactiveBubbleButton} key={enumKey} onPress={() => {
                                if(workoutTypesEnjoyed.includes(enumKey)) {
                                    setWorkoutTypesEnjoyed(workoutTypesEnjoyed.filter(type => type !== enumKey))
                    
                                } else {
                                    setWorkoutTypesEnjoyed([...workoutTypesEnjoyed, enumKey])
                                }
                            }}>
                                <Text style={workoutTypesEnjoyed.includes(enumKey) ? styles.activeButtonText : styles.inactiveButtonText}>{enumKey}</Text>
                            </TouchableHighlight>
                        )
                    })
                }
                </View>
            </View>
        )
    }

    function EquipmentAccessButtons () {
        // create bubble buttons with enum names, set fitness level to enum value
        return (
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>What equipment access do you have?</Text>
                <View style={styles.actionContainer}>
                {
                    Object.keys(EquipmentAccess).map((key, i) => {
                        const enumKey = EquipmentAccess[key as keyof typeof EquipmentAccess];

                        return (
                            <TouchableHighlight style={equipmentAccess === enumKey ? styles.activeBubbleButton : styles.inactiveBubbleButton} onPress={() => setEquipmentAccess(enumKey)}>
                                <Text style={equipmentAccess === enumKey ? styles.activeButtonText : styles.inactiveButtonText}>{enumKey}</Text>
                            </TouchableHighlight>
                        )
                    })
                }
                </View>
            </View>
        )
    }

    function GoToEditor () {
        router.replace('/workout_editor')
        return null
    }

    useEffect(() => {
                                
        // set workout types not enjoyed to all workout types minus workout types enjoyed
        const workoutTypes = Object.values(WorkoutTypes);
        const workoutTypesNotEnjoyed = workoutTypes.filter(type => !workoutTypesEnjoyed.includes(type))
        setWorkoutTypesNotEnjoyed(workoutTypesNotEnjoyed)
    }, [workoutTypesEnjoyed])

    useEffect(() => {
        if(createdWorkoutPlan) {
            toggleModal();
        }
    }, [createdWorkoutPlan]);

    useEffect(() => { 
        if(modalOpen) {
            setNumOfWorkoutsPerDay(1);
            setCurrentWeight('');
            setHeight('');
            setFitnessLevel(FitnessLevel.Beginner);
            setNumOfDays(1);
            setTimeToWorkoutDaily('');
            setFitnessGoals(FitnessGoals.LoseWeight);
            setWorkoutTypesEnjoyed([WorkoutTypes.WeightTraining, WorkoutTypes.BodyweightExercises]);
            setWorkoutTypesNotEnjoyed([WorkoutTypes.Yoga, WorkoutTypes.Cardio]);
            setEquipmentAccess(EquipmentAccess.FullGymAccess);
        }
    }, [modalOpen]);

    return (
        modalOpen && !createdWorkoutPlan ?
        <Modal
            style={{flex: 1}}
            presentationStyle="fullScreen"
            animationType="slide"
        >
            <SafeAreaView style={styles.modal}>
                <View style={styles.headerContainer}>
                    <Text style={styles.modalHeaderText}>Workout Plan Creator</Text>
                    <TouchableHighlight onPress={() => toggleModal()}>
                        <Text style={styles.modalHeaderText}>Cancel</Text>
                    </TouchableHighlight>
                </View>
            {
                creationLoading ? <View style={{height: '100%', width: '100%', display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large" color="#FFDD00" />
                    </View> : (
                        <ScrollView contentContainerStyle={{flexGrow: 1}}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputText}>
                                    What is your current weight?
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Weight (lbs/kg)"
                                    onChangeText={text => {
                                        setCurrentWeight(text)
                                    }}
                                    value={currentWeight}
                                    placeholderTextColor="#a8a8a8"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputText}>
                                    What is your height?
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder={`5'6"`}
                                    onChangeText={text => {
                                        setHeight(text)
                                    }}
                                    value={height}
                                    placeholderTextColor="#a8a8a8"
                                />
                            </View>

                                {
                                    NumDaysToWorkout(7)
                                }
                                {
                                    NumOfWorkoutsPerDay(5)
                                }
                                {
                                    FitnessLevelButtons()
                                }
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputText}>
                                        How many hours do you have to workout daily?
                                    </Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="1 - 6 hours"
                                        onChangeText={text => {
                                            setTimeToWorkoutDaily(text)
                                        }}
                                        value={timeToWorkoutDaily}
                                        placeholderTextColor="#a8a8a8"
                                    />
                                </View>
                                {
                                    FitnessGoalsButtons()
                                }
                                {
                                    WorkoutTypesButtons()
                                }
                                {
                                    EquipmentAccessButtons()
                                }
                                {
                                    <TouchableHighlight style={styles.submitButton} onPress={() => createWorkoutPlan()}>
                                        <Text style={styles.submitButtonText}>Create Personalized Workout Plan</Text>
                                    </TouchableHighlight>
                                }
                        </ScrollView>
                )
            }
            </SafeAreaView>
        </Modal> : createdWorkoutPlan ? GoToEditor() : null
    )
}

const styles = StyleSheet.create({
    activeButtonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    inactiveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    activeBubbleButton: {
        padding: 10,
        minWidth: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFDD00',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 5,
        fontWeight: 'bold',
    },
    inactiveBubbleButton: {
        padding: 10,
        minWidth: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#212529',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 5,
    },
    modal: {
        height: '100%',
        flex: 1,
        backgroundColor: '#101214',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        zIndex: 999,
        paddingTop: StatusBar.currentHeight,
    },
    modalHeaderText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },

    inputText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#101214',
        width: '100%',
        padding: '5%',
        paddingTop: '10%',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#101214',
        padding: '5%',
        paddingBottom: '10%',
    },
    actionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        backgroundColor: '#101214',
        width: '100%',
        paddingVertical: '5%',
    },

    input: {
        height: 40,
        borderColor: '#FFDD00',
        color: '#fff',
        borderWidth: 1,
        borderRadius: 15,
        width: '100%',
        marginRight: '5%',
        padding: 5,
        marginTop: 10,
    },
    submitButton: {
        height: 80,
        backgroundColor: '#FFDD00',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 16,
        marginHorizontal: 10,
    },
    submitButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    }

})