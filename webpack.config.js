const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

function getStyleLoader (pre){
    return [
        // 'style-loader', // insert css to html by <script>
        MiniCssExtractPlugin.loader,
        'css-loader', // load and compile css into cjs module
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        [
                            "postcss-preset-env",
                            // "cssnano",
                            {
                                // Options
                            },
                        ],
                    ],
                },
            },
        },
        pre,
    ].filter(Boolean)
}

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "main.js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: getStyleLoader(),
            },
            // {
            //     test: /\.less$/,
            //     use: getStyleLoader('less-loader'),
            // },
            // {
            //     test: /\.s[ac]ss$/,
            //     use: getStyleLoader('sass-loader'),
            // },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024, // 8kb
                    },
                },
                generator: {
                    filename: 'static/images/[hash:10][ext][query]',
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                // options: {
                //     presets: ['@babel/preset-env'],
                // },
            }
        ],
    },
    plugins: [
        new ESLintPlugin({
            context: path.resolve(__dirname, 'src'),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash:10].css"
        }),
        new CssMinimizerPlugin(),
    ],
    mode: 'development',
    devServer: {},
}
