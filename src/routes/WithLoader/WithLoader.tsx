import React from 'react';

import { useLoaderState } from 'context';
import { search } from 'services';
import { SearchResponse } from 'types';
import { sleep } from 'utils';

import styles from './WithLoader.module.css';

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
