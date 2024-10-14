module.exports = {
  presets: ['module:@react-native/babel-preset'],
  
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@src': './src',
          '@shared': '../shared',
        },
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.tsx',
          '.json',
          '.native.tsx',
          '.web.tsx',
        ],
      },
    ],
  ],
};
