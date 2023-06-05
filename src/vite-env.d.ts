/// <reference types="vite/client" />
declare module 'axios';

declare module '*.json' {
  const value: any;
  export default value;
}

