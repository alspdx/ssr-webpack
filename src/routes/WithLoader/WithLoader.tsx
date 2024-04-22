import React from 'react';
import { useLoaderData, Outlet } from 'react-router-dom';

import { search } from 'services/search';

import styles from './WithLoader.module.css';
import { SearchResponse } from 'types';
import { sleep } from 'utils';

interface LoaderResult {
  message: string;
  data: SearchResponse;
}

interface Props {
  children?: React.ReactNode;
}

export function WithLoader(props: Props) {
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
