import { Request, Response } from 'express';
import { GarmentService } from '../services/garment.service';

export class GarmentController {

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, attributeIds, materials } = req.body;

      if (!name || !attributeIds || !materials) {
        res.status(400).json({ error: 'Missing required fields: name, attributeIds, or materials' });
        return;
      }

      const garment = await GarmentService.createGarment({
        name,
        description,
        attributeIds,
        materials
      });

      res.status(201).json(garment);

    } catch (error: any) {
      if (error.message && error.message.includes('Business Rule Violation')) {
         res.status(400).json({ 
           error: 'Validation Error', 
           message: error.message 
         });
         return;
      }
      console.error('Create Garment Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const garments = await GarmentService.getAllGarments();
      res.json(garments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch garments' });
    }
  }

  static async deleteGarment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await GarmentService.deleteGarment(Number(id));
      res.json({ message: 'Garment deleted successfully' });
    } catch (error: any) {
      if (error.message.includes('Lifecycle Constraint')) {
        res.status(403).json({ error: 'Operation Forbidden', message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete garment' });
      }
    }
  }

  static async getAttributes(req: Request, res: Response) {
    try {
      const attributes = await GarmentService.getAttributes();
      res.json(attributes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch attributes' });
    }
  }

  static async getMaterials(req: Request, res: Response) {
    try {
      const materials = await GarmentService.getMaterials();
      res.json(materials);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch materials' });
    }
  }

  static async getSuppliers(req: Request, res: Response) {
    try {
      const suppliers = await GarmentService.getSuppliers();
      res.json(suppliers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch suppliers' });
    }
  }

  static async createSample(req: Request, res: Response) {
    try {
      const { garmentId, supplierId, priceOffer } = req.body;
      
      if (!garmentId || !supplierId) {
        res.status(400).json({ error: 'Missing garmentId or supplierId' });
        return;
      }

      const sample = await GarmentService.createSample(Number(garmentId), Number(supplierId), Number(priceOffer));
      res.status(201).json(sample);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create sample' });
    }
  }

  static async updateSampleStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status, feedback } = req.body; 
      
      const updatedSample = await GarmentService.updateSampleStatus(Number(id), status, feedback);
      res.json(updatedSample);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update sample status' });
    }
  }

  static async promoteToProduction(req: Request, res: Response) {
    try {
      const { id } = req.params; 
      const { supplierId } = req.body;
      
      const garment = await GarmentService.promoteToMassProduction(Number(id), Number(supplierId));
      res.json({ message: 'Promoted to Mass Production', garment });
      
    } catch (error: any) {
      if (error.message && error.message.includes('Violation')) {
        res.status(400).json({ error: 'Business Rule Violation', message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  static async createVariation(req: Request, res: Response) {
    try {
      const { id } = req.params; 
      
      if (!id) {
        res.status(400).json({ error: 'Missing garment ID' });
        return;
      }

      const newVariation = await GarmentService.createVariation(Number(id));
      
      res.status(201).json(newVariation);
    } catch (error: any) {
      console.error('Create Variation Error:', error);
      res.status(500).json({ error: 'Failed to create variation' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, attributeIds, materials } = req.body;

      const updatedGarment = await GarmentService.updateGarment(Number(id), {
        name, description, attributeIds, materials
      });

      res.json(updatedGarment);

    } catch (error: any) {
      if (error.message && (error.message.includes('Violation') || error.message.includes('Constraint'))) {
        res.status(400).json({ error: 'Validation Error', message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ error: 'Failed to update garment' });
      }
    }
  }
}