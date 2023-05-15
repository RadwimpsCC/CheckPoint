<template>
	<view class="content">
		<block v-for="(item,key) in dt" :key="index">
			<view class="shijuanBox" @click="privewtp(key)">
				<image :src="item" mode="widthFix" class="shijuanImg" ></image>
				<view class="big">
					<image src="../../static/images/big.png" mode="widthFix" class="bigImg"></image>
				</view>
			</view>
		</block>



	</view>
</template>

<script>
	import yu from '../../yu.js';
	export default {
		data() {
			return {
				dt: ['https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/5a7f902b-21a7-4822-884f-925219eacc4b.png', 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/1ae87107-2943-4ba6-be2b-390ca27c6260.png' ]
			}
		},
		onLoad(op) {
			console.log(op);
			if(op){
				this.dt = [];
				let u = decodeURIComponent(op.id);
				if(u.indexOf(',') > -1){
					this.dt = u.split(',');
				}else{
					this.dt.push(u);
				}
			}
			//this.getmyinfo();
		},
		methods: {
			getmyinfo() {
				yu.dpost('getzzlist', (data) => {
					console.log(JSON.stringify(data));
					if (data.state == 1) {
						this.list = data.data.list;
					} else {
						yu.alert2(data.msg);
					}
				})
			},
			privewtp(index) {
				uni.previewImage({
					current:index,
					urls: this.dt,
					longPressActions: {
						itemList: ['保存图片'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}
		}
	}
</script>

<style>
	.content {
		padding: 40rpx;
		box-sizing: border-box;
	}

	.shijuanImg {
		width: 100%;
		border: 6rpx solid #f1f1f1;
	}

	.shijuanBox {
		position: relative;
		margin-bottom: 20rpx;
	}

	.big {
		position: absolute;
		right: 20rpx;
		bottom: 40rpx;
		width: 60rpx;
		height: 60rpx;
		border-radius: 100rpx;
		background: rgba(0, 0, 0, 0.25);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.bigImg {
		width: 45rpx;
		height: 45rpx;
	}
</style>
