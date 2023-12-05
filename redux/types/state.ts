export interface PostsState {
    loading: boolean;
    posts: any[];
    error: any;
}

export interface State {
    postsState: PostsState;
}