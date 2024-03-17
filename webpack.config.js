// https://webpack.js.org/guides/typescript/
// npm install webpack webpack-cli typescript ts-loader --save-dev
module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ],
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      }
}