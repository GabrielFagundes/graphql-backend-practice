import { PlayerModel } from "../models/Player";
import { Prisma } from "@prisma/client";
import prisma from "../db/prismaSingleton";

class PlayerService {
    async upsertPlayer(
        playerData: PlayerModel,
        teamId: number,
        tx?: Prisma.TransactionClient
    ) {
        if (!playerData.id) throw new Error("Invalid player data");
        const prismaClient = tx || prisma;
        return await prismaClient.player.upsert({
            where: { id: playerData.id },
            update: { ...playerData, teamId },
            create: { ...playerData, teamId },
        });
    }

    async getPlayersByTeam(teamId: number) {
        return prisma.player.findMany({
            where: { teamId },
        });
    }

    async getPlayersByLeague(leagueCode: string) {
        const competition = await prisma.competition.findUnique({
            where: { code: leagueCode },
        });

        if (!competition) {
            throw new Error(`Competition with code ${leagueCode} not found`);
        }

        // Then, get teams associated with this competition
        const teams = await prisma.competitionTeam.findMany({
            where: { competitionCode: competition.code },
            include: { team: true },
        });

        // Finally, fetch players for these teams
        const players = [];
        for (const { team } of teams) {
            const teamPlayers = await prisma.player.findMany({
                where: { teamId: team.id },
            });
            players.push(...teamPlayers);
        }

        return players;
    }
}

export default new PlayerService();
