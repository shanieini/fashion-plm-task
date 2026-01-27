
import type { GarmentDashboardProps } from '../types';
import styles from '../styles/GarmentDashboard.module.css';
import { GarmentCard } from './GarmentCard';

export const GarmentDashboard = ({
  garments,
  editingId,
  onEdit,
  onCreateVariation,
  onPromote,
  onDelete
}: GarmentDashboardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Existing Garments ({garments.length})</p>
      </div>

      <div className={styles.listContainer}>
        {garments.length === 0 && (
          <p className={styles.emptyMessage}>
            No garments yet.
          </p>
        )}

        {garments.map(garment => (
          <GarmentCard
            key={garment.id}
            garment={garment}
            isEditing={editingId === garment.id}
            onEdit={onEdit}
            onCreateVariation={onCreateVariation}
            onPromote={onPromote}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};
