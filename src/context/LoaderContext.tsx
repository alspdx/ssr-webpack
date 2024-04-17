import React, { useEffect, useRef, useState } from 'react';

import { RouterContext, RouterState } from 'react-router';

import { Spinner } from '../components/Spinner/Spinner';

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

export function getRouteLoaders(components: any[]) {
  return components.reduce((loaders, component) => {
    if (component.dataLoader) {
      loaders.push({
        name: component.name,
        dataLoader: component.dataLoader,
      });
    }
    return loaders;
  }, []);
}

export async function loadRouteData(dataLoaders: any[]): Promise<any> {
  return Promise.all(dataLoaders.map(async (c) => {
    return {
      name: c.name,
      data: await c.dataLoader(),
    };
  })).then((data) => data.reduce((acc, { name, data }) => {
    acc[name] = data;
    return acc;
  }, {} as any));
}

export function LoaderContextProvider({ routerProps, preloadedState = {} }: LoaderContextProviderProps) {
  const [currentRouterProps, setCurrentRouterProps] = useState(routerProps);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState(preloadedState);

  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    const loaders = getRouteLoaders(routerProps.components);

    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      return;
    }

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
      {isLoading &&
        <Spinner />
      }
      <LoaderContext.Provider value={state}>
        <RouterContext {...currentRouterProps} />
      </LoaderContext.Provider>
    </>
  );
}

export function useLoaderState(componentName: string): any {
  const context = React.useContext(LoaderContext);

  if (!context) {
    throw new Error('useLoaderState must be used within a LoaderContextProvider');
  }

  return context[componentName];
}
