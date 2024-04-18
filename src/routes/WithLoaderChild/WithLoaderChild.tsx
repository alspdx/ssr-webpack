import React from 'react';

import { useLoaderState } from 'context/LoaderContext/LoaderContext';
import { search } from 'services/search';

import styles from './WithLoaderChild.module.css';
import { SearchResponse } from 'types';

interface LoaderResult {
  message: string;
  data: SearchResponse;
}

export function WithLoaderChild() {
  const data = useLoaderState<LoaderResult>(WithLoaderChild.name);

  return (
    <div className={styles.withLoaderChild}>
      {data?.message}
    </div>
  )
}
WithLoaderChild.dataLoader = async (): Promise<LoaderResult> => {
  return {
    message: `WithLoaderChild loaded on ${__RUNTIME_ENVIRONMENT__}`,
    data: await search('seahawks'),
  };
};
