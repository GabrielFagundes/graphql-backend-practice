import { PrismaClient } from "@prisma/client";
import { PlayerModel } from "../models/Player";

const prisma = new PrismaClient();

class PlayerService {
    async upsertPlayer(playerData: PlayerModel, teamId: number) {
        if (!playerData.id) throw new Error("Invalid player data");

        return await prisma.player.upsert({
            where: { id: playerData.id },
            update: { ...playerData, teamId },
            create: { ...playerData, teamId },
        });
    }
}

export default new PlayerService();
