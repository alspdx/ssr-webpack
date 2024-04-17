import React from 'react';

import { useLoaderState } from 'context/LoaderContext';

import styles from './WithNestedRouteChild.module.css';

export function WithNestedRouteChild() {
  const data = useLoaderState('WithNestedRouteChild');

  return (
    <div className={styles.withNestedRoute}>
      {data?.message}
    </div>
  )
}
WithNestedRouteChild.dataLoader = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    message: `WithNestedRouteChild loaded on ${__RUNTIME_ENVIRONMENT__}`,
    data: await fetch('https://mobile-staging.gametime.co/v1/search?q=seahawks').then(res => res.json()),
  };
};
