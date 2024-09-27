const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Основной JS-файл
  output: {
    filename: "bundle.js", // Название сборки
    path: path.resolve(__dirname, "dist"), // Папка для сборки
    clean: true, // Очищает папку dist при каждой сборке
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Обработка CSS файлов
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Ваш HTML шаблон
    }),
  ],
  devServer: {
    static: "./dist", // Папка для статических файлов
    port: 3000, // Порт сервера
    open: false, // Открывать браузер автоматически
  },
  mode: "development", // Режим разработки
};
