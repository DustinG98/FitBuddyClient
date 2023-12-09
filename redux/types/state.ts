export interface UsersState {
    loading: boolean;
    profile: any;
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