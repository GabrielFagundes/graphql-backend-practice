import { TeamModel } from "./Team";

export interface PlayerModel {
    id: number;
    name: string;
    position: string;
    dateOfBirth: Date | string;
    nationality: string | null;

    team?: TeamModel;
}
