const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: './app.js',
    output: {
        filename: './build/app.js',
    },
    plugins: [
        new CleanWebpackPlugin(['build'], {
            verbose: true,
            watch: false
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: true,
                    failOnHint: true
                }
            }
        }),
        new ExtractTextPlugin({
            filename: './build/style.css'
        }),
        new CopyWebpackPlugin([{
            from: './src/index.html',
            to: './build/index.html'
            }])
    ],
    resolve: {
        extensions: [' ', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                loader: 'tslint-loader',
                exclude: /(node_modules)/,
                options: {
                    configuration: {
                        rules: {
                            quotemark: [true, 'double']
                        }
                    }
                }
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader'
                    },
            {
                enforce: 'pre',
                test: /\.scss$/,
                loader: 'scsslint-hot-loader'
                    },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
                    },

                    ]

    }
}
