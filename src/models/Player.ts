import { TeamModel } from "./Team.js";

export interface PlayerModel {
    id: number;
    name: string;
    position: string;
    dateOfBirth: Date | string;
    nationality: string | null;

    team?: TeamModel;
}
