const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  addBundleVisualizer,
  useBabelRc,
  adjustWorkbox,
  addWebpackPlugin,
} = require("customize-cra");
const zlib = require("zlib");
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//   const { addReactRefresh } = require('customize-cra-react-refresh');
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = override(
  // addReactRefresh(),
  // enable legacy decorators babel plugin
  addDecoratorsLegacy(),

  // disable eslint in webpack
  disableEsLint(),

  useBabelRc(),

  // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
  process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),

  // adjust the underlying workbox
  adjustWorkbox((wb) => {
    Object.assign(wb, {
      skipWaiting: true,
    });
  }),

  process.env.NODE_ENV === "production" &&
    addWebpackPlugin(
      new CompressionPlugin({
        algorithm: "brotliCompress",
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        minRatio: 0.8,
        deleteOriginalAssets: false,
      })
    ),

  (config) => {
    if (process.env.NODE_ENV === "production") {
      config.optimization = {
        minimizer: [
          new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
              map: {
                inline: false,
                annotation: true,
              },
            },
          }),
          new TerserPlugin({
            terserOptions: {
              parse: {
                // We want terser to parse ecma 8 code. However, we don't want it
                // to apply minification steps that turns valid ecma 5 code
                // into invalid ecma 5 code. This is why the `compress` and `output`
                ecma: 8,
              },
              compress: {
                ecma: 5,
                // warning: false,
                inline: 2,
              },
              mangle: {
                // Find work around for Safari 10+
                safari10: true,
              },
              output: {
                ecma: 5,
                comments: false,
                // ascii__only: true,
              },
            },
            // sourceMap: true,
            cache: true,
            parallel: true,
          }),
        ],
        minimize: true,
        namedModules: true,
        runtimeChunk: true, // <-- to avoid all hashes of generated file change every time a piece of code change in 1 file ... (and spare 4kb)
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 0,
          name: false,
          cacheGroups: {
            vendors: false,
            default: false,
            vendor: {
              chunks: "initial",
              test: /[\\/]node_modules[\\/]/,
              name: "vendor",
              reuseExistingChunk: true,
            },
          },
        },
        mergeDuplicateChunks: true,
      };
    }
    return config;
  }
);
