const path = require("path");

module.exports = (env, argv) => {
  return {
    mode: argv.mode || "development", // default to development mode
    entry: "./src/index.js",
    output: {
      path: path.resolve(
        __dirname,
        argv.mode === "production" ? "build" : "public"
      ), // use build directory for production
      filename: "main.js",
      publicPath: "/",
    },
    target: "web",
    devServer: {
      port: "3000",
      static: "./public",
      open: true,
      hot: true,
      liveReload: true,
      historyApiFallback: true, // enables support for client-side routing
    },
    resolve: {
      extensions: [".js", ".jsx", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.css$/, // Add this rule to handle CSS files
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  };
};
