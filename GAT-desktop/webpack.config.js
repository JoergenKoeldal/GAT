const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, "src", "web", "index.js"),
    output: { 
        path: path.join(__dirname, "dist") 
    },
    devtool: "source-map", // Removes eval() which causes CSP erros
    node: {
        global: false
    },
    module: {
        rules: [{
            test: /\.js$/,
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
            use: ["style-loader", "css-loader"]
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.join(__dirname, "src", "web", "index.html")
        })
    ]
};
