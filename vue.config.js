// module.exports = {
//     devServer: {
//       proxy: "http://localhost:8082/file-upload-api"
//     }
//   };
  

// vue.config.js
module.exports = {
  devServer: {
      port: 3000,
      proxy: {
          '/file-upload-api': {
              target: "http://localhost:8080",
              ws: true,
              changeOrigin: true
          }
      }
  }
}