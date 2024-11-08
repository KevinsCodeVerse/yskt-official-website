const {
	defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
	publicPath: "/",
	outputDir: "youskt_gw",
	transpileDependencies: true,
	devServer: {
		port: "3000",
		https: false,
		proxy: {
			'/apiV2': {
				// target: 'http://www.pengfkt.com/apiV2/',
				target: 'https://youskt.cn/apiV2/',
				// target: 'http://ccea5i.natappfree.cc',
				changeOrigin: true,
				ws: false,
				pathRewrite: {
					'^/apiV2': ''
				}
			}
		},
		client: {
			overlay: false
		}
	}
})
