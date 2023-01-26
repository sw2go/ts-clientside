const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { env } = require("process");

module.exports = {
  devtool: env.production ? "none" : "source-map",
  entry: { 
    main: "./src/index.ts", 
    // chunkxy: "./src/about.ts" 
  },
  output: {
    path: path.resolve(__dirname, "wwwroot"),
    filename: "[name].[chunkhash].js",
    publicPath: "./",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      { // this loader only required when using CopyPlugin
        test: /\.(png|jpg|gif)$/,   
        type: 'asset/resource'
      }    
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: [ "main" ],           // entries to inject, when omitted => 'all'  
      template: "./src/index.html",
      filename: "index.html"
    }),
    // new HtmlWebpackPlugin({
    //   chunks: [ "chunkxy"],  
    //   template: "./src/about.html",
    //   filename: "about.html"
    // }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[chunkhash].css",
    }),
    new CopyPlugin({                // to copy existing resources to dist
      patterns: [
        { from: "src/assets/*.*" , to: "assets/[name][ext]" },
      ],
    }),
  ],
};