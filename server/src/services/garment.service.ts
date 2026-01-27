import { PrismaClient, Garment, SampleStatus } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateGarmentInput {
  name: string;
  description?: string;
  attributeIds: number[]; 
  materials: { materialId: number; percentage: number }[];
}

export class GarmentService {
  
  static async createGarment(data: CreateGarmentInput) {
    
    await this.validateIncompatibleRules(data.attributeIds);

    const newGarment = await prisma.garment.create({
      data: {
        name: data.name,
        description: data.description,
        lifecycleState: 'Concept',
        
        attributes: {
          create: data.attributeIds.map((id) => ({
            attribute: { connect: { id } }
          }))
        },

        materials: {
          create: data.materials.map((m) => ({
            percentage: m.percentage,
            material: { connect: { id: m.materialId } }
          }))
        }
      },
      include: {
        attributes: { include: { attribute: true } },
        materials: { include: { material: true } }
      }
    });

    return newGarment;
  }

  private static async validateIncompatibleRules(attributeIds: number[]) {
    if (!attributeIds || attributeIds.length === 0) return;

    const conflicts = await prisma.incompatibleRule.findMany({
      where: {
        OR: [
          { attributeAId: { in: attributeIds } },
          { attributeBId: { in: attributeIds } }
        ]
      }
    });

    for (const rule of conflicts) {
      const hasA = attributeIds.includes(rule.attributeAId);
      const hasB = attributeIds.includes(rule.attributeBId);

      if (hasA && hasB) {
        throw new Error(`Business Rule Violation: ${rule.reason}`);
      }
    }
  }

  static async getAllGarments() {
    return await prisma.garment.findMany({
      where: { deletedAt: null }, 
      orderBy: { createdAt: 'desc' },
      include: {
        attributes: { include: { attribute: true } },
        materials: { include: { material: true } },
        chosenSupplier: true
      }
    });
  }

  static async deleteGarment(id: number) {
    const garment = await prisma.garment.findUnique({ where: { id } });

    if (!garment) throw new Error("Garment not found");

    if (garment.lifecycleState === 'Mass_Production') {
      throw new Error("Lifecycle Constraint: Cannot delete a garment that has reached Mass Production.");
    }

    return await prisma.garment.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  static async createVariation(parentId: number) {
    const parent = await prisma.garment.findUnique({
      where: { id: parentId },
      include: {
        attributes: true,
        materials: true
      }
    });

    if (!parent) throw new Error("Parent garment not found");

    return await prisma.garment.create({
      data: {
        name: `${parent.name} (v2)`,
        description: parent.description,
        lifecycleState: 'Concept',
        parentId: parent.id, 

        attributes: {
          create: parent.attributes.map(attrRel => ({
            attribute: { connect: { id: attrRel.attributeId } }
          }))
        },

        materials: {
          create: parent.materials.map(matRel => ({
            material: { connect: { id: matRel.materialId } },
            percentage: matRel.percentage
          }))
        }
      },
      include: {
        attributes: { include: { attribute: true } },
        materials: { include: { material: true } }
      }
    });
  }

  static async getAttributes() {
    return await prisma.attribute.findMany({
      orderBy: { category: 'asc' }
    });
  }

  static async getMaterials() {
    return await prisma.material.findMany({
      orderBy: { name: 'asc' }
    });
  }

  static async getSuppliers() {
    return await prisma.supplier.findMany();
  }

  static async createSample(garmentId: number, supplierId: number, priceOffer: number) {
    return await prisma.sample.create({
      data: {
        garmentId,
        supplierId,
        priceOffer,
        status: 'Pending'
      },
      include: { supplier: true }
    });
  }

  static async updateSampleStatus(sampleId: number, status: SampleStatus, feedback?: string) {
    return await prisma.sample.update({
      where: { id: sampleId },
      data: { 
        status,
        feedback
      }
    });
  }

  static async promoteToMassProduction(garmentId: number, supplierId: number) {
    const approvedSample = await prisma.sample.findFirst({
      where: {
        garmentId,
        supplierId,
        status: 'Approved'
      }
    });

    if (!approvedSample) {
      throw new Error("Business Rule Violation: Cannot start Mass Production without an 'Approved' sample from this supplier.");
    }

    return await prisma.garment.update({
      where: { id: garmentId },
      data: {
        lifecycleState: 'Mass_Production',
        chosenSupplierId: supplierId
      }
    });
  }

  static async updateGarment(id: number, data: CreateGarmentInput) {
    const current = await prisma.garment.findUnique({ where: { id } });
    if (!current) throw new Error("Garment not found");
    
    if (current.lifecycleState === 'Mass_Production') {
      throw new Error("Lifecycle Constraint: Cannot update specifications for a product in Mass Production.");
    }

    await this.validateIncompatibleRules(data.attributeIds);

    return await prisma.garment.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        
        attributes: {
          deleteMany: {}, 
          create: data.attributeIds.map((id) => ({
            attribute: { connect: { id } }
          }))
        },

        materials: {
          deleteMany: {},
          create: data.materials.map((m) => ({
            percentage: m.percentage,
            material: { connect: { id: m.materialId } }
          }))
        }
      },
      include: {
        attributes: { include: { attribute: true } },
        materials: { include: { material: true } }
      }
    });
  }
}