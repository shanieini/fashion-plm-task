/*
  Warnings:

  - The `lifecycleState` column on the `Garment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `status` on the `Sample` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LifecycleState" AS ENUM ('Concept', 'Sample', 'Mass_Production');

-- CreateEnum
CREATE TYPE "SampleStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- AlterTable
ALTER TABLE "Garment" DROP COLUMN "lifecycleState",
ADD COLUMN     "lifecycleState" "LifecycleState" NOT NULL DEFAULT 'Concept';

-- AlterTable
ALTER TABLE "Sample" DROP COLUMN "status",
ADD COLUMN     "status" "SampleStatus" NOT NULL;
