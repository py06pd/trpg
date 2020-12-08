const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const devBuild = process.env.NODE_ENV !== 'production';

const cssLoader = {
    loader: 'css-loader',
    options: { sourceMap: true },
};

const postCssLoader = {
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        plugins: [
            require('cssnano')({ preset: 'default' }),
        ],
        minimize: true,
    },
};

const config = {
    entry: {
        main: './app.js',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../public/editor'),
        publicPath: '',
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '.'),
        },
        extensions: ['*', '.js', '.vue', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, cssLoader, postCssLoader],
            },

            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, cssLoader, 'sass-loader', postCssLoader],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                options: {
                    name: 'css/images/[name].[hash].[ext]',
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'css/images/[name].[hash].[ext]',
                            limit: 9000,
                            esModule: false,
                        },
                    },
                ],
            },
            {
                test: /\.(js|vue)$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                exclude: /node_modules/,
                options: {
                    emitWarning: true,
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['../public/editor/js', '../public/editor/*.css', '../public/editor/*.css.map'], {
            // allow folders outside of the project root (app-js) to be purged
            allowExternal: true,
            watch: true,
        }),
        new ManifestPlugin({ basePath : '' }),
        new MiniCssExtractPlugin({
            // TODO: Moving this to a css folder breaks the references to our images
            filename: '[name].css',
        }),
        new CircularDependencyPlugin({
            // Exclude detection of files based on a RegExp
            exclude: /node_modules/,
            // Add warnings instead of errors
            failOnError: false,
            // Disallow cycles that include an asynchronous import since we're not using them
            allowAsyncCycles: false,
            // Set the current working directory for displaying module paths
            cwd: process.cwd(),
        }),
        new VueLoaderPlugin(),
    ],
};

if (devBuild) {
    console.log('Webpack dev build');
    config.mode = 'development';
} else {
    console.log('Webpack production build');
    config.mode = 'production';

    // Set the NODE_ENV variable so that vue.js also performs a production build
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
    );
}

module.exports = config;
