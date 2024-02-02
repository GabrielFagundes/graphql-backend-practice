import HttpService from "../services/HttpService";
import CompetitionService from "../services/CompetitionService";
import TeamService from "../services/TeamService";
import PlayerService from "../services/PlayerService";
import CoachService from "../services/CoachService";
import { CoachModel } from "../models/Coach";
import { PlayerModel } from "../models/Player";
import { CompetitionModel } from "../models/Competition";
import { TeamModel } from "../models/Team";
import { toISODate } from "../utils/toISODate";

class LeagueController {
    async importLeagueData(leagueCode: string) {
        try {
            // Fetch the league data
            const url = `http://api.football-data.org/v4/competitions/${leagueCode}/teams`;
            const { data } = await HttpService.get(url, {
                "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY || "",
            });

            if (data.length <= 0)
                return {
                    success: false,
                    message: "Couldn't find any data to impot",
                    league: null,
                };

            // Import competition
            const competition: CompetitionModel = {
                id: data.competition?.id,
                name: data.competition?.name,
                code: data.competition?.code,
                areaName: data.teams[0]?.area?.name,
            };
            await CompetitionService.upsertCompetition(competition);

            // Iterate over each team
            for (const team of data.teams) {
                const teamData: TeamModel = {
                    id: team.id,
                    name: team.name,
                    tla: team.tla,
                    shortName: team.shortName,
                    areaName: team.area?.name,
                    address: team.address,
                };
                const createdTeam = await TeamService.upsertTeam(
                    teamData,
                    competition.id || 0
                );

                // Import players or coach based on the squad data
                if (team.squad && team.squad.length > 0) {
                    for (const player of team.squad) {
                        const playerData: PlayerModel = {
                            id: player.id,
                            name: player.name,
                            position: player.position,
                            dateOfBirth: toISODate(player.dateOfBirth),
                            nationality: player.nationality,
                        };
                        await PlayerService.upsertPlayer(
                            playerData,
                            createdTeam.id || 0
                        );
                    }
                } else if (team.coach) {
                    const coachData: CoachModel = {
                        id: team.coach?.id,
                        name: team.coach?.name,
                        dateOfBirth: toISODate(team.coach?.dateOfBirth),
                        nationality: team.coach?.nationality,
                    };
                    await CoachService.upsertCoach(
                        coachData,
                        createdTeam.id || 0
                    );
                }
            }

            return {
                success: true,
                message: "Data imported successfully.",
                // league: data.competition,
            };
        } catch (error) {
            console.error("Error importing league data:", error);
            throw error;
        }
    }
}

export default new LeagueController();
