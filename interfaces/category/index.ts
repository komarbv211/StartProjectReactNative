export interface ICategoryItem {
    "id": number,
    "name": string,
    "image"?: string | null,
    "description": string,
    "userId": number
}
export interface ICategoryCreate {
    name: string;
    description?: string;
    image?: File|null;
}
export interface ICategoryEdit extends ICategoryCreate {
    id: number;
}
