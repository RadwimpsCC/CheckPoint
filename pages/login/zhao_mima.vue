<template>
	<view class="content">
		<view class="info">
			<view class="info_li">
				<input type="text" v-model="tel" placeholder="请输入手机号" class="info_li_val"
					placeholder-style="color:#999; font-size:32rpx" />
			</view>
			<view class="info_li info_li_cur">
				<input type="text" v-model="sms" placeholder="请输入验证码" class="info_li_val"
					placeholder-style="color:#999; font-size:32rpx" />
				<text class="yzm" @click="getsms()">{{title}}</text>
			</view>
			<view class="info_li">
				<input type="text" v-model="pass" placeholder="请输入新密码" class="info_li_val"
					placeholder-style="color:#999; font-size:32rpx" />
			</view>
			<view class="info_li">
				<input type="text" v-model="newpass" placeholder="请重新输入新密码" class="info_li_val"
					placeholder-style="color:#999; font-size:32rpx" />
			</view>
			<text class="info_tip_text">如手机号未注册过爱探讨，请返回首页进行注册！</text>
			<button type="" class="login_btn" @click="tijiao()">找回密码</button>
		</view>


	</view>
</template>

<script>
	import yu from '../../yu.js'
	export default {
		data() {
			return {
				tel: '',
				count: 60,
				sms: '',
				title: '获取验证码',
				pass: '',
				newpass: ''
			}
		},
		methods: {
			getsms: function() {
				if (this.count != 60) return;
				if (this.tel.length < 10) return yu.alert2("请输入正确的手机号");
				var a = new Object();
				a.phone = this.tel;
				yu.dpost(6, (data) => {
					console.log(JSON.stringify(data));
					if (data.state == 1) {
						this.jianmiao();
					} else {
						yu.alert2(data.msg);
					}
				}, a)
			},
			jianmiao: function() {
				this.count--;
				if (this.count == 0) {
					this.count = 60;
					this.title = "重新获取";
				} else {
					setTimeout(() => {
						this.title = "重新获取(" + this.count + ")";
						this.jianmiao();
					}, 1000);
				}
			},
			tijiao() {
				if (this.sms.length < 2) return yu.alert2("验证码不能为空");
				if (this.pass.length < 6) return yu.alert2("请输入至少6位密码");
				if (this.pass != this.newpass) return yu.alert2("密码与确认密码不一致！");
				var a = new Object();
				a.phone = this.tel;
				a.pwd = this.newpass;
				a.sms = this.sms;
				yu.dpost(7, (data) => {
					console.log(JSON.stringify(data));
					if (data.state != 0) {
						yu.alert2("密码修改成功！");
						yu.tz("login");
					} else {
						yu.alert2(data.err_msg);
					}
				}, a)
			}
		}
	}
</script>

<style>
	.info {
		width: 86%;
		margin: 10% auto 0;
	}

	.info_li {
		display: flex;
		padding: 35rpx 0;
		border-bottom: 1rpx solid #ececec;
		margin-bottom: 30rpx;
	}

	.info_li_val {
		font-size: 32rpx;
		width: 100%;
	}

	.info_li_cur {
		position: relative;
	}

	.info_li_cur .info_li_val {
		width: calc(100% - 200rpx);
	}

	.info_li_cur .yzm {
		position: absolute;
		top: 30rpx;
		right: 0;
		width: 180rpx;
		border-radius: 100rpx;
		font-size: 28rpx;
		height: 60rpx;
		line-height: 60rpx;
		color: #fff;
		text-align: center;
		background-color: #fe751a;
	}

	.info_tip_text {
		font-size: 28rpx;
		color: #fe751a;
		margin-top: 120rpx;
		text-align: center;
		display: flex;
		justify-content: center;
	}

	.info button::after {
		border: none
	}

	.login_btn {
		height: 110rpx;
		line-height: 110rpx;
		font-size: 34rpx;
		margin-top: 30rpx;
		border-radius: 100rpx;
		border: none;
		color: #fff;
		background-color: #01b7ab;
	}
</style>
