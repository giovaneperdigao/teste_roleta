
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, argv) => {
  return {
    stats: 'minimal', // Keep console output easy to read.
    entry: './src/main/resources/index.ts', // Your program entry point

    output: {
      path: path.resolve(__dirname, './target/classes/static'),
      filename: 'js/bundle.js'
    },

    // Config for your testing server
    devServer: {
      compress: true,
      allowedHosts: 'all', // If you are using WebpackDevServer as your production server, please fix this line!
      static: false,
      client: {
        logging: 'warn',
        overlay: {
          errors: true,
          warnings: false,
        },
        progress: true,
      },
      port: 1234,
      host: '0.0.0.0',
    },    

    // Web games are bigger than pages, disable the warnings that our game is too big.
    performance: { hints: false },

    // Enable sourcemaps while debugging
    devtool: argv.mode === 'development' ? 'eval-source-map' : undefined,

    // Minify the code when making a final build
    optimization: {
      minimize: argv.mode === 'production',
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: 6,
            compress: { drop_console: true },
            output: { comments: false, beautify: false },
          },
        }),
      ],
    },

    // Explain webpack how to do Typescript
    module: {
      rules: [
        {
          test: /\.ts(x)?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },

    plugins: [
      // Copy our static assets to the final build
      new CopyPlugin({
        patterns: [{ from: './src/main/resources/assets/' }],
      }),

      // Make an index.html from the template
      new HtmlWebpackPlugin({
        template: './src/main/resources/index.html',
        hash: true,
        minify: false,
      }),
    ],
  }
}
