const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node",
  mode: "development",
  entry: "./src/server/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "server_bundle.js",
    publicPath: "/build",
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: "file-loader",
        options: {
          name: "build/assets/[name].[ext]",
          publicPath: (url) => url.replace("/build", ""),
          emit: false,
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  esmodules: true,
                },
              },
            ],
            "@babel/preset-react",
          ],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  externals: [nodeExternals()],
};
