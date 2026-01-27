/*
  Warnings:

  - You are about to drop the column `state` on the `Supplier` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Attribute` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Sample" DROP CONSTRAINT "Sample_supplierId_fkey";

-- DropIndex
DROP INDEX "Attribute_name_category_key";

-- DropIndex
DROP INDEX "Supplier_name_key";

-- AlterTable
ALTER TABLE "Sample" ADD COLUMN     "priceOffer" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "state";

-- DropEnum
DROP TYPE "SupplierState";

-- CreateTable
CREATE TABLE "IncompatibleRule" (
    "id" SERIAL NOT NULL,
    "attributeAId" INTEGER NOT NULL,
    "attributeBId" INTEGER NOT NULL,
    "reason" TEXT,

    CONSTRAINT "IncompatibleRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IncompatibleRule_attributeAId_attributeBId_key" ON "IncompatibleRule"("attributeAId", "attributeBId");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_name_key" ON "Attribute"("name");

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
