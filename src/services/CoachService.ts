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

    async getCoachesByLeague(leagueCode: string) {
        const competition = await prisma.competition.findUnique({
            where: { code: leagueCode },
        });

        if (!competition) {
            throw new Error(`Competition with code ${leagueCode} not found`);
        }

        const teams = await prisma.competitionTeam.findMany({
            where: { competitionCode: competition.code },
            include: { team: true },
        });

        const coaches = [];
        for (const { team } of teams) {
            const coach = await prisma.coach.findFirst({
                where: { teamId: team.id },
            });
            coaches.push(coach);
        }

        return coaches;
    }
}

export default new CoachService();
