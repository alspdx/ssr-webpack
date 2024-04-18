import * as ReactRouter from 'react-router';

declare module 'react-router' {
  import { ComponentType } from 'react';
  import { Location, PlainRoute } from 'history';

  interface LoaderFunction<T = unknown> {
    (): Promise<T>;
  }

  export type RouteComponentWithLoader<P = unknown> = ComponentType<P> & {
    dataLoader?: LoaderFunction;
  };

  export interface RouterState<Q = unknown> {
    location: Location<Q>;
    routes: PlainRoute[];
    params: { [key: string]: string };
    components: RouteComponentWithLoader[];
  }
}
