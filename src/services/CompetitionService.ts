import { CompetitionModel } from "../models/Competition";
import { Prisma } from "@prisma/client";
import prisma from "../db/prismaSingleton";

class CompetitionService {
    async upsertCompetition(
        competitionData: CompetitionModel,
        tx?: Prisma.TransactionClient
    ): Promise<CompetitionModel> {
        if (!competitionData.id) throw new Error("Invalid competition data");

        const prismaClient = tx || prisma;

        return await prismaClient.competition.upsert({
            where: { id: competitionData.id },
            update: competitionData,
            create: competitionData,
        });
    }
}

export default new CompetitionService();
