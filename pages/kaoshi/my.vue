<template>
	<view class="content">
		<view class="bg">
			<image src="../../static/images/mybg.png" mode="widthFix" class="mybg"></image>
		</view>
		<view class="info flex flex-column justify-content-c flex-center">
			<image src="../../static/images/touxiang.png" class="touxiang"></image>
			<text class="infoName"> </text>
			<text class="infoTel">{{mytel}}</text>
		</view>

		<text class="tuichu" @click="tc">退出登录</text>
	</view>
</template>

<script>
	import yu from '../../yu.js';
	export default {
		data() {
			return {
				mytel: uni.getStorageSync("tel"),
				list: [],
			}
		},
		onLoad() {

		},
		methods: {
			tc() {
				uni.setStorageSync("pwd", "");
				uni.setStorageSync("ver", "");
				uni.setStorageSync("token", "");
				uni.reLaunch({
					url: '../login/login'
				})

			}
		}
	}
</script>

<style>
	page {
		background-color: #F4F4F4;
	}

	.bg {
		width: 100%;
	}

	.mybg {
		width: 100%;
		max-height: 400rpx;
	}

	.info {
		margin-top: -120rpx;
	}

	.touxiang {
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 10rpx 15rpx rgba(0, 0, 0, 0.051);
		border-radius: 100rpx;
	}

	.infoName {
		font-size: 36rpx;
		margin-bottom: 20rpx;
	}

	.tuichu {
		width: 75%;
		height: 90rpx;
		margin: 35vh auto 0;
		color: #fff;
		font-size: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #006CC7;
		border-radius: 20rpx;
	}
</style>
