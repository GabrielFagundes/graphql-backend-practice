import { CoachModel } from "../models/Coach";
import { Prisma } from "@prisma/client";
import prisma from "../db/prismaSingleton";

class CoachService {
    async upsertCoach(
        coachData: CoachModel,
        teamId: number,
        tx?: Prisma.TransactionClient
    ) {
        if (!coachData.id) throw new Error("Invalid coach data");

        const prismaClient = tx || prisma;

        return await prismaClient.coach.upsert({
            where: { id: coachData.id },
            update: { ...coachData, teamId },
            create: { ...coachData, teamId },
        });
    }

    async getCoachByTeam(teamId: number) {
        return prisma.coach.findFirst({
            where: { teamId },
        });
    }

    async getCoachesByLeague(leagueCode: string, teamName?: string) {
        return prisma.coach.findMany({
            where: {
                team: {
                    competitionCode: leagueCode,
                    ...(teamName && { name: teamName }),
                },
            },
            include: {
                team: true,
            },
        });
    }
}

export default new CoachService();
