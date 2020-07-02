module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: ['awesome-typescript-loader'],
  });

  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    enforce: 'pre',
    loaders: [
      {
        loader: '@storybook/source-loader',
        options: { parser: 'typescript' },
      },
    ],
  });
  config.module.rules.push({
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'less-loader'],
  });

  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
