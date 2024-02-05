import { TeamModel } from "../models/Team";
import { Prisma } from "@prisma/client";
import prisma from "../db/prismaSingleton";

class TeamService {
    async upsertTeam(
        teamData: TeamModel,
        competitionCode: string,
        tx?: Prisma.TransactionClient
    ): Promise<TeamModel> {
        if (!teamData.id) throw new Error("Invalid team data");
        const prismaClient = tx || prisma;
        return await prismaClient.team.upsert({
            where: { id: teamData.id },
            update: { ...teamData, competitionCode },
            create: { ...teamData, competitionCode },
        });
    }

    async getAllTeams() {
        return prisma.team.findMany({});
    }

    async getTeamByName(name: string) {
        console.log("name", name);
        return prisma.team.findFirst({
            where: {
                name: {
                    contains: name,
                    mode: "insensitive",
                },
            },
            include: {
                Player: true,
                Coach: true,
            },
        });
    }
}

export default new TeamService();
