import React from 'react';

import { useLoaderState } from 'context';
import { search } from 'services';
import { SearchResponse } from 'types';
import { sleep } from 'utils';

import styles from './WithLoaderChild.module.css';

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
  await sleep();

  return {
    message: `WithLoaderChild loaded on ${__RUNTIME_ENVIRONMENT__}`,
    data: await search('seahawks'),
  };
};
