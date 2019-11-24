module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://music.niracler.com:8001', //API服务器的地址
                ws: true,
                changeOrigin: true,
                pathRewrite: { 
                    '^/api': ''
                }
            }
        }
    }
}