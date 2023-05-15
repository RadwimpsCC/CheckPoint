<template>
	<view class="content">
		<view class="info">
			<view class="info_li">
				<text class="info_li_name">{{mydata.xx}}：</text>
				<view class="info_li_text ">
					<jPicker class="cont" @sure="bookTypeChange" showKey="name" valKey="id" :val="nData.bookTypeVal"
						:options="array" position="middle" />

					<!-- 		<JPicker @change="bindPickerChange" range-key="name" :value="index" :range="array"
						class="info_li_val info_li_text_picker">
						<view class="uni-input">{{array[index].name}}</view>
					</JPicker> -->
				</view>
			</view>
			<view class="info_li">
				<text class="info_li_name">{{mydata.nj}}：</text>
				<view class="info_li_text">
					<picker @change="bindPickerChange_nj" :value="index_nj" range-key="name" :range="array_nj"
						class="info_li_val info_li_text_picker">
						<view class="uni-input">{{array_nj[index_nj].name}}</view>
					</picker>
				</view>
			</view>
			<view class="info_li">
				<text class="info_li_name">{{mydata.bj}}：</text>
				<view class="info_li_text">
					<picker @change="bindPickerChange_bj" :value="index_bj" range-key="name" :range="array_bj"
						class="info_li_val info_li_text_picker">
						<view class="uni-input">{{array_bj[index_bj].name}}</view>
					</picker>
				</view>
			</view>
			<view class="info_li">
				<text class="info_li_name">{{mydata.xm}}：</text>
				<view class="info_li_text">
					<input type="text" v-model="sname" :placeholder="'请输入'+mydata.xm" @confirm="inputcomplete()" />
					<text @click="inputcomplete()" style="color: red;">{{mydata.yz}}</text>
				</view>
			</view>
			<view class="info_li">
				<text class="info_li_name">{{mydata.zkz}}：</text>
				<view class="info_li_text" v-if="xsname.length > 1">
					<image src="../../static/images/xuanzhong_icon.png" class="xz_icon"></image>
					<text class="info_li_val">{{xsname}}</text>
				</view>
			</view>

			<text class="info_tip_text">{{mydata.ts}}</text>
			<button type="" class="login_btn" @click="tz">下一步</button>

		</view>


	</view>
</template>

<script>
	import yu from '../../yu.js'
	export default {
		data() {
			return {
				nData: {
					bookTypeVal: ''
				},
				mydata: {
					xx: '屏蔽废弃使用',
					nj: '屏蔽废弃使用',
					bj: '屏蔽废弃使用',
					xm: '屏蔽废弃使用',
					zkz: '屏蔽废弃使用',
					ts: '屏蔽废弃使用',
					yz: '屏蔽废弃使用'
				},
				xsname: '',
				sname: '',
				studentid: 0,
				schoolid: 0,
				grade: 0,
				class: 0,
				title: 'picker',

				array: [{
					"id": 0,
					"name": ''
				}],
				index: 0,

				array_nj: [{
					"id": 0,
					"name": ''
				}],
				index_nj: 0,

				array_bj: [{
					"id": 0,
					"name": ''
				}],
				index_bj: 0
			}
		},
		onLoad(op) {
			console.log(op);
			this.getallschool()
		},
		methods: {
			inputcomplete() {
				if (this.sname.length < 2) return yu.alert2("请输入正确的" + this.mydata.xm);
				if (this.class < 1) return yu.alert2("请输入正确的" + this.mydata.bj);
				var a = new Object();
				a.classid = this.class;
				a.name = this.sname;
				yu.dpost(2, (data) => {
					console.log(JSON.stringify(data));
					if (data.state == 1) {
						if (data.data.list.length < 1) {
							yu.alert2("没有找到,请确认一下输入是否正确");
							return;
						}
						this.xsname = '[' + data.data.list[0].code + ']' + data.data.list[0].name;
						this.studentid = data.data.list[0].id;
					} else {
						yu.alert2(data.msg);
					}
				}, a)
				console.log("输入完成");
			},
			tz() {
				if (this.studentid < 1) return yu.alert2("1没有找到,请重新查找");
				yu.tz('bang_phone?sid=' + this.studentid);
			},
			getallschool() {
				var a = new Object();
				a.type = 0;
				yu.dpost(1, (data) => {
					console.log(JSON.stringify(data));
					if (data.state == 1) {
						let ver = uni.getStorageSync("ver");
						if (ver.hasOwnProperty('nj')) {
							this.mydata = ver;
						}
						console.log(this.mydata);
						this.array = data.data.list;
						if (this.array.length > 0) {
							this.schoolid = this.array[0].id;
							this.getgrade();
						}

					} else {
						yu.alert2(data.msg);
					}
				}, a)
			},
			getgrade() {
				var a = new Object();
				a.type = 1;
				a.school = this.schoolid;
				yu.dpost(1, (data) => {
					console.log(JSON.stringify(data));
					if (data.state == 1) {
						this.array_nj = data.data.list;
						if (this.array_nj.length > 0) {
							this.grade = this.array_nj[0].id;
							this.getclass();
						}

					} else {
						yu.alert2(data.msg);
					}
				}, a)
			},
			getclass() {
				var a = new Object();
				a.type = 2;
				a.school = this.schoolid;
				a.grade = this.grade;
				yu.dpost(1, (data) => {
					console.log(JSON.stringify(data));
					if (data.state == 1) {
						if (data.data.list.length > 0) {
							this.array_bj = data.data.list;
							this.index_bj = 0;
							if (this.array_bj.length > 0) this.class = this.array_bj[0].id;
						}

					} else {
						yu.alert2(data.msg);
					}
				}, a)
			},
			bookTypeChange(e) {
				console.log("you select bookType", e);
				this.nData.bookTypeVal = e.pickerVal; //手动绑定
				this.grade = 0;
				this.class = 0;
				this.index_nj = 0;
				this.index_bj = 0;
				this.schoolid = this.nData.bookTypeVal;
				if (this.array.length > 0) this.getgrade();
			},
			bindPickerChange: function(e) {
				this.grade = 0;
				this.class = 0;
				this.index_nj = 0;
				this.index_bj = 0;
				this.index = e.detail.value;
				this.schoolid = this.array[this.index].id;

				if (this.array.length > 0) this.getgrade();

			},

			bindPickerChange_nj: function(e) {
				this.class = 0;

				this.index_nj = e.detail.value
				if (this.array_nj.length > 0) {
					this.grade = this.array_nj[this.index_nj].id;
					this.getclass();
				}

			},

			bindPickerChange_bj: function(e) {

				this.index_bj = e.detail.value;
				this.class = this.array_bj[this.index_bj].id
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
	}

	.info_li .info_li_name {
		width: 170rpx;
		font-size: 32rpx;
		color: #6e6e6e;
	}

	.info_li .info_li_text {
		width: calc(100% - 170rpx);
		font-size: 32rpx;
		display: flex;
		align-items: center;
	}

	.info_li_val {
		font-size: 32rpx;
		display: block;
		width: 100%;
	}

	.xz_icon {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}

	.info_tip_text {
		font-size: 32rpx;
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

	.info_li_text_picker {
		background: url(../../static/images/login_icon5.png) no-repeat right center;
		background-size: 70rpx;
	}
</style>
