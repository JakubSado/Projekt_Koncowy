var HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js", // bundle.js to wynik kompilacji projektu przez webpacka
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: "images/[hash]-[name].[ext]",
            },
          },
        ],
        test: /\.(png|jp(e*)g|svg)$/,
      },
    ],
  },
  devServer: {
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: "./index.html", //relative to root of the application
      title: "page title",
      template: "./src/index.html",
      h1: "h1",
      h2: "h2",
    }),
  ],
  mode: "development", // none, development, production
};
