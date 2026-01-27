import { useState, useEffect } from 'react';
import styles from './App.module.css';
import { useGarmentAPI } from './hooks/useGarmentAPI';
import type { Attribute, Material, Supplier, Garment, MaterialSelection, GarmentFormData } from './types';
import { AlertMessages } from './components/AlertMessages';
import { GarmentForm } from './components/GarmentForm';
import { GarmentDashboard } from './components/GarmentDashboard';
import { PromoteModal } from './components/PromoteModal';

function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedAttrIds, setSelectedAttrIds] = useState<number[]>([]);
  const [materialSelections, setMaterialSelections] = useState<MaterialSelection[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [availableAttributes, setAvailableAttributes] = useState<Attribute[]>([]);
  const [availableMaterials, setAvailableMaterials] = useState<Material[]>([]);
  const [availableSuppliers, setAvailableSuppliers] = useState<Supplier[]>([]);

  const [garments, setGarments] = useState<Garment[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetGarmentId, setTargetGarmentId] = useState<number | null>(null);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const api = useGarmentAPI();

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      const { attributes, materials, suppliers } = await api.fetchCatalogs();
      setAvailableAttributes(attributes);
      setAvailableMaterials(materials);
      setAvailableSuppliers(suppliers);

      if (materials.length > 0) {
        setMaterialSelections([{ materialId: materials[0].id, percentage: 100 }]);
      }

      await refreshGarments();
    } catch (err) {
      console.error('Failed to initialize data', err);
      setError('Could not load data. Is the server running?');
    }
  };

  const refreshGarments = async () => {
    try {
      const data = await api.fetchGarments();
      setGarments(data);
    } catch (err) {
      console.error('Failed to fetch garments', err);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setSelectedAttrIds([]);
    setEditingId(null);
    if (availableMaterials.length > 0) {
      setMaterialSelections([{ materialId: availableMaterials[0].id, percentage: 100 }]);
    }
  };

  const toggleAttribute = (id: number) => {
    setSelectedAttrIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const updateMaterial = (index: number, field: keyof MaterialSelection, value: number) => {
    const newMaterials = [...materialSelections];
    newMaterials[index] = { ...newMaterials[index], [field]: value };
    setMaterialSelections(newMaterials);
  };

  const addMaterialRow = () => {
    if (availableMaterials.length > 0) {
      setMaterialSelections([
        ...materialSelections,
        { materialId: availableMaterials[0].id, percentage: 0 }
      ]);
    }
  };

  const removeMaterialRow = (index: number) => {
    setMaterialSelections(materialSelections.filter((_, i) => i !== index));
  };

  const handleEditClick = (g: Garment) => {
    if (g.lifecycleState === 'Mass_Production') {
      alert('Cannot edit specs in Mass Production. Create a variation instead.');
      return;
    }

    setEditingId(g.id);
    setName(g.name);
    setDescription(g.description || '');
    setSelectedAttrIds(g.attributes.map(a => a.attribute.id));
    setMaterialSelections(
      g.materials.map(m => ({
        materialId: m.material.id,
        percentage: m.percentage
      }))
    );

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSuccessMsg(`Editing "${g.name}". Make changes and click Update.`);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    const totalPercentage = materialSelections.reduce((sum, m) => sum + m.percentage, 0);
    if (Math.abs(totalPercentage - 100) > 0.1) {
      setError(`Total material percentage must be 100% (Current: ${totalPercentage}%)`);
      setLoading(false);
      return;
    }

    try {
      const payload: GarmentFormData = {
        name,
        description,
        attributeIds: selectedAttrIds,
        materials: materialSelections
      };

      if (editingId) {
        await api.updateGarment(editingId, payload);
        setSuccessMsg('Garment updated successfully!');
      } else {
        await api.createGarment(payload);
        setSuccessMsg('Garment created successfully!');
      }

      resetForm();
      await refreshGarments();
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(`⚠️ ${err.response.data.message}`);
      } else {
        setError('Something went wrong.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this garment?')) return;
    setError(null);
    setSuccessMsg(null);

    try {
      await api.deleteGarment(id);
      setSuccessMsg('Garment deleted successfully.');

      if (editingId === id) {
        resetForm();
      }

      await refreshGarments();
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError(`⛔ ${err.response.data.message}`);
      } else {
        setError('Failed to delete garment.');
      }
    }
  };

  const handleCreateVariation = async (garmentId: number) => {
    if (!window.confirm('Create a new variation (v2) based on this garment?')) return;

    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      await api.createVariation(garmentId);
      setSuccessMsg('Variation created successfully! Check the list.');
      await refreshGarments();
    } catch (err: any) {
      console.error(err);
      setError('Failed to create variation.');
    } finally {
      setLoading(false);
    }
  };

  const openPromoteModal = (garmentId: number) => {
    setTargetGarmentId(garmentId);
    setSelectedSupplierId('');
    setIsModalOpen(true);
    setError(null);
    setSuccessMsg(null);
  };

  const closePromoteModal = () => {
    setIsModalOpen(false);
    setTargetGarmentId(null);
  };

  const handleConfirmPromote = async () => {
    if (!targetGarmentId || !selectedSupplierId) {
      alert('Please select a supplier first.');
      return;
    }

    setLoading(true);

    try {
      const supplierId = Number(selectedSupplierId);

      const sampleRes = await api.createSample(targetGarmentId, supplierId, 150);
      const sampleId = sampleRes.id;

      await api.approveSample(sampleId, 'Approved via Manager Dashboard');
      await api.promoteGarment(targetGarmentId, supplierId);

      setSuccessMsg(`🚀 Garment #${targetGarmentId} is now in Mass Production!`);
      await refreshGarments();
      closePromoteModal();
    } catch (err: any) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(`⚠️ ${err.response.data.message}`);
      } else {
        setError('Failed to promote garment.');
      }
      closePromoteModal();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <PromoteModal
        isOpen={isModalOpen}
        suppliers={availableSuppliers}
        selectedSupplierId={selectedSupplierId}
        loading={loading}
        onSupplierChange={setSelectedSupplierId}
        onConfirm={handleConfirmPromote}
        onClose={closePromoteModal}
      />
      <AlertMessages error={error} successMsg={successMsg} />
      <div className={styles.contentWrapper}>
        <GarmentForm
          editingId={editingId}
          name={name}
          description={description}
          selectedAttrIds={selectedAttrIds}
          materialSelections={materialSelections}
          availableAttributes={availableAttributes}
          availableMaterials={availableMaterials}
          loading={loading}
          onNameChange={setName}
          onDescriptionChange={setDescription}
          onToggleAttribute={toggleAttribute}
          onUpdateMaterial={updateMaterial}
          onAddMaterial={addMaterialRow}
          onRemoveMaterial={removeMaterialRow}
          onSubmit={handleFormSubmit}
          onCancel={resetForm}
        />

        <GarmentDashboard
          garments={garments}
          editingId={editingId}
          onEdit={handleEditClick}
          onCreateVariation={handleCreateVariation}
          onPromote={openPromoteModal}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;