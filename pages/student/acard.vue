<template>
	<view>
		<web-view :src="url" :style="'width:'+bl+'%'"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://yue.2tt.net/pages/exam/summary/paper.aspx?id=70',
				bl: 100
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				console.log("放大");
				this.bl += 20;
			} else {
				console.log("缩小");
				this.bl -= 20;
			}

		},
		onLoad(op) {
			if (op.id != undefined) {

				this.url = 'https://yue.2tt.net' + decodeURIComponent(op.id);
				console.log(this.url);
			}

		},
		methods: {

		}
	}
</script>

<style>

</style>
