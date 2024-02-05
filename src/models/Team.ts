import { CoachModel } from "./Coach";
import { CompetitionModel } from "./Competition";
import { PlayerModel } from "./Player";

export interface TeamModel {
    id: number;
    name: string;
    shortName: string | null;
    tla: string | null;
    areaName: string | null;
    address: string | null;

    squad?: PlayerModel[];
    coach?: CoachModel;
}
