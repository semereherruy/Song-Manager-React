const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    // Entry point - where Webpack starts bundling
    entry: './src/index.js',
    
    // Output configuration
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      publicPath: '/',
      clean: true, // Clean dist folder before each build
    },
    
    // Development server configuration
    devServer: {
      static: './dist',
      hot: true, // Enable hot module replacement
      port: 3000,
      open: true, // Open browser automatically
      historyApiFallback: true, // Handle React Router routes
    },
    
    // Module rules - how to process different file types
    module: {
      rules: [
        // JavaScript/JSX files
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    browsers: ['last 2 versions', 'not dead']
                  },
                  modules: false
                }],
                ['@babel/preset-react', {
                  runtime: 'automatic'
                }]
              ]
            }
          },
        },
        
        // Images and other assets
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        
        // Fonts
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    
    // Resolve extensions and aliases
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    
    // Plugins
    plugins: [
      // Generate HTML file with our bundle
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
      }),
    ],
    
    // Development tools
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    
    // Performance hints
    performance: {
      hints: isProduction ? 'warning' : false,
    },
    
    // Optimization settings
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
  };
}; 