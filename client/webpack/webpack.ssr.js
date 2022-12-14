import path from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const buildDirectory = '../dist/ssr/'

export default {
    mode: 'production',
    target: 'web',
    entry: path.resolve(__dirname, '../src/ssr.tsx'),
    output: {
        publicPath: '',
        globalObject: 'this',
        path: path.resolve(__dirname, buildDirectory),
        // render_to_string entry point name!!
        library: 'SSR',
        libraryTarget: 'var',
        filename: 'index.js',
    },
    resolve: {
        fallback: { fs: false, path: false },
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                test: /\.(png|jp(e*)g|svg|gif|webp)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '/',
                            name: 'images/[hash]-[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './styles/ssr.css',
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                path.join(__dirname, buildDirectory),
            ],
        }),
    ],
}
