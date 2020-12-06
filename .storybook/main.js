module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  babel: async (config) => ({
    ...config,
    presets: [...config.presets, '@emotion/babel-preset-css-prop'],
  }),
};
