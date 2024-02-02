import { PrismaClient } from "@prisma/client";
import { TeamModel } from "../models/Team";

const prisma = new PrismaClient();

class TeamService {
    async upsertTeam(
        teamData: TeamModel,
        competitionId: number
    ): Promise<TeamModel> {
        if (!teamData.id) throw new Error("Invalid team data");

        return await prisma.team.upsert({
            where: { id: teamData.id },
            update: { ...teamData, competitionId },
            create: { ...teamData, competitionId },
        });
    }
}

export default new TeamService();
