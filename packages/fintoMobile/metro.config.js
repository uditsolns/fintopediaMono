const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultSourceExts =
  require('metro-config/src/defaults/defaults').sourceExts;
const defaultAssetExts =
  require('metro-config/src/defaults/defaults').assetExts;

const path = require('path');

// Find the project and workspace directories
const projectRoot = __dirname;
// This can be replaced with `find-yarn-workspace-root`
const monorepoRoot = path.resolve(projectRoot, '../..');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    extraNodeModules: {
      '@shared': path.resolve(monorepoRoot, 'shared'),
    },
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(monorepoRoot, 'node_modules/shared'),
    ],
    assetExts: defaultAssetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultSourceExts, 'svg', 'native.tsx', 'web.tsx'],
  },
  watchFolders: [
    path.resolve(monorepoRoot, 'node_modules'),
    path.resolve(monorepoRoot, 'node_modules/shared'),
  ],
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
