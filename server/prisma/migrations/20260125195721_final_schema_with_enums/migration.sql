-- DropForeignKey
ALTER TABLE "GarmentAttribute" DROP CONSTRAINT "GarmentAttribute_attributeId_fkey";

-- DropForeignKey
ALTER TABLE "GarmentAttribute" DROP CONSTRAINT "GarmentAttribute_garmentId_fkey";

-- DropForeignKey
ALTER TABLE "GarmentMaterial" DROP CONSTRAINT "GarmentMaterial_garmentId_fkey";

-- DropForeignKey
ALTER TABLE "GarmentMaterial" DROP CONSTRAINT "GarmentMaterial_materialId_fkey";

-- DropForeignKey
ALTER TABLE "Sample" DROP CONSTRAINT "Sample_garmentId_fkey";

-- AddForeignKey
ALTER TABLE "GarmentMaterial" ADD CONSTRAINT "GarmentMaterial_garmentId_fkey" FOREIGN KEY ("garmentId") REFERENCES "Garment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GarmentMaterial" ADD CONSTRAINT "GarmentMaterial_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GarmentAttribute" ADD CONSTRAINT "GarmentAttribute_garmentId_fkey" FOREIGN KEY ("garmentId") REFERENCES "Garment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GarmentAttribute" ADD CONSTRAINT "GarmentAttribute_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_garmentId_fkey" FOREIGN KEY ("garmentId") REFERENCES "Garment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
