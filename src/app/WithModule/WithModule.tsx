import React from 'react';

import styles from './WithModule.module.css';

export default function WithModule() {
  return (
    <div className={styles.container}>
      <h1>With CSS modules...</h1>
      <span className={styles.whatever}>Or whatever...</span>
    </div>
  );
}
