var path = require('path');

var devServer = new WebpackDevServer(webpack(webpackConfig), {
  contentBase: path.join(__dirname, 'public/assets'),
  historyApiFallback: true,
  hot: true,
  publicPath: '/assets/',
  progress: true,
  stats: {
    color: true,
    errorDetails: true
  }
});

devServer.listen(8080);
