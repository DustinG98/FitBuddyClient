import { AiWorkoutOutput, AiWorkoutPlan, StoredWorkoutPlan, StoredWorkoutPlanOverview } from "../../models/workouts";

export interface UserNotification {
    type: 'error' | 'success';
    message: string;
    delay?: number;
    actionName?: string;
    action?: string;
}

export interface UsersState {
    profileLoading: boolean;
    feedLoading: boolean;
    searchLoading: boolean;
    profile: any;
    connected: boolean;
    profiles: any[];
    searchResults: any[];
    feed?: any[];
    error: any;
    notification?: UserNotification;
}

export interface GetS3UrlOutput {
    presignedUrl: string,
    imageType: string,
    key: string,
}

export interface PostsState {
    loading: boolean;
    posts: any;
    othersPosts: any[];
    error: any;
    creationLoading: boolean;
    s3SignedUrl?: GetS3UrlOutput;
}

export interface WorkoutsState {
    creationLoading: boolean;
    creationError: any;
    createdWorkoutPlanId?: string;
    fetchLoading: boolean;
    fetchError: any;
    fetchedWorkoutPlan?: StoredWorkoutPlan;

    usersWorkoutPlansLoading: boolean;
    usersWorkoutPlansError: any;
    usersWorkoutPlans?: StoredWorkoutPlanOverview[];
}

export interface State {
    postsState: PostsState;
    usersState: UsersState;
    workoutsState: WorkoutsState;
}