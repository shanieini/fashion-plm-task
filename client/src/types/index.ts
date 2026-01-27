export interface AlertMessagesProps {
  error: string | null;
  successMsg: string | null;
}

export interface GarmentFormProps {
  editingId: number | null;
  name: string;
  description: string;
  selectedAttrIds: number[];
  materialSelections: MaterialSelection[];
  availableAttributes: Attribute[];
  availableMaterials: Material[];
  loading: boolean;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
  onToggleAttribute: (id: number) => void;
  onUpdateMaterial: (index: number, field: keyof MaterialSelection, value: number) => void;
  onAddMaterial: () => void;
  onRemoveMaterial: (index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export interface GarmentDashboardProps {
  garments: Garment[];
  editingId: number | null;
  onEdit: (garment: Garment) => void;
  onCreateVariation: (garmentId: number) => void;
  onPromote: (garmentId: number) => void;
  onDelete: (garmentId: number) => void;
}

export interface PromoteModalProps {
  isOpen: boolean;
  suppliers: Supplier[];
  selectedSupplierId: string;
  loading: boolean;
  onSupplierChange: (supplierId: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export interface MaterialsSectionProps {
  materialSelections: MaterialSelection[];
  availableMaterials: Material[];
  onUpdateMaterial: (index: number, field: keyof MaterialSelection, value: number) => void;
  onAddMaterial: () => void;
  onRemoveMaterial: (index: number) => void;
}

export interface GarmentCardProps {
  garment: Garment;
  isEditing: boolean;
  onEdit: (garment: Garment) => void;
  onCreateVariation: (garmentId: number) => void;
  onPromote: (garmentId: number) => void;
  onDelete: (garmentId: number) => void;
}

export interface AttributesSectionProps {
  availableAttributes: Attribute[];
  selectedAttrIds: number[];
  onToggleAttribute: (id: number) => void;
}
export interface Attribute {
  id: number;
  name: string;
  category: string;
}

export interface Material {
  id: number;
  name: string;
}

export interface Supplier {
  id: number;
  name: string;
  country: string;
}

export interface MaterialSelection {
  materialId: number;
  percentage: number;
}

export interface Garment {
  id: number;
  name: string;
  lifecycleState: 'Concept' | 'Sample' | 'Mass_Production';
  description: string | null;
  attributes: { attribute: { id: number; name: string } }[];
  materials: { percentage: number; material: { id: number; name: string } }[];
}

export interface GarmentFormData {
  name: string;
  description: string;
  attributeIds: number[];
  materials: MaterialSelection[];
}
