const path = require('path')
const os = require('os')
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const threads = os.cpus().length

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
                oneOf: [
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
                        test: /\.m?js$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: "thread-loader",
                                options: {
                                    workers: threads,
                                },
                            },
                            {
                                loader: 'babel-loader',
                                options: {
                                    // presets: ['@babel/preset-env'],
                                    cacheDirectory: true,
                                    cacheCompression: false,
                                },
                            }
                        ],
                    }
                ]
            }
        ],
    },
    plugins: [
        new ESLintPlugin({
            context: path.resolve(__dirname, 'src'),
            exclude: "node_modules",
            cache: true,
            // cacheLocation: path.resolve(__dirname, "node_modules/.cache/eslintcache")
            threads: threads,
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash:10].css"
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                parallel: threads,
            }),
        ],
    },
    mode: 'development',
    devServer: {
        port: 8088,
        open: true,
        hot: true,
    },
    devtool: 'eval-cheap-module-source-map'
}
