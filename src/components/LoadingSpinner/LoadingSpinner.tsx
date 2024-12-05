import React from 'react';
import styles from './Loading.module.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default LoadingSpinner;
