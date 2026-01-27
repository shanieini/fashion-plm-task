
import type { AlertMessagesProps } from '../types';
import styles from '../styles/AlertMessages.module.css';

export const AlertMessages = ({ error, successMsg }: AlertMessagesProps) => {
  return (
    <div className={styles.wrapper}>
      {error && (
        <div className={`${styles.alert} ${styles.errorAlert}`}>
          <p className={styles.alertTitle}>Error</p>
          <p>{error}</p>
        </div>
      )}
      {successMsg && (
        <div className={`${styles.alert} ${styles.successAlert}`}>
          <p className={styles.alertTitle}>Success</p>
          <p>{successMsg}</p>
        </div>
      )}
    </div>
  );
};
