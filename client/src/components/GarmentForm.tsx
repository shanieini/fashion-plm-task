
import type { GarmentFormProps } from '../types';
import styles from '../styles/GarmentForm.module.css';
import { AttributesSection } from './AttributesSection';
import { MaterialsSection } from './MaterialsSection';

export const GarmentForm = ({
  editingId,
  name,
  description,
  selectedAttrIds,
  materialSelections,
  availableAttributes,
  availableMaterials,
  loading,
  onNameChange,
  onDescriptionChange,
  onToggleAttribute,
  onUpdateMaterial,
  onAddMaterial,
  onRemoveMaterial,
  onSubmit,
  onCancel
}: GarmentFormProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{editingId ? `Edit Garment #${editingId}` : 'New Concept'}</h1>
          <p className={styles.subtitle}>
            {editingId ? 'Update existing specs' : 'Define product specs'}
          </p>
        </div>
        {editingId && (
          <button
            onClick={onCancel}
            className={styles.cancelButton}
          >
            Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={onSubmit} className={styles.form}>
        {/* Basic Info Section */}
        <div className={styles.formSection}>
          <h2 className={styles.sectionHeader}>Basic Info</h2>
          <input
            type="text"
            required
            className={styles.input}
            value={name}
            onChange={e => onNameChange(e.target.value)}
            placeholder="Garment Name"
          />
          <textarea
            className={styles.textarea}
            rows={2}
            value={description}
            onChange={e => onDescriptionChange(e.target.value)}
            placeholder="Description..."
          />
        </div>

        {/* Attributes Section */}
        <AttributesSection
          availableAttributes={availableAttributes}
          selectedAttrIds={selectedAttrIds}
          onToggleAttribute={onToggleAttribute}
        />

        {/* Materials Section */}
        <MaterialsSection
          materialSelections={materialSelections}
          availableMaterials={availableMaterials}
          onUpdateMaterial={onUpdateMaterial}
          onAddMaterial={onAddMaterial}
          onRemoveMaterial={onRemoveMaterial}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`${styles.submitButton} ${loading ? styles.submitDisabled : (editingId ? styles.submitUpdate : styles.submitCreate)}`}
        >
          {loading ? 'Processing...' : editingId ? 'Update Garment' : 'Create Garment'}
        </button>
      </form>
    </div>
  );
};
