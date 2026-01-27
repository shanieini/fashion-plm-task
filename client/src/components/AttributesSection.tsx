import type { AttributesSectionProps } from '../types';
import styles from '../styles/AttributesSection.module.css';

export const AttributesSection = ({
  availableAttributes,
  selectedAttrIds,
  onToggleAttribute
}: AttributesSectionProps) => {
  return (
    <div className={styles.formSection}>
      <h2 className={styles.sectionHeader}>Attributes</h2>
      <div className={styles.attributeGrid}>
        {availableAttributes.map(attr => (
          <label
            key={attr.id}
            className={`${styles.attributeItem} ${
               selectedAttrIds.includes(attr.id) ? styles.attributeSelected : ''
             }`}
           >
             <input
               type="checkbox"
               checked={selectedAttrIds.includes(attr.id)}
               onChange={() => onToggleAttribute(attr.id)}
               className={styles.checkbox}
            />
            <div>
               <span className={styles.name}>{attr.name}</span>
              <span className={styles.attributeCategory}> - {attr.category}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
