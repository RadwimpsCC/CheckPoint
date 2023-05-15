<template>
	<view class="content">
		<!-- 考试名称 -->
		<view class="datiTit">
			{{info.examtitle}}-答案提交
		</view>

		<!-- 学生信息 -->
		<view class="Author flex flex-between flex-center" style="display: flex;justify-content: space-around;">
			<view class="authorLeft">
				姓名：{{info.name}}
			</view>
			<view>
				<uni-countdown :color="'red'" :backgroundColor="'yellow'" :show-day="false" :hour="hour"
					:minute="minute" :second="second" />
			</view>
			<view class="authorRight" @click="ckyj">
				查看原卷
			</view>
		</view>

		<!-- 题型选择 -->
		<view class="tab_menu flex flex-between flex-center">
			<view :class="ltype==1? 'menuLi menuLi_cur':'menuLi'" @click="ltype=1">
				选择题
			</view>
			<view :class="ltype==2? 'menuLi menuLi_cur':'menuLi'" @click="ltype=2">
				主观题
			</view>
		</view>

		<view class="mainBox" v-if="ltype ==1">
			<!-- 	选择题开始 -->
			<block v-for="xiaoti in tm" :key="tmindex">
				<view class="ti_tit flex flex-center">
					<text class="ti_tit_name">选择题({{xiaoti.score}}分)</text>
					<text class="ti_tit_sn">{{xiaoti.range}}</text>
				</view>

				<view class="tiList">
					<block v-for="(item,xtindex) in xiaoti.items" :key="xtindex">
						<view class="tiLi">
							<view class="tiLi_left">
								{{item.title}}.
							</view>
							<view class="tiLi_right">
								<block v-for="(item2,xxindex) in item.options" :key="xxindex">
									<text
										:class="(idata['xz' + item.id] && duibi(idata['xz' + item.id],item2)) ?'xuanzhe xuanzhe_cur': 'xuanzhe'"
										@click="()=>test(item.id,item2)">{{item2}}</text>
								</block>
								<!-- <text class="xuanzhe xuanzhe_cur">C</text> -->
							</view>
						</view>
					</block>
				</view>
			</block>
			<!-- 	选择题开始 -->
		</view>

		<view class="mainBox" v-else>
			<view class="ti_tit flex flex-center">
				<text class="ti_tit_name">二、解答题</text>
				<text class="ti_tit_sn" style="color: red;font-weight: bold;" @click="chaka">[上传示例]</text>
			</view>

			<view class="ti_pic">
				<block v-for="item in dt" :key="item.id">
					<view class="pic_li">
						<view class="pic_li_sn">
							<view class="tikuan_name">【{{item.title}}】</view>{{item.mark}}
						</view>
						<view v-if="idata['xs'+item.id]">
							<block v-for="(itempic,indexpic) in idata['xs'+item.id]" :key="indexpicx">
								<view class="pic_li_img">
									<image :src="itempic.tempurl" mode="widthFix" class="tiPIc"></image>
									<image src="../../static/images/gbIcon.png" mode="widthFix" class="gbIcon"
										@click="deletepic(item.id,indexpic)"></image>
								</view>
							</block>
							<view @click="sctm(item.id)"
								class="pic_li_btn pic_li_btn2 flex justify-content-c flex-center">
								<image src="../../static/images/xj.png" class="xj_icon"></image>
								继续上传
							</view>
						</view>
						<view v-else>
							<view class="pic_li_btn flex justify-content-c flex-center" @click="()=>sctm(item.id)">
								<image src="../../static/images/xj.png" class="xj_icon"></image>
								上传答案
							</view>
						</view>
					</view>
				</block>
			</view>

		</view>
		<text class="tuichu" @click="tijiao" v-if="ltype==2">考试完毕交卷</text>

		<helang-compress ref="helangCompress"></helang-compress>

	</view>
</template>

<script>
	import yu from '../../yu.js';
	export default {
		data() {
			return {
				testname: '',
				mname: '田同学',
				yuanjuan: '[]',
				imgsizelist: {},
				hour: 3,
				minute: 3,
				second: 10,
				keid: 0,
				ltype: 1,
				info: {},
				idata: {},
				tm: {
					"1": ["A", "B", "C", "D"],
					"2": ["A", "B"],
					"3": ["A", "B"],
					"4": ["A", "B", "C", "D"],
					"5": ["A", "B", "C"],
					"6": ["A", "B", "C"]
				},
				dt: [1, 2, 3],
				imglist: []
			}
		},
		onLoad(op) {
			console.log(op);
			if (op) {
				this.keid = op.id;
				this.mname = uni.getStorageSync("mname")
				this.getmylist(op.id);
			} else {
				yu.alert2("科目数据异常");
			}
		},
		methods: {
			duibi(a, b) {
				let jg = false;
				if (a) {
					jg = a.indexOf(b) > -1 ? true : false;
				}
				return jg;
			},
			chaka() {
				uni.previewImage({
					urls: ['https://yue.2tt.net/images/sl.jpg']
				})
			},
			deletepic(picid, index) {
				this.idata["xs" + picid].splice(index, 1);
				//this.idata["xs" + bid].push(res.tempFilePaths[0]);
			},
			ckyj() {

				yu.tz('shijuan?id=' + encodeURIComponent(this.yuanjuan));
			},
			getmylist(kid) {
				let a = {
					id: kid
				};
				yu.dpost(22, (data) => {

					console.log(JSON.stringify(data));
					if (data.state == 1) {
						this.info = data.data.info;
						this.tm = data.data.keguans;
						this.dt = data.data.zhuguan;
						this.yuanjuan = data.data.info.originals;
						//--计算倒计时
						var date2 = new Date(); //结束时间  
						var date3 = new Date(this.info.endtime).getTime() - date2.getTime(); //时间差的毫秒数    
						console.log(date3);
						var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数  
						this.hour = Math.floor(leave1 / (3600 * 1000))
						//计算相差分钟数  
						var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数  
						this.minute = Math.floor(leave2 / (60 * 1000))
						//计算相差秒数  
						var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数  
						this.second = Math.round(leave3 / 1000)
						//---

					} else {
						yu.alert2(data.err_msg);
					}
				}, a)
			},
			test(key, ans) {
				let daan = ans;
				if (this.idata.hasOwnProperty('xz' + key)) {
					let lsda = this.idata['xz' + key];
					if (lsda.length > 0) {
						if (lsda.indexOf(ans) > -1) {
							daan = lsda.replace(ans, '');
						} else {
							daan += lsda;
						}
					}

				}
				console.log('选择答案' + daan);
				this.$delete(this.idata, 'xz' + key);
				this.$set(this.idata, 'xz' + key, daan);


				console.log(JSON.stringify(this.idata));
			},
			tscx() {
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes);
					}
				});
			},
			sctm(bid) {
				let that = this;
				if (that.idata.hasOwnProperty("xs" + bid) && that.idata["xs" + bid].length > 1) {
					yu.alert2("您最多可以上传2张图片");
					return;
				}
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res));
						let imgsize = res.tempFiles[0].size;
						let temppicurl = res.tempFilePaths[0];
						if (imgsize > 1000000) {
							that.$refs.helangCompress.compress({
								src: temppicurl,
								maxSize: 1080,
								fileType: 'png',
								quality: 0.95,
								minSize: 800 //最小压缩尺寸，图片尺寸小于该时值不压缩，非H5平台有效。若需要忽略该设置，可设置为一个极小的值，比如负数。
							}).then((res) => {
								console.log("11" + res);
								uni.getImageInfo({
									src: res,
									success: function(image) {
										console.log(image.width);
										console.log(image.height);
										that.imgsizelist[res] = {
											width: image.width,
											height: image.height
										};
										that.shangchuang(bid, res);
									}
								});
							}).catch((err) => {
								yu.alert2("压缩失败" + err);
								// 压缩失败回调
							})
						} else {
							uni.getImageInfo({
								src: temppicurl,
								success: function(image) {
									console.log(image.width);
									console.log(image.height);
									that.imgsizelist[temppicurl] = {
										width: image.width,
										height: image.height
									};
									that.shangchuang(bid, temppicurl);
								}
							});
						}
					}
				});
			},
			guid() {
				return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					var r = Math.random() * 16 | 0,
						v = c == 'x' ? r : (r & 0x3 | 0x8);
					return v.toString(16);
				});
			},
			async shangchuang(bid, temppicurl) {
				uni.showLoading({
					title: '提交中,请稍后..'
				})
				let d = {
					code: 24,
					token: uni.getStorageSync("token")
				}
				let jg2 = await yu.tpost(d);
				console.log(jg2[1].data.data);
				let accessid = jg2[1].data.data.accessid;
				let policy = jg2[1].data.data.policy;
				let signature = jg2[1].data.data.signature;
				let dir = 'online/' + this.guid() + '.png';
				let jg = await yu.aliupfile(temppicurl, accessid, policy, signature, dir);
				console.log(jg);
				try {
					if (jg[1].statusCode == 204) {
						let jsonstr = {
							url: dir,
							tempurl: temppicurl,
							width: this.imgsizelist[temppicurl].width,
							height: this.imgsizelist[temppicurl].height
						};
						uni.hideLoading();
						if (this.idata.hasOwnProperty("xs" + bid)) {
							this.idata["xs" + bid].push(jsonstr);
							console.log(this.idata["xs" + bid]);
							//that.idata["xs" + bid] =that.idata["xs" + bid] +',' + res.tempFilePaths[0]);
						} else {
							this.$delete(this.idata, "xs" + bid);
							this.$set(this.idata, "xs" + bid, temppicurl);

							this.idata["xs" + bid] = [];
							this.idata["xs" + bid].push(jsonstr);
						}
						console.log(JSON.stringify(this.idata));
					} else {
						yu.alert2("上传失败,请重新上传图片")
					}
				} catch (e) {
					yu.alert2(e);
				}


			},
			async tijiao() {
				// answers:[{"id":题目id(客观题id/主观题id),type:题目类型(0客观题,1主观题),value:客观题答案/主观题图片,主观题图片以英文逗号间隔}]
				//"{"state":1,"msg":"","data":{"url":"1373010038f64e06b7f5eacd8cafc4ec.png","width":589,"height":297}}"
				let jgstr = [];
				let keys = Object.keys(this.idata);
				if (keys.length == 0) {
					yu.alert2("不能提交空白卷");
					return;
				}
				for (var i = 0; i < keys.length; i++) {
					let lsjson = {};
					if (keys[i].indexOf("xs") > -1) {
						lsjson.type = 1;
						lsjson.id = keys[i].replace('xs', '');
						lsjson.value = this.idata[keys[i]];
						jgstr.push(lsjson);
					} else if (keys[i].indexOf("xz") > -1) {
						lsjson.type = 0;
						lsjson.id = keys[i].replace('xz', '');
						lsjson.value = this.idata[keys[i]];
						jgstr.push(lsjson);
					}
				};
				uni.hideLoading();
				console.log(jgstr);
				yu.showModal("您是否要进行交卷操作?提交后不可更改，请确认是否确认提交", () => {
					var a = new Object();
					a.id = this.keid;
					a.answers = jgstr;
					console.log(a);
					yu.dpost(25, (data) => {
						console.log(JSON.stringify(data));
						if (data.state == 1) {
							yu.alert2('提交成功！');
							yu.tz("kaoshi_jilu", 1);
						} else {
							yu.alert2(data.msg);
						}
					}, a, 1)
				});

			}
		}
	}
</script>

<style>
	page {
		background-color: #F4F4F4;
	}

	.content {
		padding: 20rpx 30rpx;
		box-sizing: border-box;
	}

	.datiTit {
		margin: 30rpx 50rpx;
		text-align: center;
		color: #006CC7;
		font-size: 40rpx;
	}

	.Author {
		background: #006CC7;
		height: 95rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		box-shadow: 0px 14rpx 20rpx 0px rgba(0, 108, 199, 0.25);
		border-radius: 20rpx;
	}

	.authorLeft {
		color: #FFFFFF;
	}

	.authorRight {
		color: yellow;
	}

	.tab_menu {
		height: 85rpx;
		background: #FFFFFF;
		border-radius: 60rpx;
		margin: 60rpx 0;
	}

	.menuLi {
		width: 50%;
		display: flex;
		align-items: center;
		border-radius: 60rpx;
		justify-content: center;
		font-size: 32rpx;
		height: 85rpx;
	}

	.menuLi_cur {
		background-color: #666666;
		color: #fff;
	}

	.ti_tit {
		margin: 20rpx 0 40rpx;
	}

	.ti_tit_name {
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
	}

	.ti_tit_sn {
		font-weight: bold;
		color: #666666;
		font-weight: normal;
	}

	.tiLi {
		display: flex;
		margin-bottom: 20rpx;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
		height: 100rpx;
		background-color: #fff;
	}

	.tiLi_left {
		width: 80rpx;
		font-size: 34rpx;
	}

	.tiLi_right {
		width: calc(100% - 80rpx);
		display: flex;
		justify-content: flex-end;
	}

	.tiLi_right .xuanzhe {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 10rpx;
		width: 80rpx;
		height: 55rpx;
		border-radius: 100rpx;
		border: 1rpx solid #ccc;
	}

	.tiLi_right .xuanzhe_cur {
		background-color: #006CC7;
		border: 1px solid #006CC7;
		color: #fff;
	}

	.pic_li {
		background: #FFFFFF;
		border-radius: 20rpx;
		overflow: hidden;
		padding: 30rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;
	}

	.pic_li_btn {
		width: 240rpx;
		border-radius: 100rpx;
		height: 66rpx;
		color: #666666;
		margin: 30rpx auto;
		border: 1px solid #ccc;
	}

	.xj_icon {
		width: 34rpx;
		height: 34rpx;
		margin-right: 8rpx;
	}

	.pic_li_sn {
		color: #666;

	}

	.pic_li_img {
		max-width: 80%;
		margin: 20rpx auto;
		position: relative;
	}

	.gbIcon {
		width: 45rpx;
		height: 45rpx;
		position: absolute;
		right: -20rpx;
		top: -20rpx;
		border: 1px solid #fff;
		border-radius: 100rpx;
	}

	.pic_li_img .tiPIc {
		width: 100%;
		max-height: 200rpx;
	}

	.pic_li_btn2 {
		width: 160rpx;
		font-size: 24rpx;
		border-radius: 100rpx;
		height: 50rpx;
		margin: 0;
		float: right;
	}

	.pic_li_btn2 .xj_icon {
		width: 28rpx;
		height: 28rpx;
	}

	.tuichu {
		width: 85%;
		height: 90rpx;
		margin: 5vh auto;
		color: #fff;
		font-size: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #006CC7;
		border-radius: 100rpx;
	}

	.tikuan_name {
		font-weight: bold;
		color: #006CC7;
		margin-bottom: 10rpx;
		font-size: 32rpx;
		margin-left: -14rpx;
	}
</style>
