import { Hive } from "./hive";

export class User {
    id: number;
    birthDate: Date;
    name: string;
    avatar: string;
    bio: string;
    notes: Hive[] = [];
}
