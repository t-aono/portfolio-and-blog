module.exports = {
  trailingSlash: true,
  devIndicators: {
    autoPrerender: false
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.WatchIgnorePlugin([[/\/content\//]]));
    return config;
  }
};
