-- AlterTable
ALTER TABLE "Coach" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Coach_id_seq";

-- AlterTable
ALTER TABLE "Competition" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Competition_id_seq";

-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Player_id_seq";

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Team_id_seq";
