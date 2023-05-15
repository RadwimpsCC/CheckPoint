<template>
	<view class="content">
		<block v-for="(item,key) in kslist" :key="item.id">
			<view class="lici_li flex flex-column" @click="tzym(item.id,item.upstate)">
				<view class="liciText"> <text class="tip">{{item.name}}</text> {{item.examtitle}}</view>
				<view class="liciTime">考试时间：{{item.submittime}}</view>

				<image src="../../static/images/jiesu.png" mode="widthFix" class="jiesu" v-if="item.upstate== 2">
				</image>
				<image src="../../static/images/shangchuan.png" mode="widthFix" class="jiesu2"
					v-else-if="item.upstate== 1"></image>
				<image src="../../static/images/wks.png" mode="widthFix" class="jiesu2" v-else-if="item.upstate== -1">
				</image>
			</view>
		</block>
	</view>
</template>

<script>
	import yu from '../../yu.js';
	export default {
		data() {
			return {
				title: 'Hello',
				kslist: []
			}
		},
		onShow() {
			this.getmylist();
		},
		methods: {
			getmylist() {
				let a = {
					page: 1
				};
				yu.dpost(31, (data) => {
					console.log(JSON.stringify(data));
					if (data.state == 1) {
						this.kslist = data.data.list;
					} else {
						yu.alert2(data.msg);
						if (data.msg.indexof('登录')) {
							uni.reLaunch({
								url: '../login/login'
							})
						}
					}
				}, a)
			},
			tzym(id, zt) {
				if (zt == 1) {
					yu.alert2("试卷已上传！");
				} else if (zt == 2) {
					yu.alert2("考试已结束！");
				} else if (zt == -1) {
					yu.alert2("考试还未开始！");
				} else {
					yu.tz('index?id=' + id);
				}

			}
		}
	}
</script>

<style>
	page {
		background-color: #F4F4F4;
	}

	.content {
		padding: 30rpx;
		box-sizing: border-box;
	}

	.tip {
		padding: 0 6rpx;
		height: 40rpx;
		border-radius: 10rpx;
		margin-right: 10rpx;
		font-size: 28rpx;
		font-weight: normal;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #f60;
		color: #f60;
	}

	.lici_li {
		background: #FFFFFF;
		border-radius: 20rpx;
		margin-bottom: 25rpx;
		padding: 30rpx;
		box-sizing: border-box;
		position: relative;
	}

	.jiesu {
		position: absolute;
		width: 90rpx;
		height: 90rpx;
		right: 10rpx;
		top: 10rpx;
		opacity: 0.1;
	}

	.jiesu2 {
		position: absolute;
		width: 90rpx;
		height: 90rpx;
		right: 10rpx;
		top: 10rpx;
		opacity: 1;
	}

	.liciText {
		display: flex;
		align-items: center;
		font-size: 30rpx;
		font-weight: bold;
	}

	.liciTime {
		text-align: right;
		color: #999999;
		margin-top: 40rpx;
	}
</style>
