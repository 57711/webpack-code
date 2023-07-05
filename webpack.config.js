const path = require('path')

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
                use: [
                    'style-loader', // insert css to html by <script>
                    'css-loader', // load and compile css into cjs module
                ],
            },
            // {
            //     test: /\.less$/,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         'less-loader',
            //     ],
            // },
            // {
            //     test: /\.s[ac]ss$/,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         'sass-loader',
            //     ],
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
            }
        ],
    },
    plugins: [],
    mode: 'development',
}
