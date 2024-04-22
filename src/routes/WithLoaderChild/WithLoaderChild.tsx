import React from 'react';
import { useLoaderData } from 'react-router-dom';

import { search } from 'services/search';

import styles from './WithLoaderChild.module.css';
import { SearchResponse } from 'types';
import { sleep } from 'utils';

interface LoaderResult {
  message: string;
  data: SearchResponse;
}

export function WithLoaderChild() {
  const data = useLoaderData() as LoaderResult | undefined;

  return (
    <div className={styles.withLoaderChild}>
      {data?.message}
    </div>
  )
}
WithLoaderChild.loader = async (): Promise<LoaderResult> => {
  await sleep();

  return {
    message: `WithLoaderChild loaded on ${__RUNTIME_ENVIRONMENT__}`,
    data: await search('seahawks'),
  };
};
