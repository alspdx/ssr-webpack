declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module "*.jpg" {
  const path: string;
  export default path;
}

declare module "*.png" {
  const path: string;
  export default path;
}

interface Hot {
  accept(path?: string, callback?: () => void): void;
}
interface NodeModule {
  hot?: Hot;
}

interface Window {
  __PRELOADED_STATE__: any;
}
declare const __RUNTIME_ENVIRONMENT__: 'server' | 'client';
declare const __PUBLIC_PATH_PREFIX__: string;
