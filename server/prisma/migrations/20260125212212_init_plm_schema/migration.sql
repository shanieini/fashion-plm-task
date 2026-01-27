-- AlterTable
ALTER TABLE "Garment" ADD COLUMN     "chosenSupplierId" INTEGER,
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Sample" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "status" SET DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "contactInfo" TEXT;

-- AddForeignKey
ALTER TABLE "Garment" ADD CONSTRAINT "Garment_chosenSupplierId_fkey" FOREIGN KEY ("chosenSupplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
