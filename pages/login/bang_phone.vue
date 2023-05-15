<template>
	<view class="content">
		<view class="info">
			<view class="info_li">
				<image src="../../static/images/login_icon6.png" class="login_icon"></image>
				<input type="text" v-model="tel" placeholder="请输入手机号" class="info_li_val"
					placeholder-style="color:#999; font-size:32rpx" />
			</view>
			<view class="info_li">
				<image src="../../static/images/login_icon7.png" class="login_icon"></image>
				<input :password="true" type="text" v-model="pass" placeholder="请输入新密码" class="info_li_val"
					placeholder-style="color:#999; font-size:32rpx" />
			</view>
			<view class="info_li">
				<image src="../../static/images/login_icon7.png" class="login_icon"></image>
				<input :password="true" type="text" v-model="newpass" placeholder="请再次输入新密码" class="info_li_val"
					placeholder-style="color:#999; font-size:32rpx" />
			</view>
	<!-- 		<view class="info_li info_li_cur">
				<image src="../../static/images/login_icon3.png" class="login_icon"></image>
				<input type="text" v-model="sms" placeholder="请输入验证码" class="info_li_val"
					placeholder-style="color:#999; font-size:32rpx" />
				<view class="yzm" @click="getsms()">{{title}}</view>
			</view> -->
			<!-- 			<view class="info_li"
				style="background: url(../../static/images/login_icon5.png) no-repeat right center; background-size: 70rpx;">
				<image src="../../static/images/login_icon4.png" class="login_icon"></image>

				<picker @change="bindPickerChange" :value="index" :range="array" class="info_li_val">
					<view class="uni-input">{{array[index]}}</view>
				</picker>
			</view> -->
			<view class="xieyi">
				<image src="../../static/images/xuanzhong_icon.png" class="xz_icon"></image>
				<text class="info_tip_text">本人已阅读并同意 <label>《爱探讨条款协议》</label></text>
			</view>

			<view><button type="" class="login_btn" @click="tijiao">提交</button></view>
		</view>


	</view>
</template>

<script>
	import yu from '../../yu.js'
	export default {
		data() {
			return {
				studentid: 0,
				tel: '',
				count: 60,
				sms: '',
				title: '获取验证码',
				pass: '',
				newpass: ''
			}
		},
		onLoad(op) {
			if (isNaN(op.sid)) return yu.alert2("参数错误");
			this.studentid = op.sid;
			console.log(op);
		},
		methods: {
			getsms: function() {
				if (this.count != 60) return;
				if (this.tel.length < 10) return yu.alert2("请输入正确的手机号");
				var a = new Object();
				a.phone = this.tel;
				yu.dpost(3, (data) => {
					console.log(JSON.stringify(data));
					if (data.state == 1) {
						this.jianmiao();
					} else {
						yu.alert2("发送失败");
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
				//if (this.sms.length < 2) return yu.alert2("验证码不能为空");
				if (this.pass.length < 6) return yu.alert2("请输入至少6位密码");
				if (this.pass != this.newpass) return yu.alert2("密码与确认密码不一致！");
				if (this.studentid < 1) return yu.alert2("学生ID不正确！");
				var a = new Object();
				a.phone = this.tel;
				a.student = this.studentid;
				a.pwd = this.pass;
				a.sms = this.sms;
				a.role = 0;
				yu.dpost(4, (data) => {
					console.log(JSON.stringify(data));
					if (data.state == 1) {
						yu.alert2("恭喜您注册成功!");
						yu.tz("login");
					} else {
						yu.alert2(data.msg);
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

	.info_li .login_icon {
		width: 45rpx;
		height: 45rpx;
	}

	.info_li .info_li_text {
		width: calc(100% - 55rpx);
		font-size: 32rpx;
		display: flex;
		align-items: center;
	}

	.info_li_val {
		font-size: 32rpx;
		width: 100%;
		color: #999;
		font-size: 32rpx
	}

	.xz_icon {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
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

	.xieyi {
		display: flex;
		justify-content: center;
		margin-top: 120rpx;
		align-items: center;
	}

	.xz_icon {
		width: 30rpx;
		height: 30rpx;
		margin-right: 15rpx;
	}

	.info_tip_text {
		font-size: 28rpx;
		color: #282828;
		text-align: center;
		display: flex;
		justify-content: center;
	}

	.info_tip_text label {
		font-size: 28rpx;
		color: #fe751a;
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
