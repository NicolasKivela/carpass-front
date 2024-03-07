module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['react-native-paper/babel'],
    [
      'react-native-reanimated/plugin',
      {
        processNestedWorklets: true,
        globals: ['__scanOCR'],
      },
    ],
    ['react-native-worklets-core/plugin'],
  ],
  env: {
    production: {
      plugins: [
        ['react-native-paper/babel'],
        [
          'react-native-reanimated/plugin',
          {
            processNestedWorklets: true,
            globals: ['__scanOCR'],
          },
        ],
        ['react-native-worklets-core/plugin'],
      ],
    },
  },
};
