const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 入口文件
    entry: [
        // 'babel-polyfill',
        'react-hot-loader/patch',
        './src/index.js',
    ],

    output: {
        // build输出文件路径
        path: path.resolve(__dirname, 'build'),
        // 打包后输出得文件名
        filename: 'bundle.js',
        // 热更新资源路径
        // after adding html-webpack-plugin, this should del
        publicPath: '/',
    },

    resolve: {
        alias: { _: path.resolve(__dirname, 'src') },
        extensions: ['.js', '.jsx'],
    },

    devtool: 'eval-source-map',

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                        },
                    },
                ],
            },

            {
                // 避免重复的想法
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            modules: true,
                            localIdentName: '[name]__[local]',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins() {
                                return [autoprefixer]
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },

            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        // 压缩bundle
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            title: 'react Quick Start',
            template: path.resolve(__dirname, 'index.tmpl.html'),
            favicon: path.resolve(__dirname, 'static/images/favicon.ico'),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],

    devServer: {
        port: 3300,
        hot: true,
        inline: true,
        // 静态资源路径（.html）
        // contentBase: './',
        publicPath: '/',
        historyApiFallback: true,
    },
}
