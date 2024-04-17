import React from 'react';

import styles from './Spinner.module.css';

// shamelessly ripped off from somewhere online
export function Spinner() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
