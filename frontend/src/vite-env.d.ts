/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
