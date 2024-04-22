import React from 'react';

import { useLoaderState } from 'context/LoaderContext/LoaderContext';
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
  const data = useLoaderState<LoaderResult>(WithLoader.name);

  return (
    <div className={styles.withLoader}>
      <span>{data?.message}</span>
      {props.children || 'no children provided'}
    </div>
  )
}
WithLoader.dataLoader = async (): Promise<LoaderResult> => {
  await sleep();

  return {
    message: `WithLoader loaded on ${__RUNTIME_ENVIRONMENT__}`,
    data: await search('warriors'),
  };
}
