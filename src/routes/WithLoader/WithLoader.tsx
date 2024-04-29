import React from 'react';
import { useLoaderData, Outlet } from 'react-router-dom';

import { search } from 'services';
import { SearchResponse } from 'types';
import { sleep } from 'utils';

import styles from './WithLoader.module.css';

interface LoaderResult {
  message: string;
  data: SearchResponse;
}

export function WithLoader() {
  const data = useLoaderData() as LoaderResult | undefined;

  return (
    <div className={styles.withLoader}>
      <span>{data?.message}</span>
      <Outlet />
    </div>
  )
}
WithLoader.loader = async (): Promise<LoaderResult> => {
  await sleep();

  return {
    message: `WithLoader loaded on ${__RUNTIME_ENVIRONMENT__}`,
    data: await search('warriors'),
  };
}
