
import type { GarmentCardProps } from '../types';
import styles from '../styles/GarmentCard.module.css';

export const GarmentCard = ({
  garment,
  isEditing,
  onEdit,
  onCreateVariation,
  onPromote,
  onDelete
}: GarmentCardProps) => {
  return (
    <div
      className={`${styles.garmentCard} ${isEditing ? styles.garmentCardEditing : ''}`}
    >
      <div className={styles.garmentHeader}>
        <div>
          <span className={styles.garmentId}>#{garment.id}</span>
          <h3 className={styles.garmentName}>
            {garment.name}
          </h3>
        </div>
        <span
          className={`${styles.statusBadge} ${
            garment.lifecycleState === 'Mass_Production'
              ? styles.statusProduction
              : styles.statusConcept
          }`}
        >
          {garment.lifecycleState.replace('_', ' ')}
        </span>
      </div>

      <div className={styles.garmentDetails}>
        <p>
          <strong>Attrs: </strong>
          {garment.attributes.map(a => a.attribute.name).join(', ')}
        </p>
        <p>
          <strong>Materials: </strong>
          {garment.materials.map(m => `${m.material.name} (${m.percentage}%)`).join(', ')}
        </p>
      </div>

      <div className={styles.buttonContainer}>
        {garment.lifecycleState !== 'Mass_Production' && (
          <button
            onClick={() => onEdit(garment)}
            className={styles.editBtn}
          >
            ✎ Edit
          </button>
        )}

        <button
          onClick={() => onCreateVariation(garment.id)}
          title="Clone to new version"
          className={styles.cloneBtn}
        >
          Samples / Clone
        </button>

        {garment.lifecycleState === 'Concept' && (
          <button
            onClick={() => onPromote(garment.id)}
            className={styles.promoteBtn}
          >
            🚀 Start
          </button>
        )}

        <button onClick={() => onDelete(garment.id)} className={styles.deleteBtn}>
          Delete
        </button>
      </div>
    </div>
  );
};
