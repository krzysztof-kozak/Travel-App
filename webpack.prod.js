<<<<<<< HEAD
const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const WorkboxPlugin = require('workbox-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
=======
// const path = require('path')
// const webpack = require('webpack')
// const HtmlWebPackPlugin = require("html-webpack-plugin")
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// // const WorkboxPlugin = require('workbox-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
>>>>>>> 2008565fc6d50fa13ddc1507786c398c39c51d6f


// module.exports = {
//     mode: 'production',
//     entry: "./src/client/index.js",
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'main.js',

//     },
//     module: {
//         rules: [{
//                 test: /\.m?js$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: [
//                             ['@babel/preset-env', {
//                                 targets: "defaults",
//                                 exclude: ["@babel/plugin-transform-regenerator"]
//                             }]
//                         ]
//                     }
//                 }
//             },
//             {
//                 test: /\.s[ac]ss$/i,
//                 use: [
//                     // Creates `style` nodes from JS strings
//                     "style-loader",
//                     // Translates CSS into CommonJS
//                     "css-loader",
//                     // Compiles Sass to CSS
//                     "sass-loader",
//                 ],
//             }, {
//                 test: /\.s[ac]ss$/i,
//                 use: [MiniCssExtractPlugin.loader, 'css-loader', "sass-loader"],
//             },

<<<<<<< HEAD
    },
    plugins: [
        // new WorkboxPlugin.GenerateSW(),
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
    ],
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
=======
//         ]
>>>>>>> 2008565fc6d50fa13ddc1507786c398c39c51d6f

//     },
//     plugins: [
//         // new WorkboxPlugin.GenerateSW(),
//         new HtmlWebPackPlugin({
//             template: "./src/client/views/index.html",
//             filename: "./index.html",
//         }),
//         new MiniCssExtractPlugin({
//             filename: "[name].css"
//         }),
//     ],
//     optimization: {
//         minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
//     },

// }