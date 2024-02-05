/*
  Warnings:

  - You are about to drop the column `competitionCode` on the `Team` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_competitionCode_fkey";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "competitionCode";
