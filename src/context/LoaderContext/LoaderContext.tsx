import React, { useEffect, useRef, useState } from 'react';
import { RouterContext, RouterState } from 'react-router';

import { Spinner } from 'components/Spinner/Spinner';

import { getRouteLoaders, loadRouteData } from './LoaderContext.utils';

const LoaderContext = React.createContext(undefined);

interface RouterProps {
  location: RouterState['location'];
  params: RouterState['params'];
  components: RouterState['components'];
  routes: RouterState['routes'];
}

interface LoaderContextProviderProps {
  routerProps: RouterProps;
  preloadedState: any;
}

export function LoaderContextProvider({ routerProps, preloadedState = {} }: LoaderContextProviderProps) {
  const [currentRouterProps, setCurrentRouterProps] = useState(routerProps);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState(preloadedState); // key by component name, value is data from loader

  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      return;
    }

    const loaders = getRouteLoaders(routerProps.components);

    if (loaders.length > 0) {
      setIsLoading(true);
      loadRouteData(loaders).then((data) => {
        setState(data);
        setCurrentRouterProps(routerProps);
        setIsLoading(false);
      });
    } else {
      setCurrentRouterProps(routerProps);
    }
  }, [routerProps])

  return (
    <>
      {isLoading && <Spinner />}
      <LoaderContext.Provider value={state}>
        <RouterContext {...currentRouterProps} />
      </LoaderContext.Provider>
    </>
  );
}

export function useLoaderState<T = unknown>(componentName: string) {
  const context = React.useContext(LoaderContext);

  if (!context) {
    throw new Error('useLoaderState must be used within a LoaderContextProvider');
  }

  return context[componentName] as T;
}
