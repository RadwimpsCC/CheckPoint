<template>
	<view class="content">

		<!-- #ifdef MP -->
		<scroll-view class="tab" scroll-x="true">
			<block v-for="(item,index) in list" :key="index">
				<text :class="item.id==tmid?'tab_li tab_li_cur':'tab_li'"
					@click="changetm(item.id,item.type)">{{item.title}}</text>
			</block>
		</scroll-view>
		<!-- #endif -->

		<!-- #ifndef MP -->
		<scroll-view class="tab" scroll-x="true">
			<block v-for="(item,index) in list" :key="index">
				<text :class="item.id==tmid?'tab_li tab_li_cur':'tab_li'"
					@click="changetm(item.id,item.type)">{{item.title}}</text>
			</block>
		</scroll-view>
		<!-- #endif -->

		<view class="yuanti">
			<view class="yt_title">
				<view class="yt_tit_left">
					<view class="line"></view>
					<text class="yt_tit_left_name">原题</text>
				</view>
				<view class="yt_tit_right">
					<text class="yt_tit_right_name">难度</text>
					<view class="yt_tit_right_star">
						<image src="../../static/images/xing.png" class="xing"></image>
						<image src="../../static/images/xing.png" class="xing"></image>
						<image src="../../static/images/xing2.png" class="xing"></image>
						<image src="../../static/images/xing2.png" class="xing"></image>
						<image src="../../static/images/xing2.png" class="xing"></image>
					</view>
				</view>
			</view>

			<image v-if="idata !=null && idata.originals !=null && idata.originals.length > 0"
				:src="idata.originals[0]" mode="widthFix" class="yt_img_box"></image>
			<!-- 	<image src="../../static/images/yt_img.png" mode="widthFix" class="yt_img_box"></image> -->


			<view class="yt_tab" style="justify-content: space-around">
				<view class="yt_tab_li">
					<text class="tab_li_val">
						{{idata.qscore}}
					</text>
					<text class="tab_li_name">题目分值</text>
				</view>
				<view class="yt_tab_li">
					<text class="tab_li_val">{{idata.uscore}}</text>
					<text class="tab_li_name">我的得分</text>
				</view>
				<view class="yt_tab_li" v-if="idata.type == 0">
					<text class="tab_li_val">{{idata.uanswer}}</text>
					<text class="tab_li_name">我的答案</text>
				</view>
				<view class="yt_tab_li" v-if="idata.type == 0">
					<text class="tab_li_val">{{idata.qanswer}}</text>
					<text class="tab_li_name">正确答案</text>
				</view>

			</view>
			<block v-if="idata.type > 0" v-for="(item,index) in idata.pics" :key="index">
				<image :src="item" mode="widthFix" class="yt_img_box"></image>
			</block>
		</view>

		<view class="yuanti">
			<view class="yt_title">
				<view class="yt_tit_left">
					<view class="line"></view>
					<text class="yt_tit_left_name">学霸答案</text>
				</view>
				<!-- 	<view class="yt_tit_right">
					<text class="yt_tit_right_name">其它答案</text>
					<view class="yt_tit_right_star">
						<image src="../../static/images/more.png" class="xing"></image>
					</view>
				</view> -->
			</view>
			<block v-if="idata.type > 0" v-for="(item,index) in idata.recommends" :key="index">
				<image :src="item" mode="widthFix" class="yt_img_box"></image>
			</block>
			<!-- <image src="../../static/images/img2.png" mode="widthFix" class="yt_img_box"></image> -->
		</view>

		<!-- 本题得分对比 -->
		<!-- <view class="yuanti">
			<view class="yt_title">
				<view class="yt_tit_left">
					<view class="line"></view>
					<text class="yt_tit_left_name">本题得分对比</text>
				</view>
				<view class="yt_tit_right">
				</view>
			</view>
			<image src="../../static/images/img3.png" mode="widthFix" class="yt_img_box"></image>
		</view>
		 -->
		<!-- 班级作答统计 -->
		<!-- <view class="yuanti">
			<view class="yt_title">
				<view class="yt_tit_left">
					<view class="line"></view>
					<text class="yt_tit_left_name">班级作答统计</text>
				</view>
				<view class="yt_tit_right">
				</view>
			</view>
			<image src="../../static/images/img4.png" mode="widthFix" class="yt_img_box"></image>
		</view> -->


	<!-- 	<image @click="ckfx()" src="../../static/images/look_fx.png" mode="widthFix" class="look_fx"></image> -->

		<navigator :url="'acard?id='+purl" class="dati">
			答题卡
		</navigator>
	</view>
</template>

<script>
	import yu from "../../yu.js"
	export default {
		data() {
			return {
				nowtype: 0,
				purl: 'https://yue.2tt.net/pages/exam/summary/paper.aspx?id=70',
				idata: {},
				tmid: 1,
				id: 0,
				list: [],
			}
		},
		onNavigationBarButtonTap(e) {
			this.getmyinfo(1);
		},
		onLoad(op) {
			console.log(op.id);
			if (op.id != undefined) {
				this.id = op.id;
				this.getmyinfo(0);
			}

			//this.getmyinfo();
		},
		methods: {
			ckfx() {
				yu.tz('vip?id=' + this.tmid + '&type=' + this.nowtype);
			},
			changetm(tid, type) {
				this.nowtype = type;
				this.tmid = tid;
				var a = new Object();
				a.id = tid;
				a.type = type;
				console.log(a);
				uni.showLoading({});
				yu.dpost(13, (data) => {
					console.log(JSON.stringify(data));
					if (data.state == 1) {
						this.idata = data.data;
					} else {
						yu.alert2(data.msg);
					}
					uni.hideLoading();
				}, a)
			},
			getmyinfo(type) {
				let a = new Object();
				a.id = this.id;
				a.type = type;
				yu.dpost(12, (data) => {
					console.log(JSON.stringify(data));
					if (data.state == 1) {
						this.purl = encodeURIComponent(data.data.paperurl);
						this.list = data.data.list;
						if (this.list.length > 0) this.changetm(this.list[0].id, this.list[0].type);

						console.log(this.list.length);
					} else {
						yu.alert2(data.msg);
					}
				}, a)
			}
		}
	}
</script>

<style>
	page {
		background-color: #f6f6f6;
		padding-bottom: 120rpx;
	}

	.tab {
		white-space: nowrap;
		display: flex;
		height: 80rpx;
		line-height: 80rpx;
		width: 740rpx;
		align-items: center;
		padding-left: 10rpx;
		overflow: hidden;
	}

	.tab_li {
		font-size: 30rpx;
		margin: 0 10rpx;
		display: inline-block;
		width: 100rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
	}

	.tab_li_cur {
		background-color: #01b7ab;
		border-radius: 100rpx;
		color: #fff;
	}

	.yuanti {
		background-color: #fff;
		border-radius: 20rpx;
		margin: 20rpx;
	}

	.yt_title {
		justify-content: space-between;
		padding: 20rpx 0;
		display: flex;
	}

	.yt_tit_left {
		align-items: center;
		display: flex;
	}

	.yt_tit_left_name {
		font-size: 32rpx;
		margin-left: 20rpx;
	}

	.line {
		width: 8rpx;
		height: 30rpx;
		background-color: #fe751a;
	}

	.yt_tit_right {
		align-items: center;
		margin-right: 20rpx;
		display: flex;
	}

	.yt_tit_right_star {
		flex-direction: row;
		align-items: center;
	}

	.xing {
		width: 30rpx;
		height: 30rpx;
		margin-right: 6rpx;
	}

	.yt_tit_right_name {
		font-size: 28rpx;
		margin-right: 15rpx;
		color: #8b8b8b;
	}

	.yt_tab {
		flex-flow: row wrap;
		display: flex;
		justify-content: space-between;
		padding: 30rpx 0;
		margin: 30rpx 40rpx;
		border-top: 1rpx dashed #ccc;
	}

	.tab_li_val {
		font-size: 54rpx;
		color: #01b7ab;
		text-align: center;
		display: block;
		height: 80rpx;
		line-height: 80rpx;
	}

	.tab_li_name {
		font-size: 28rpx;
		color: #666;
		text-align: center;
		display: block;
		height: 40rpx;
		line-height: 40rpx;
	}

	.yt_img_box {
		width: 660rpx;
		margin: 10rpx 30rpx;
		background-color: #fff;
	}

	.look_fx {
		position: fixed;
		width: 160rpx;
		height: 160rpx;
		right: 0rpx;
		bottom: 140rpx;
	}

	.dati {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 110rpx;
		line-height: 110rpx;
		background-color: #fbdbc9;
		text-align: center;
		color: #fd6111;
	}
</style>
