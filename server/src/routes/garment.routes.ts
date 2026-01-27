import { Router } from 'express';
import { GarmentController } from '../controllers/GarmentController';

const router = Router();

// GET /garments/attributes
// Retrieves all available garment attributes
// Controller: GarmentController.getAttributes
router.get('/attributes', GarmentController.getAttributes);
// GET /garments/materials
// Retrieves all available garment materials
// Controller: GarmentController.getMaterials
router.get('/materials', GarmentController.getMaterials);
// GET /garments/suppliers
// Retrieves all available suppliers
// Controller: GarmentController.getSuppliers
router.get('/suppliers', GarmentController.getSuppliers);

// POST /garments/samples
// Creates a new sample for a specific garment
// Controller: GarmentController.createSample
router.post('/samples', GarmentController.createSample);                
// PATCH /garments/samples/:id
// Updates the status of an existing sample
// Controller: GarmentController.updateSampleStatus
router.patch('/samples/:id', GarmentController.updateSampleStatus);     

// POST /garments/:id/promote
// Promotes a garment to mass production
// Controller: GarmentController.promoteToProduction
router.post('/:id/promote', GarmentController.promoteToProduction); 
// POST /garments/:id/variations
// Creates a new variation for an existing garment
// Controller: GarmentController.createVariation
router.post('/:id/variations', GarmentController.createVariation);      

// DELETE /garments/:id
// Deletes a garment by its ID
// Controller: GarmentController.deleteGarment
router.delete('/:id', GarmentController.deleteGarment);  
// PUT /garments/:id
// Updates garment details by ID
// Controller: GarmentController.update
router.put('/:id', GarmentController.update); 
// POST /garments
// Creates a new garment
// Controller: GarmentController.create
router.post('/', GarmentController.create);                             
// GET /garments
// Retrieves all garments
// Controller: GarmentController.getAll
router.get('/', GarmentController.getAll);                              

export default router;