export interface UsersState {
    loading: boolean;
    profile: any;
    error: any;
}

export interface PostsState {
    loading: boolean;
    posts: any[];
    error: any;
}

export interface State {
    postsState: PostsState;
    usersState: UsersState;
}