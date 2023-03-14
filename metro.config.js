const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      sourceExts: [...sourceExts, 'js'],
      assetExts: assetExts.filter((ext) => ext !== 'js' && ext !== 'json' && ext !== 'ts' && ext !== 'tsx'),
      extraNodeModules: {
        buffer: require.resolve('buffer'),
      },
    },
  };
})();