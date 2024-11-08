<template>
	<div>
		<div id="mui-video"></div>
	</div>
</template>

<script>
	import 'mui-player/dist/mui-player.min.css'
	import MuiPlayer from 'mui-player'
	import Hls from 'hls.js'
	import Flv from 'flv.js'

	export default {
		name: "xp-muiplayer",
		props: {
			// 播放标题
			title: {
				type: String,
				default: ''
			},
			// 播放地址
			src: {
				type: String,
				default: ''
			},
			// 播放格式
			type: {
				type: String,
				default: 'mp4'
			},
			// 自动播放
			autoplay: {
				type: Boolean,
				default: true
			},
			// 循环播放
			loop: {
				type: Boolean,
				default: true
			},
			// 静音播放
			muted: {
				type: Boolean,
				default: false
			},
			// 播放器容器是否自适应视频高度
			autoFit: {
				type: Boolean,
				default: false
			},
			// 直播模式
			live: {
				type: Boolean,
				default: false
			},
			// 封面地址
			poster: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				mui_video: null,
				parse: {}
			};
		},
		watch: {
			// 播放地址变化
			src(newVal, oldVal) {
				// console.log(newVal, oldVal)
				if (this.mui_video != null) {
					this.mui_video.src = newVal
					this.mui_video.reloadUrl(newVal)
				}
			},
			// 播放格式变化
			type(newVal, oldVal) {
				// console.log(newVal, oldVal)
				
				if(newVal == 'mp4') {
					this.parse = {}
				}
				
				if(newVal == 'm3u8') {
					this.parse = {
						type: 'hls',
						loader: Hls,
						config: {
							 // hls config to：https://github.com/video-dev/hls.js/blob/HEAD/docs/API.md#fine-tuning
							debug: false,
						},
					}
				}
				
				if(newVal == 'flv') {
					this.parse = {
						type: 'flv',
						loader: Flv,
						config: { 
							// hls config to：https://github.com/video-dev/hls.js/blob/HEAD/docs/API.md#fine-tuning
							debug: false,
						},
					}
				}
				// 重置播放器
				this.init()
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.mui_video = new MuiPlayer({
					container: '#mui-video',
					title: this.title,
					// 设置个默认地址 否则会弹出视频为空
					src: 'https://pili-live-hdl.pengfkt.com/pfkt/16993.flv',
					autoplay: this.autoplay,
					autoFit: this.autoFit,
					loop: this.loop,
					muted: this.muted,
					live: this.live,
					poster: this.poster,
					height: '220px',
					parse: this.parse
				})
			}
		}
	}
</script>

<style>

</style>