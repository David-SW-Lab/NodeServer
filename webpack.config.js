const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const sourcePath = path.resolve(__dirname, "./src");

module.exports = env => ({
  mode: "development",
  entry: path.join(sourcePath, "server.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js"
  },
  module: {
    rules: [
      {
        include: sourcePath,
        exclude: ["/node_modules"],
        loader: "babel-loader"
      }
    ]
  },
  target: "node",
  resolve: {
    modules: [sourcePath, "node_modules"],
    // alias: {
    //   duckScript: path.resolve(__dirname, "src", "duck", env.PLATFORM)
    // },
    extensions: [".json", ".js"]
  },
  devServer: {
    port: 8081
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Index Title",
      hash: true,
      filename: "index.html",
      template: "./html/index.html"
    }),
    new HtmlWebpackPlugin({
      title: "Multiple Title",
      hash: true,
      filename: "write.html",
      template: "./html/write.html"
    })
  ],
  devtool: "source-map"
});
