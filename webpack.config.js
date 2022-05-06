const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const buildPath = path.resolve(__dirname, "dist");

module.exports = {

    mode: "production",
    devtool: "source-map",

    entry: {
        bundle: "./public/index.js"
    },

    output: {
        filename: "[name].js",
        path: buildPath
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.mp3$/,
                use: "file-loader"
            },
            {
                test: /\.wav$/,
                use: 'file-loader'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            inject: "body",
            chunks: ["bundle"],
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            linkType: "text/css",
            chunkFilename: "[id].[contenthash].css"
        })
    ],

    externals: ["ws"]
};