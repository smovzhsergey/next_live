const withPlugins = require('next-compose-plugins');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanCss = require('clean-css');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});


module.exports = withPlugins(
    [
        [withBundleAnalyzer, {}]
    ],
    {
        webpack: (config, { isServer }) => {

            const isProduction = process.env.NODE_ENV === 'production';

            if (isProduction) {
                config.optimization.minimizer.push(
                    new OptimizeCssAssetsPlugin({
                        assetNameRegExp: /\.css$/g,
                        cssProcessor: CleanCss,
                        cssProcessorOptions: {
                            level: {
                                1: {
                                    all: true,
                                    normalizeUrls: false,
                                },
                                2: {
                                    restructureRules: true,
                                    removeUnusedAtRules: true,
                                    skipProperties: [],
                                },
                            },
                        },
                        canPrint: true,
                    }),
                );
            }

            if (!isServer) {
                return {
                    ...config,
                    node: {
                        fs: 'empty'
                    }
                }
            }

            return config;
        },
        publicRuntimeConfig: {
            JAVA_SCRIPT_LOADING_DELAY: 3500,
            ANDROID_VERSION_FOR_DELAY: 8,
            IOS_VERSION_FOR_DELAY: 12.5,
        }
        
    }
);
