// node的标准export
module.exports = {
  // 入口文件
  entry: {
    main: './main.js'
  },
  // modules 打包规则
  module: {
    rules: [
      // js 文件需经过babel
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          // 配置babel-loader
          options: {
            presets: ['@babel/preset-env'],
            // 这样打包后的‘React.createElement就会变成‘ToyReact.createElement’
            plugins: [['@babel/plugin-transform-react-jsx', {pragma: 'ToyReact.createElement'}]]
          }
        }
      },
    ],
  },
  // 增加build后文件可读性，不压缩打包后文件
  mode: "development",
  optimization: {
    minimize: false
  }
}
