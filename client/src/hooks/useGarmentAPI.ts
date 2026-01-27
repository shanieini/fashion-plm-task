import axios from 'axios';
import type { Attribute, Material, Supplier, Garment, GarmentFormData } from '../types';

const API_BASE = 'http://localhost:3000/api';

export const useGarmentAPI = () => {
  const fetchCatalogs = async () => {
    const [attrRes, matRes, suppRes] = await Promise.all([
      axios.get(`${API_BASE}/garments/attributes`),
      axios.get(`${API_BASE}/garments/materials`),
      axios.get(`${API_BASE}/garments/suppliers`)
    ]);
    return {
      attributes: attrRes.data as Attribute[],
      materials: matRes.data as Material[],
      suppliers: suppRes.data as Supplier[]
    };
  };

  const fetchGarments = async () => {
    const res = await axios.get(`${API_BASE}/garments`);
    return res.data as Garment[];
  };

  const createGarment = async (data: GarmentFormData) => {
    const res = await axios.post(`${API_BASE}/garments`, data);
    return res.data;
  };

  const updateGarment = async (id: number, data: GarmentFormData) => {
    const res = await axios.put(`${API_BASE}/garments/${id}`, data);
    return res.data;
  };

  const deleteGarment = async (id: number) => {
    const res = await axios.delete(`${API_BASE}/garments/${id}`);
    return res.data;
  };

  const createVariation = async (garmentId: number) => {
    const res = await axios.post(`${API_BASE}/garments/${garmentId}/variations`);
    return res.data;
  };

  const createSample = async (garmentId: number, supplierId: number, priceOffer: number) => {
    const res = await axios.post(`${API_BASE}/garments/samples`, {
      garmentId,
      supplierId,
      priceOffer
    });
    return res.data;
  };

  const approveSample = async (sampleId: number, feedback: string) => {
    const res = await axios.patch(`${API_BASE}/garments/samples/${sampleId}`, {
      status: 'Approved',
      feedback
    });
    return res.data;
  };

  const promoteGarment = async (garmentId: number, supplierId: number) => {
    const res = await axios.post(`${API_BASE}/garments/${garmentId}/promote`, {
      supplierId
    });
    return res.data;
  };

  return {
    fetchCatalogs,
    fetchGarments,
    createGarment,
    updateGarment,
    deleteGarment,
    createVariation,
    createSample,
    approveSample,
    promoteGarment
  };
};
