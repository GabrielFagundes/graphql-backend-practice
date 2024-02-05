/*
  Warnings:

  - You are about to drop the column `competitionId` on the `Team` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Competition` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `competitionCode` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_competitionId_fkey";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "competitionId",
ADD COLUMN     "competitionCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Competition_code_key" ON "Competition"("code");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_competitionCode_fkey" FOREIGN KEY ("competitionCode") REFERENCES "Competition"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
