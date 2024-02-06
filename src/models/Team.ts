import { CoachModel } from "./Coach.js";
import { PlayerModel } from "./Player.js";

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
