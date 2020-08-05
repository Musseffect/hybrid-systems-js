const path = require('path');

module.exports = {
  entry:'./src/index.ts',
  devtool: 'source-map',
  optimization: {
    minimize: true
  },
  node: { module: "empty", net: "empty", fs: "empty" },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
      extensions: [".ts", ".tsx",".js"]
  },
  ignored: /node_modules/,
  module: {
    rules: [
        {
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "ts-loader"
                }
            ]
        },
        {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader"
        }  
    ]
}
};
