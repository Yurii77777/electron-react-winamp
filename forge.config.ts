import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { VitePlugin } from '@electron-forge/plugin-vite';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import path from 'path';
import 'dotenv/config';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    icon: 'src/renderer/assets/appIcons/icon',
    osxSign: {
      optionsForFile: () => ({
        entitlements: path.resolve(
          __dirname,
          'src/renderer/assets/entitlements.plist',
        ),
        'entitlements-inherit': path.resolve(
          __dirname,
          'src/renderer/assets/entitlements.plist',
        ),
      }),
      identity: process.env.VITE_APPLE_APPSIGN_IDENTITY,
    },
    osxNotarize: {
      appleApiKey: process.env.VITE_APPLE_API_KEY_PATH,
      appleApiKeyId: process.env.VITE_APPLE_API_KEY_ID,
      appleApiIssuer: process.env.VITE_APPLE_API_ISSUER,
    },
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({}),
    {
      name: '@electron-forge/maker-dmg',
      config: {
        name: 'Winamp',
        format: 'ULFO',
        icon: 'src/renderer/assets/appIcons/icon.icns',
        overwrite: true,
      },
    },
  ],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: 'src/main/main.ts',
          config: 'vite.main.config.ts',
          target: 'main',
        },
        {
          entry: 'src/main/preload.ts',
          config: 'vite.preload.config.ts',
          target: 'preload',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.ts',
        },
      ],
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
