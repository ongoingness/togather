const path = require('path');
const webpack = require('webpack');


module.exports = {
    entry: "./webpack/entry.js",
    mode: 'development',
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, 'assets', 'scripts')
    },
      /*
    plugins: [
        new webpack.BannerPlugin("---\n---")
    ],
  
    module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: "babel-loader",
            query: {
              presets: ["@babel/preset-env"]
            }
          }
        ]
      }*/
};