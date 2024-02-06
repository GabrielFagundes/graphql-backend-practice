import { TeamModel } from "../models/Team.js";
import { Prisma } from "@prisma/client";
import prisma from "../db/prismaSingleton.js";

class TeamService {
    async upsertTeam(
        teamData: TeamModel,
        tx?: Prisma.TransactionClient
    ): Promise<TeamModel> {
        if (!teamData.id) throw new Error("Invalid team data");
        const prismaClient = tx || prisma;
        return await prismaClient.team.upsert({
            where: { id: teamData.id },
            update: { ...teamData },
            create: { ...teamData },
        });
    }

    async getAllTeams() {
        return prisma.team.findMany({});
    }

    async getTeamByName(name: string) {
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
