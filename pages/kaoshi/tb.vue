<template>
	<view>
		<block v-for="(item,key1) in tm" :key="index">
			<view>
				选择题{{key1}}
				<view v-for="(item2,index3) in item" :key="index2">
					<span @click="test(key1,index3)">{{item2}}</span>
				</view>
			</view>
			<view>
				<!-- {{key}}	<span>[A]</span> <span>[B]</span> <span>[C]</span> <span>[D]</span> -->
			</view>
		</block>
		<view>
			<block v-for="(item,key) in dt" :key="index">
				二题：问答题{{item}}
				<view @click="sctm(key)">拍照上传</view>
				<image :src="idata['xs'+item]" v-if="idata['xs'+item]"></image>
			</block>
		</view>
		<view @click="tst">测试DOM</view>
		<view @click="tijiao">提交</view>
	</view>
</template>

<script>
	import yu from '../../yu.js'
	export default {
		data() {
			return {
				idata: {},
				tm: {
					"1": ["A", "B", "C", "D"],
					"2": ["A", "B"],
					"3": ["A", "B"],
					"4": ["A", "B", "C", "D"],
					"5": ["A", "B", "C"],
					"6": ["A", "B", "C"]
				},
				dt: [1, 2, 3]
			}
		},
		created() {
			//this.idata.xs = '../../../img.png';
			console.log("creat");
		},
		onLoad() {
			console.log("onload");
		},
		methods: {
			test(key, ans) {
				this.idata['xz'+key] = this.tm[key][ans];
				console.log(JSON.stringify(this.idata));
			},
			sctm(item) {
					console.log(item);
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
					
						that.$delete(that.idata, "xs"+ that.dt[item]);
						that.$set(that.idata, "xs"+that.dt[item], res.tempFilePaths[0]);
					}
				});
			},
			tst() {
				this.$delete(this.idata, "xs1");
				this.$set(this.idata, "xs1", "../../../static/logo.png");
				this.$delete(this.idata, "xs2");
				this.$set(this.idata, "xs2", "../../../static/logo.png");
				//this.idata.xs = "../../../static/logo.png";
				console.log(this.idata.xs1);
				//document.getElementById("xs2").src = "../../../static/logo.png";
			},

			async tijiao() {
				let jg = await yu.upfilet("");
				console.log(jg);
				var a = new Object();

				yu.dpost("name", (data) => {

					console.log(JSON.stringify(data));
					if (data.err_code == 0) {

					} else {
						plus.nativeUI.alert(data.err_msg);
					}
				}, a)
			}
		}
	}
</script>

<style>

</style>
