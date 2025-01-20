/// <reference types="@electron-forge/plugin-vite/forge-vite-env" />

interface ImportMetaEnv {
  readonly VITE_APPLE_API_KEY_PATH: string;
  readonly VITE_APPLE_API_KEY_ID: string;
  readonly VITE_APPLE_API_ISSUER: string;
  readonly VITE_APPLE_APPSIGN_IDENTITY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
