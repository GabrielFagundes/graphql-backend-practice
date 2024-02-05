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

    async getPlayersByLeague(leagueCode: string, teamName?: string) {
        return prisma.player.findMany({
            where: {
                Team: {
                    competitionCode: leagueCode,
                    ...(teamName && { name: teamName }),
                },
            },
            include: {
                Team: true,
            },
        });
    }
}

export default new PlayerService();
