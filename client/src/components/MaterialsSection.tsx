
import type { MaterialsSectionProps } from '../types';
import styles from '../styles/MaterialsSection.module.css';

export const MaterialsSection = ({
  materialSelections,
  availableMaterials,
  onUpdateMaterial,
  onAddMaterial,
  onRemoveMaterial
}: MaterialsSectionProps) => {
  const totalPercentage = materialSelections.reduce((sum, m) => sum + m.percentage, 0);

  return (
    <div className={styles.formSection}>
      <div className={styles.sectionHeaderWrapper}>
        <h2 className={styles.sectionHeader}>
          Materials
        </h2>
        <button type="button" onClick={onAddMaterial} className={styles.addButton}>
          + Add
        </button>
      </div>
      <div className={styles.materialsContainer}>
        {materialSelections.map((sel, index) => (
          <div key={index} className={styles.materialRow}>
            <div className={styles.materialInputWrapper}>
              <select
                className={styles.select}
                value={sel.materialId}
                onChange={e => onUpdateMaterial(index, 'materialId', Number(e.target.value))}
              >
                {availableMaterials.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.percentageWrapper}>
              <input
                type="number"
                min="0"
                max="100"
                className={styles.input}
                value={sel.percentage}
                onChange={e => onUpdateMaterial(index, 'percentage', Number(e.target.value))}
              />
              <span>%</span>
            </div>
            {materialSelections.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveMaterial(index)}
                className={styles.removeButton}
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <div className={styles.totalWrapper}>
          Total: {totalPercentage}%
        </div>
      </div>
    </div>
  );
};
