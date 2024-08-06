const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
        publicPath: ''
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),  /* путь, куда "смотрит" режим разработчика */
    compress: true,  /* это ускорит загрузку в режиме разработки */
    port: 8080,  /* порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт */
    open: true  /* сайт будет открываться сам при запуске npm run dev */
  },
  module: {
    rules: [{ /* добавили правило для обработки файлов */
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/, /* регулярное выражение, которое ищет все файлы с такими расширениями */
        type: 'asset/resource'
      },
      {
        test: /\.css$/, /* применять это правило только к CSS-файлам */
        use: [MiniCssExtractPlugin.loader, {  /* при обработке этих файлов нужно использовать MiniCssExtractPlugin.loader и css-loader */
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
          'postcss-loader']
      }
    ] 
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ] 
}; 