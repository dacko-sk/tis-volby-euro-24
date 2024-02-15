const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const { homepage } = require('./package.json');
const appManifest = require('./public/manifest.json');

// read .env file
const envLocal = dotenv.config({ path: './.env' }).parsed || {};
// collect all .env keys and values
const envKeys = Object.keys(envLocal).reduce((prev, next) => {
    prev[`process.env.${next.trim()}`] = JSON.stringify(envLocal[next].trim());
    return prev;
}, {});

module.exports = (env, argv) => {
    const isEnvProduction = argv.mode === 'production';
    const rootPath = homepage && isEnvProduction ? homepage : '/';

    const plugins = [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            favicon: 'public/img/logo.svg',
            isEnvProduction,
            rootPath,
            description: appManifest.name,
            title: appManifest.short_name,
            language: 'sk',
            GTM_ID: 'GTM-5Z6SFDZ',
        }),
        new WebpackManifestPlugin({
            fileName: 'asset-manifest.json',
            publicPath: homepage,
            generate: (seed, files, entrypoints) => {
                const manifestFiles = files.reduce((manifest, file) => {
                    const m = manifest;
                    m[file.name] = file.path;
                    return m;
                }, seed);
                const entrypointFiles = entrypoints.main.filter(
                    (fileName) => !fileName.endsWith('.map')
                );

                return {
                    files: manifestFiles,
                    entrypoints: entrypointFiles,
                };
            },
        }),
        new webpack.DefinePlugin(envKeys),
    ];
    if (isEnvProduction) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'static/css/[name].[contenthash:8].css',
                chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
            })
        );
    }

    return {
        devtool: 'source-map',
        devServer: {
            historyApiFallback: {
                disableDotRule: true,
            },
            hot: true,
            open: [homepage],
            port: 3000,
        },
        entry: './src/index.jsx',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react'],
                        },
                    },
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        // Creates `style` nodes from JS strings
                        isEnvProduction
                            ? MiniCssExtractPlugin.loader
                            : 'style-loader',
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        'sass-loader',
                    ],
                },
                {
                    test: /\.svg$/i,
                    type: 'asset',
                    resourceQuery: /url/, // *.svg?url
                },
                {
                    test: /\.svg$/i,
                    issuer: /\.[jt]sx?$/,
                    resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
                    use: ['@svgr/webpack'],
                },
                {
                    test: /\.(jpe?g|gif|png)$/i,
                    type: 'asset',
                },
                {
                    test: /\.csv$/i,
                    type: 'asset/resource',
                },
            ],
        },
        output: {
            clean: true,
            path: path.join(__dirname, '/build'),
            pathinfo: !isEnvProduction,
            publicPath: rootPath,
            filename: isEnvProduction
                ? 'static/js/[name].[contenthash:8].js'
                : 'static/js/bundle.js',
            chunkFilename: isEnvProduction
                ? 'static/js/[name].[contenthash:8].chunk.js'
                : 'static/js/[name].chunk.js',
            assetModuleFilename: 'static/assets/[name].[hash][ext]',
        },
        plugins,
        resolve: {
            extensions: ['.js', '.jsx'],
        },
    };
};
