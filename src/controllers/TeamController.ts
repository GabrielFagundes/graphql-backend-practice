import { TeamModel } from "./../models/Team";
import { TeamMember } from "../models/TeamMember.js";
import CoachService from "../services/CoachService.js";
import PlayerService from "../services/PlayerService.js";
import TeamService from "../services/TeamService.js";

class TeamController {
    async getAllTeams(): Promise<TeamModel[]> {
        return TeamService.getAllTeams();
    }

    async getTeamMembers(teamId: number): Promise<TeamMember[]> {
        const players = await PlayerService.getPlayersByTeam(teamId);
        if (players && players.length > 0) {
            return players;
        } else {
            const coach = await CoachService.getCoachByTeam(teamId);
            return coach ? [coach] : [];
        }
    }

    async getTeamByName(name: string) {
        if (!name) {
            throw new Error("Team name must be provided");
        }

        const team = await TeamService.getTeamByName(name);
        const teamMembers = await this.getTeamMembers(team?.id || 0);
        return { ...team, players: teamMembers };
    }
}

export default new TeamController();
