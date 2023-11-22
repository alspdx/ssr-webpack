import React from 'react';

import styles from './WithModule.module.css';

export default function WithModule() {
  return (
    <div className={styles.container}>
      <h1>With module...</h1>
    </div>
  );
}
