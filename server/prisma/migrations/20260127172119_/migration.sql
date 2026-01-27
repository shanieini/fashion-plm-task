/*
  Warnings:

  - A unique constraint covering the columns `[name,category]` on the table `Attribute` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "SupplierState" AS ENUM ('Prospect', 'Approved', 'Production', 'Disqualified');

-- DropForeignKey
ALTER TABLE "Sample" DROP CONSTRAINT "Sample_supplierId_fkey";

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "state" "SupplierState" NOT NULL DEFAULT 'Prospect';

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_name_category_key" ON "Attribute"("name", "category");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_name_key" ON "Supplier"("name");

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
