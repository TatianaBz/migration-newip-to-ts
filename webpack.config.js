const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EslingPlugin = require("eslint-webpack-plugin");

let mode = "development";
let target = "web";
if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}

const plugins = [
  new HtmlWebpackPlugin({
    template: "./src/index.html",
  }),
  new EslingPlugin({ extensions: "ts" }),
  new MiniCssExtractPlugin({
    filename: "./css/[name].css",
  }),
];

module.exports = {
  mode,
  plugins,
  target,
  entry: "./src/index.ts",
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".json", ".ts"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  devServer: {
    watchFiles: ["src/*.html"],
    //hot: "only",
    open: true,
  },

  module: {
    rules: [
      { test: /\.(html)$/, use: ["html-loader"] },
      { test: /\.ts$/i, use: "ts-loader" },
      {
        test: /\.(s[ac]|c)ss$/i, // /\.(le|c)ss$/i если вы используете less
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: mode === "production" ? "asset" : "asset/resource",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
};
