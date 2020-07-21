const path = require("path");

module.exports = {
  target: "web",
  mode: "development",
  entry: "./src/client/index.js",
  output: {
    path: path.resolve(__dirname, "build/public"),
    filename: "client_build.js",
    publicPath: "/build/public",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
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
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: "file-loader",
        options: {
          name: "build/assets/[name].[ext]",
          publicPath: (url) => {
            url.replace("/build", "");
          },
        },
      },
    ],
  },
};
