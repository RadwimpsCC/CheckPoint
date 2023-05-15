<template>

	<view class="content">

		<view class="chengji">

			<view class="zcj">
				<text class="bt">{{idata.studentname}}成绩分析报告</text>


				<view class="circleprogress">
					<view class="progresstext" style="display: flex;flex-direction: column;">
						<label>{{idata.userscore}}</label><label
							style="font-size: 20px;color:#F4681A;">总分:{{idata.totalscore}}</label>
					</view>
					<view class="wrapper">
						<view class="leftprogress" :style="{ transform: leftprogress}"></view>
					</view>
					<view class="wrapper">
						<view class="rightprogress" :style="{ transform: rightprogress}"></view>
					</view>

					<view class="pai">
						<image src="../../static/images/jinpai.png" class="pai_img"></image>
						<text class="pai_text">{{idata.totallevel}}</text>
					</view>

				</view>


				<!-- <view class="fs">
					<text class="fs-h">{{idata.userscore}}</text>
					<text class="fs-xz">满分{{idata.totalscore}}</text>
				</view> -->
			</view>
			<view class="zcj" style="margin-top: -100rpx;">
				<text class="bt">{{idata.examtitle}}</text>
				<text class="ks-sj">考试时间：{{idata.starttime}}</text>
				<view class="km">

					<block v-for="(item,index) in idata.scores" :key="index" class="km-k">
						<navigator :url="'dkjiexi?id='+item.id" class="km-k">
							<view class="kmmc">
								<text class="kmm">{{item.name}}</text>

								<!-- 	<text class="ts">{{item.statename}}</text> -->
							</view>
							<view class="fen">
								<text class="lv">{{item.score}}</text>
								<text class="zf"> /{{item.totalscore}}</text>
							</view>
						</navigator>
					</block>

				</view>

				<!-- <view class="km">
					<navigator url="baogaoxiangqing" hover-class="none"><text class="z-an">查看报告</text></navigator>
					<navigator url="dankexiangqing" hover-class="none"><text class="y-an"> 答题情况</text></navigator>
				</view> -->
			</view>
			<view class="zcj zcjBox">
				<view class="bt_box">
					<view class="line">
					</view>
					<text class="bt bt_two">历次考试</text>
				</view>

				<image src="../../static/sanjiao.png" class="sj-img"></image>
				<view class="box">
					<block v-for="(item,index) in list" :key="index">
						<view class="lc" hover-class="none" @click="getmyinfo(item.id)">
							<view class="lc-z">
								<image src="../../static/yd.png" class="bt-img"></image>
								<text class="zzi">{{item.title}}</text>
							</view>
							<image src="../../static/xiayiye.png" class="xy-img"></image>
						</view>
					</block>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import yu from '../../yu.js'
	export default {
		data() {
			return {
				leftprogress: 'rotate(-45deg)',
				rightprogress: 'rotate(45deg)',
				progresstext: '0',
				idata: {},
				list: [],
			}
		},
		onLoad() {
			this.idata.studentname = "-";
			this.idata.userscore = "-";
			this.idata.totalscore = "-";
			this.idata.starttime = "-";
			console.log(uni.getStorageSync("token"));
			this.getmyinfo(0);
			this.getlist();
			this.sliderchange();
		},
		methods: {
			getlist() {
				let a = new Object();
				a.page = 1;
				a.limit = 10;
				yu.dpost(9, (data) => {
					console.log(JSON.stringify(data));
					if (data.state == 1) {
						this.list = data.data.list;
					} else {
						if (data.msg == '需要登录') {
							yu.tz('../login/login')
						}
					}
				}, a)

			},
			getmyinfo(id) {
				let a = new Object();
				a.id = id;
				yu.dpost(10, (data) => {
					console.log(JSON.stringify(data));
					if (data.state == 1) {
						this.idata = data.data;
					} else {
						if (data.msg == '需要登录') {
							yu.tz('../login/login')
						}
						//yu.alert2(data.msg);
					}
				}, a,1)
			},
			sliderchange() {
				var deg = this.myscore / this.tscore * 360;
				if (deg <= 180) {
					this.rightprogress = 'rotate(' + (45 + deg) + 'deg)'
					this.leftprogress = 'rotate(' + (-45) + 'deg)'
				} else {
					this.rightprogress = 'rotate(' + (45 + 180) + 'deg)'
					this.leftprogress = 'rotate(' + (-45 + (deg - 180)) + 'deg)'
				}
			}
		}
	}
</script>

<style>
	.chengji {
		width: 100%;



	}

	.zcj {
		padding: 30rpx 20rpx 50rpx;
		border-radius: 20rpx;

		align-items: center;
		margin: 25rpx 25rpx 0;
		background-color: #FFFFFF;
		position: relative;
	}

	.bt {
		font-size: 30rpx;
		font-weight: bold;
		display: flex;
		width: 100%;
		justify-content: center;
		line-height: 50rpx;
		color: #202020;
	}

	.bt_box {
		display: flex;
		align-items: center;
	}

	.bt_two {
		justify-content: flex-start;
	}

	.line {
		width: 14rpx;
		height: 32rpx;
		align-items: center;
		background-color: #01B7AB;
		border-radius: 6rpx;
		margin-right: 15rpx;
	}

	.box {
		background-color: #f8f8f8;
		border-radius: 15rpx;
		padding: 15rpx 20rpx;
		box-sizing: border-box;
	}

	.pai {
		display: flex;
		justify-content: center;
	}

	.pai_img {
		width: 75rpx;
		height: 90rpx;
	}

	.sj-img {
		width: 24rpx;
		height: 15rpx;
		margin-top: 10rpx;
	}

	.yb {
		width: 278rpx;
		height: 247rpx;
		margin-top: 30rpx;
		margin-bottom: 20rpx;
	}

	.bjtu {
		position: absolute;
		width: 100rpx;
		height: 100rpx;
		border-radius: 100rpx;
		background-image: linear-gradient(to right, #eef3f8, #fde5d5);
	}

	.zy {
		top: 120rpx;
		left: 60rpx;
	}

	.yy {
		top: 170rpx;
		right: 80rpx;
	}

	.bjxy {
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		border-radius: 100rpx;
		background-image: linear-gradient(to left, #eef3f8, #fde5d5);
	}

	.zx {
		top: 260rpx;
		left: 130rpx;
	}

	.yx {
		top: 100rpx;
		right: 50rpx;
	}

	.fs {
		position: absolute;
		width: 155rpx;
		height: 87rpx;
		left: 271rpx;
		top: 230rpx;
		flex-direction: column;
		text-align: center;
	}

	.fs-h {
		font-size: 48rpx;
		font-weight: bold;
		color: #fe751a;
		text-align: center;
	}

	.fs-xz {
		font-size: 24rpx;
		color: #6e6f6f;
		text-align: center;
	}

	.ks-sj {
		font-size: 24rpx;
		color: #6a6a6a;
		margin-bottom: 10rpx;
		display: flex;
		justify-content: center;
	}

	.km {
		width: 100%;
		margin-top: 20rpx;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
	}

	.km-k {
		width: calc(50% - 20rpx);
		margin-bottom: 20rpx;
		margin-left: 20rpx;
		height: 133rpx;
		background-color: #f7f5f5;
		padding: 15rpx 20rpx;
		box-sizing: border-box;
		flex-direction: column;
		border-radius: 10rpx;
	}

	.km-k:nth-child(2n+1) {
		margin-left: 0;
	}

	.kmmc {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.kmm {
		width: 190rpx;
		text-align: left;
		font-size: 30rpx;
	}

	.ts {
		font-size: 22rpx;
		background-color: #fe751a;
		text-align: center;
		width: 60rpx;
		height: 32rpx;
		line-height: 32rpx;
		color: #FFFFFF;
		border-bottom-right-radius: 30rpx;
		border-bottom-left-radius: 0rpx;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
	}

	.py {
		font-size: 22rpx;
		background-color: #01b7ab;
		text-align: center;
		width: 60rpx;
		height: 32rpx;
		line-height: 32rpx;
		color: #FFFFFF;
		border-bottom-right-radius: 30rpx;
		border-bottom-left-radius: 0rpx;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
	}

	.fen {
		margin-top: 6rpx;
		flex-direction: row;
		align-items: center;
	}

	.lv {
		font-size: 45rpx;
		font-weight: bold;
		color: #01b7ab;
	}

	.zf {
		font-size: 30rpx;
		color: #636363;
	}

	.z-an {
		width: 230rpx;
		height: 70rpx;
		display: flex;
		justify-content: center;
		line-height: 70rpx;
		margin-top: 30rpx;
		font-size: 30rpx;
		text-align: center;
		color: #01b7ab;
		border-width: 1rpx;
		border-color: #01b7ab;
		border-style: solid;
		border-radius: 100rpx;
	}

	.y-an {
		width: 400rpx;
		height: 72rpx;
		display: flex;
		justify-content: center;
		line-height: 72rpx;
		margin-top: 30rpx;
		font-size: 30rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #01b7ab;
		border-radius: 100rpx;
	}

	.lc {
		width: 100%;
		margin: 25rpx 0rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.lc-z {
		flex-direction: row;
		justify-content: flex-start;
		display: flex;
		width: calc(100% - 40rpx);
		align-items: center;
	}

	.zzi {
		font-size: 28rpx;
		color: #434343;
		margin-left: 15rpx;
	}

	.xy-img {
		width: 14rpx;
		height: 24rpx;
	}

	.bt-img {
		width: 15rpx;
		height: 15rpx;
	}

	/* 进度条分界线测试 */
	.circleprogress {
		width: 100%;
		height: 200px;
		margin-top: -40rpx;
		display: flex;
		transform: scale(0.65);
		justify-content: center;
		position: relative;
	}

	.content .pai {
		position: absolute;
		right: 30rpx;
		bottom: 0rpx;
		z-index: 9999;
		display: flex;
		align-items: center;
	}

	.pai .pai_text {
		font-weight: bold;
		margin-left: 10rpx;
		color: #F4681A;
		font-size: 48rpx;
	}

	.circleprogress .progresstext {
		position: absolute;
		font-size: 30px;
		width: 200px;
		height: 200px;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 10;
		color: #008000;
	}

	.circleprogress .wrapper {
		width: 100px;
		height: 200px;
		overflow: hidden;
	}

	.circleprogress .leftprogress,
	.rightprogress {
		width: 160px;
		height: 160px;
		border: 20px solid orange;
		/* 这里是为占领的颜色 */
		border-bottom: 20px solid #00aa00;
		border-radius: 50%;

	}

	.circleprogress .leftprogress {
		border-right: 20px solid #00aa00;
	}

	.circleprogress .rightprogress {
		border-left: 20px solid #00aa00;
		margin-left: -100px;
	}
</style>
