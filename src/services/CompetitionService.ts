import { PrismaClient } from "@prisma/client";
import { CompetitionModel } from "../models/Competition";

const prisma = new PrismaClient();

class CompetitionService {
    async upsertCompetition(
        competitionData: CompetitionModel
    ): Promise<CompetitionModel> {
        if (!competitionData.id) throw new Error("Invalid competition data");

        return await prisma.competition.upsert({
            where: { id: competitionData.id },
            update: competitionData,
            create: competitionData,
        });
    }
}

export default new CompetitionService();
