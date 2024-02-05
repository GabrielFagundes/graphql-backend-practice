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
import { fetchFootballData } from "../utils/fetchFooballData";

class LeagueController {
    async importLeagueData(leagueCode: string) {
        // Start a transaction
        const transaction = await prisma.$transaction(async (transaction) => {
            try {
                const url = `/competitions/${leagueCode}/teams`;
                const { teams, competition: competitionData } =
                    await fetchFootballData(url);

                if (!teams || teams.length <= 0) {
                    return {
                        success: false,
                        message: "Couldn't find any data to import",
                    };
                }

                // Import competition using the transaction instance
                const competition: CompetitionModel = {
                    id: competitionData?.id,
                    name: competitionData?.name,
                    code: competitionData?.code,
                    areaName: teams[0]?.area?.name,
                };
                await CompetitionService.upsertCompetition(
                    competition,
                    transaction
                );

                // Iterate over each team and import players or coach
                for (const team of teams) {
                    const teamData: TeamModel = {
                        id: team.id,
                        name: team.name,
                        tla: team.tla,
                        shortName: team.shortName,
                        areaName: team.area?.name,
                        address: team.address,
                    };

                    const existingTeam = await prisma.team.findUnique({
                        where: { id: team.id },
                    });

                    const createdOrUpdatedTeam = await TeamService.upsertTeam(
                        teamData,
                        transaction
                    );

                    // Checking if the team is already related to the competition
                    const existingRelation =
                        await transaction.competitionTeam.findUnique({
                            where: {
                                competitionCode_teamId: {
                                    competitionCode: competition.code,
                                    teamId: team.id,
                                },
                            },
                        });

                    if (!existingRelation) {
                        // Creating a new relation if it doesn't exist
                        await transaction.competitionTeam.create({
                            data: {
                                competitionCode: competition.code,
                                teamId: team.id,
                            },
                        });
                    }

                    if (!existingTeam) continue;

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
                                createdOrUpdatedTeam.id || 0,
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
                            createdOrUpdatedTeam.id || 0,
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

        return transaction;
    }
}

export default new LeagueController();
