
import type { PromoteModalProps } from '../types';
import styles from '../styles/PromoteModal.module.css';

export const PromoteModal = ({
  isOpen,
  suppliers,
  selectedSupplierId,
  loading,
  onSupplierChange,
  onConfirm,
  onClose
}: PromoteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.sectionHeader}>Select Supplier</h2>
        <p className={styles.subtitle}>Who will produce this garment?</p>

        <div>
          <label className={styles.label}>Choose Supplier:</label>
          <select
            className={styles.select}
            value={selectedSupplierId}
            onChange={e => onSupplierChange(e.target.value)}
          >
            <option value="">-- Select --</option>
            {suppliers.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.country})
              </option>
            ))}
          </select>
        </div>

        <div className={styles.modalButtons}>
          <button onClick={onClose} className={styles.cancelButton} disabled={loading}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={styles.confirmButton}
            disabled={loading || !selectedSupplierId}
          >
            {loading ? 'Processing...' : 'Start Production'}
          </button>
        </div>
      </div>
    </div>
  );
};
