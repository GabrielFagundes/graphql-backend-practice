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
import prisma from "../db/prismaSingleton"; // Import your singleton Prisma client instance

class LeagueController {
    async importLeagueData(leagueCode: string) {
        // Start a transaction
        const transaction = await prisma.$transaction(async (transaction) => {
            try {
                const url = `http://api.football-data.org/v4/competitions/${leagueCode}/teams`;
                const { data } = await HttpService.get(url, {
                    "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY || "",
                });

                if (data.length <= 0) {
                    return {
                        success: false,
                        message: "Couldn't find any data to import",
                        league: null,
                    };
                }

                // Import competition using the transaction instance
                const competition: CompetitionModel = {
                    id: data.competition?.id,
                    name: data.competition?.name,
                    code: data.competition?.code,
                    areaName: data.teams[0]?.area?.name,
                };
                await CompetitionService.upsertCompetition(
                    competition,
                    transaction
                );

                // Iterate over each team and import players or coach
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
                        competition?.code || "",
                        transaction
                    );

                    // Import players or coach based on the squad data, using the transaction instance
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
                                createdTeam.id || 0,
                                transaction
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
                            createdTeam.id || 0,
                            transaction
                        );
                    }
                }

                return {
                    success: true,
                    message: "Data imported successfully.",
                };
            } catch (error) {
                console.error("Error within transaction:", error);
                throw error; // Rethrow the error to trigger a rollback
            }
        });

        return transaction; // Return the result of the transaction
    }
}

export default new LeagueController();
