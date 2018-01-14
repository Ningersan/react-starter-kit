const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = {
    // 入口文件
    entry: "./src/index.js",

    output: {
        // build输出文件路径
        path: path.resolve(__dirname, 'build'),
        // 打包后输出得文件名
        filename: "bundle.js",
        // 热更新资源路径
        publicPath: "/",
    },
 
    //
    resolve: {
        alias: { _: path.resolve(__dirname, 'src') },
        extensions: ['.js', '.jsx'],
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                        }
                    },
                ]
            },

            {
                // 避免重复的想法
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true,
                            modules: true,
                            localIdentName: '[name]__[local]',
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins() {
                                return [autoprefixer]
                            },
                        }
                    }, 
                    {
                        loader: "sass-loader",
                    }
                ]
            },
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
    ],
}
