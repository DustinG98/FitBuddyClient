export interface PostTable {
    id: string;
    sortKey?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PostRecord extends PostTable {
    content: string;
    image: string;
    likes: number;
    comments: number;
}