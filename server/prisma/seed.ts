import 'dotenv/config';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // 1. Create Materials (Upsert prevents errors if they exist)
  const cotton = await prisma.material.upsert({
    where: { name: 'Cotton' },
    update: {},
    create: { name: 'Cotton' },
  })
  const lycra = await prisma.material.upsert({
    where: { name: 'Lycra' },
    update: {},
    create: { name: 'Lycra' },
  })
  const denim = await prisma.material.upsert({
    where: { name: 'Denim' },
    update: {},
    create: { name: 'Denim' },
  })

  // 2. Create Attributes
  const nightwear = await prisma.attribute.upsert({
    where: { name: 'Nightwear' },
    update: {},
    create: { name: 'Nightwear', category: 'Usage' },
  })

  const activewear = await prisma.attribute.upsert({
    where: { name: 'Activewear' },
    update: {},
    create: { name: 'Activewear', category: 'Usage' },
  })

  const longSleeve = await prisma.attribute.upsert({
    where: { name: 'Long Sleeve' },
    update: {},
    create: { name: 'Long Sleeve', category: 'Sleeve' },
  })

  // 3. Create Incompatible Rule (Business Logic)
  // Rule: Nightwear cannot be Activewear
  const existingRule = await prisma.incompatibleRule.findFirst({
    where: {
      attributeAId: nightwear.id,
      attributeBId: activewear.id,
    }
  })

  if (!existingRule) {
    await prisma.incompatibleRule.create({
      data: {
        attributeAId: nightwear.id,
        attributeBId: activewear.id,
        reason: 'Nightwear cannot be used as Activewear (running outfit)',
      },
    })
    console.log('⚠️ Created rule: Nightwear <> Activewear')
  }

  // 4. Create Suppliers
  await prisma.supplier.create({
    data: {
      name: 'Best Fabrics Ltd',
      contactInfo: 'contact@bestfabrics.com',
    },
  })

  await prisma.supplier.create({
    data: {
      name: 'Global Textiles',
      contactInfo: 'sales@globaltextiles.com',
    },
  })

  console.log('✅ Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })