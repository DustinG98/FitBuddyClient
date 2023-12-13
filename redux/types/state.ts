export interface UsersState {
    profileLoading: boolean;
    feedLoading: boolean;
    profile: any;
    connected: boolean;
    profiles: any[];
    feed: any[];
    error: any;
}

export interface PostsState {
    loading: boolean;
    posts: any[];
    othersPosts: any[];
    error: any;
}

export interface State {
    postsState: PostsState;
    usersState: UsersState;
}