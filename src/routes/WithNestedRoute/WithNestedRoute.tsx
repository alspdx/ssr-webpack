import React from 'react';

import { useLoaderState } from 'context/LoaderContext';

import styles from './WithNestedRoute.module.css';

export function WithNestedRoute(props: any) {
  const data = useLoaderState('WithNestedRoute');

  return (
    <div className={styles.withNestedRoute}>
      <span>{data?.message}</span>
      {props.children || 'no children provided'}
    </div>
  )
}
WithNestedRoute.dataLoader = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    message: `WithNestedRoute loaded on ${__RUNTIME_ENVIRONMENT__}`,
    data: await fetch('https://mobile-staging.gametime.co/v1/search?q=warriors').then(res => res.json()),
  };
}
