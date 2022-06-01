const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, "src", "web", "index.jsx"),
    output: { 
        path: path.join(__dirname, "dist") 
    },
    devtool: "source-map", // Removes eval() which causes CSP erros
    node: {
        global: false
    },
    devServer: {
        static: "dist",
        historyApiFallback: true,
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            include: path.resolve(__dirname, "src/web"),
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: [ "@babel/preset-react" ]
                }
            }
        },
        {
            test: /\.css$/,
            include: path.resolve(__dirname, "src/web"),
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "postcss-loader",
            ]
        }]
    },
    resolve: {
        extensions: ["", ".js", ".jsx"],
    },
    plugins: [
        new MiniCssExtractPlugin({ // Extracts css to the file ./dist/style.css
            filename: "style.css",
            chunkFilename: "styles.css",
        }),
        new HtmlWebPackPlugin({
            template: path.join(__dirname, "src", "web", "index.html")
        }),
        new webpack.DefinePlugin({
            process: {
                env: {
                    TARGET: JSON.stringify(process.env.TARGET),
                }
            }
        })
    ]
};
