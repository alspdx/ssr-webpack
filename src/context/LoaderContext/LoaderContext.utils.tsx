import { LoaderFunction, RouteComponentWithLoader } from 'react-router';

interface Loader<T = unknown> {
  name: string;
  dataLoader: LoaderFunction<T>;
}

export function getRouteLoaders(components: RouteComponentWithLoader[]) {
  return components.reduce<Loader[]>((loaders, component) => {
    if (component.dataLoader) {

      loaders.push({
        name: component.name,
        dataLoader: component.dataLoader,
      });
    }
    return loaders;
  }, []);
}

export async function loadRouteData(dataLoaders: Loader[]) {
  const data = await Promise.all(dataLoaders.map(async (c) => {
    return {
      name: c.name,
      data: await c.dataLoader(),
    };
  }));

  // should strenghten the typing here as we know more about the
  // routing architecture
  return data.reduce<Record<string, unknown>>((routeData, { name, data }) => {
    routeData[name] = data;
    return routeData;
  }, {});
}
