import { PrismaClient } from "@prisma/client";
import { CoachModel } from "../models/Coach";

const prisma = new PrismaClient();

class CoachService {
    async upsertCoach(coachData: CoachModel, teamId: number) {
        if (!coachData.id) throw new Error("Invalid coach data");

        return await prisma.coach.upsert({
            where: { id: coachData.id },
            update: { ...coachData, teamId },
            create: { ...coachData, teamId },
        });
    }
}

export default new CoachService();
