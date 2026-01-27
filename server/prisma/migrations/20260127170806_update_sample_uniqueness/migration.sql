/*
  Warnings:

  - A unique constraint covering the columns `[name,category]` on the table `Attribute` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[garmentId,supplierId]` on the table `Sample` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Attribute_name_category_key" ON "Attribute"("name", "category");

-- CreateIndex
CREATE UNIQUE INDEX "Sample_garmentId_supplierId_key" ON "Sample"("garmentId", "supplierId");
