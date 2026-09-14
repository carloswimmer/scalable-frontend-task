/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_GRAPHQL_BASE_URL?: string;
    REACT_APP_GRAPHQL_MOCK?: string;
  }
}

declare module "*.css"