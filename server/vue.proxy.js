module.exports = {
    devServer: {
      proxy: {
        '/v1': {
          target: 'http://localhost:3000'
        },
        "/v2": {
          target: 'https://cacala-server.herokuapp.com',
        }
      }
    }
}