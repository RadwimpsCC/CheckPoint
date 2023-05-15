<template>
	<view class="content">
		<image class="logo" src="../../static/images/logo_bg.jpg"></image>
		<view class="login">
			<text class="login_tit">
				登录
			</text>

			<view class="login_li">
				<image src="../../static/images/login_icon1.png" class="login_icon"></image>
				<input type="text" v-model="tel" class="input" placeholder="请输入手机号"
					placeholder-style="color:#999; font-size:32rpx" />
			</view>
			<view class="login_li">
				<image src="../../static/images/login_icon2.png" class="login_icon"></image>
				<input password="" v-model="pass" class="input" placeholder="请输入密码"
					placeholder-style="color:#999; font-size:32rpx" />
			</view>
			<view><button type="" class="login_btn" @click="tijiao()">登录</button></view>

			<view class="login_tip" v-if="ver != '0'">
				<navigator url="info" hover-class="none"><text class="left">注册</text></navigator>
				<navigator url="zhao_mima" hover-class="none"><text class="right">忘记密码</text></navigator>
			</view>
		</view>

	</view>
</template>

<script>
	import yu from '../../yu.js'
	export default {
		data() {
			return {
				tel: '',
				pass: '',
				ver: '0'
			}
		},
		onLoad() {
			this.tel = uni.getStorageSync("tel");
			this.pass = uni.getStorageSync("pwd");
			this.getver();
			//if (this.tel.length > 10) this.tijiao();

		},
		methods: {
			getver() {
				uni.request({
					url: 'https://yue.2tt.net/xcxver.txt?' + new Date(), //仅为示例，并非真实接口地址。

					success: (res) => {
						console.log(res.data);
						this.ver = res.data;
						uni.setStorageSync("ver", this.ver);
					}
				});
			},
			tijiao() {
				if (this.tel.length < 10) return yu.alert2("手机号填写不正确");
				if (this.pass.length < 6) return yu.alert2("请输入至少6位密码");
				var a = new Object();
				a.phone = this.tel;
				a.pwd = this.pass;
				uni.showLoading({
					title: '登录中...'
				})
				yu.dpost(5, (data) => {
					console.log(JSON.stringify(data));
					if (data.state == 1) {
						uni.setStorageSync("mname", data.data.studentname);
						uni.setStorageSync("tel", this.tel);
						uni.setStorageSync("pwd", this.pass);
						uni.setStorageSync("token", data.data.token);
						yu.tz("../student/chengjibaogao", 1);
					} else {
						yu.alert2(data.msg);
					}
					uni.hideLoading();
				}, a)

			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.logo {
		height: 950rpx;
		width: 750rpx;
		margin-left: auto;
		margin-right: auto;
	}

	.login {
		width: 550rpx;
		padding: 50rpx 100rpx;
		margin-top: -290rpx;
		z-index: 5;
		border-top-left-radius: 50rpx;
		border-top-right-radius: 50rpx;
		background-color: #fff;
	}

	.login_li {
		display: flex;
		align-items: center;
		border-color: #ccc;
		border-width: 0 0 1rpx 0;
		border-style: solid;
		height: 100rpx;
		padding: 0rpx 0rpx 0;
		background-color: #fff;
		box-sizing: border-box;
		margin-bottom: 30rpx;
	}

	.login_li .login_icon {
		width: 40rpx;
		height: 40rpx;
	}

	.login_li .input {
		width: calc(100% - 100rpx);
		margin-left: 10rpx;
	}

	.login_btn {
		height: 95rpx;
		line-height: 95rpx;
		font-size: 34rpx;
		margin-top: 60rpx;
		border-radius: 100rpx;
		border: none;
		color: #fff;
		background-color: #01b7ab;
	}

	.login_tip {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		margin-top: 30rpx;
		font-size: 32rpx;
		padding: 0 4%;
		box-sizing: border-box;
	}

	.login_tip .left {
		color: #f4681a;
	}

	.login_tip .right {
		color: #999;
	}

	.login button::after {
		border: none
	}

	.login_tit {
		font-size: 42rpx;
		margin-bottom: 30rpx;
		display: block;
	}
</style>
