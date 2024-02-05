-- CreateTable
CREATE TABLE "CompetitionTeam" (
    "competitionCode" TEXT NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "CompetitionTeam_pkey" PRIMARY KEY ("competitionCode","teamId")
);

-- AddForeignKey
ALTER TABLE "CompetitionTeam" ADD CONSTRAINT "CompetitionTeam_competitionCode_fkey" FOREIGN KEY ("competitionCode") REFERENCES "Competition"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitionTeam" ADD CONSTRAINT "CompetitionTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
