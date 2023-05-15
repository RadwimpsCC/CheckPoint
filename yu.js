export const surl = "https://yue.2tt.net/pages/JiaZhangAction.ashx";
//封装ALERT
export const alert = (str) => {
	plus.nativeUI.alert(str)
}
//封装ALERT2使用
export const alert2 = (str) => {
	uni.showModal({
		title: '温馨提示',
		content: str,
		showCancel: false
	});
}
//封装提示信息
export const ts = (str) => {
	uni.showToast({
		title: str
	})
}
//封装推送信息
export const showts = (str) => {
	plus.push.clear();
	uni.setStorageSync("ms", "");
	uni.showModal({
		title: "温馨提示",
		content: str,
		confirmText: '去查看',
		success: function(res) {
			if (res.confirm) {
				uni.navigateTo({
					url: '../my/my_friends'
				})
				console.log('用户点击确定');
			}
		}
	});
}


//同步HTTP访问
export const tpost = function(a) {
	return uni.request({
		url: surl,
		data: JSON.stringify(a),
		method: "POST"
	});
};

//异步HTTP访问
export const ypost = function(a, successback) {
	plus.nativeUI.showWaiting();
	var aToStr = JSON.stringify(a);
	uni.request({
		url: surl,
		data: aToStr,
		method: "POST",
		success: function(res) {
			plus.nativeUI.closeWaiting();
			successback(res.data);
		},
		fail(e) {
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(e))
		}
	});
}
//异步HTTP访问A
export const dpost = function(cmd, successback, data, xs) {
	var a = new Object();
	a.code = cmd;
	a.token = uni.getStorageSync("token");
	if (typeof(data) != undefined) a.data = data;
	if (xs == 1) {
		uni.showLoading({
			title: '加载中',
			mask: true
		});
	}
	var aToStr = JSON.stringify(a);
	uni.request({
		url: surl,
		data: aToStr,
		method: "POST",
		success: function(res) {
			successback(res.data);
			if (xs == 1) {
				setTimeout(function() {
					uni.hideLoading();
				}, 1000);
			}
		},
		fail(e) {
			console.log(JSON.stringify(e));
			if (xs == 1) {
				setTimeout(function() {
					uni.hideLoading();
				}, 2000);
			}
		}
	});
}
//记录位置
export const getpos = function() {
	uni.getLocation({
		type: 'wgs84',
		success: function(res) {
			var a = new Object();
			a.wd = res.latitude;
			a.jd = res.longitude;
			console.log('当前经度：' + res.longitude);
			console.log('当前纬度：' + res.latitude);
			dpost("getpos", (data) => {}, a)
		}
	});
}
//分页默认是10条每一页
export const fenye = function(nowp, pc) {
	let allp = Math.ceil(pc / 10);
	console.log(allp);
	let fylist = [];
	if (allp <= 5) {
		for (let i = 1; i <= allp; i++) {
			fylist.push(i);
		}
	} else {
		//当前页面前部分
		if (nowp - 4 > 0) {
			fylist = [1, '..', nowp - 2, nowp - 1, nowp];
			if (nowp == allp) return [1, '..', nowp - 3, nowp - 2, nowp - 1, nowp];
			//当前页面后部分
			if (nowp + 3 < allp) {
				fylist.push(nowp + 1);
				fylist.push(nowp + 2);
				fylist.push('..');
				fylist.push(allp);
			} else {
				for (let i = nowp + 1; i < allp; i++) {
					fylist.push(i);
				}
				fylist.push(allp)
			}
		} else {
			for (let i = 0; i < 5; i++) {
				fylist.push(i + 1);
			}
			if (8 < allp) {
				fylist.push('..');
				fylist.push(allp);
			} else {
				for (let i = 6; i < allp; i++) {

					fylist.push(i);
				}
				fylist.push(allp)
			}
		}

	}
	return fylist;

};
//选图
export const chooseimg = function(sl, successback) {
	uni.chooseImage({
		count: sl, //默认9
		sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
		sourceType: ['album', 'camera'], //从相册选择
		success: function(res) {
			successback(res);
		}
	});
};

//上传单张图片
export const upfile = function(a, pic, successback) {
	var aToStr = JSON.stringify(a);
	uni.uploadFile({
		url: surl + '?token=' + uni.getStorageSync("token"), //仅为示例，非真实的接口地址
		filePath: pic,
		name: 'file',
		formData: {
			'js': aToStr
		},
		success: (uploadFileRes) => {
			var result = JSON.parse(uploadFileRes.data);
			successback(result);
		},
		fail() {

		}
	});
};
//上传单张图片
export const upfilet = function(pic) {
	return uni.uploadFile({
		url: surl + '?token=' + uni.getStorageSync("token"), //仅为示例，非真实的接口地址
		filePath: pic,
		name: 'file',
		formData: {
			'code': 20
		}
	});
};
//获取单张纸张
export const getimginfo = function(pic) {
	return uni.getImageInfo({
		src: pic, //仅为示例，非真实的接口地址
	});
};
//上传单张图片
export const aliupfile = function(pic, accid, mpolicy, msignature, dir) {
	return uni.uploadFile({
		url: 'https://aitantao.oss-cn-qingdao.aliyuncs.com', //仅为示例，非真实的接口地址
		filePath: pic,
		name: 'file',
		formData: {
			key: dir, //图片在oss的路径
			policy: mpolicy,
			OSSAccessKeyId: accid,
			signature: msignature,

		}
	});
};
//上传图片组
export const upfiles = function(a, pics, successback) {
	var aToStr = JSON.stringify(a);
	var newlist = [];
	for (var i = 0; i < pics.length; i++) {
		newlist.push({
			name: "t" + i.toString(),
			uri: pics[i]
		})
	}
	if (newlist.length == 0) newlist = [{
		name: 'no',
		uri: 'no'
	}];
	uni.showLoading({
		title: "提交中..",
		mask: true
	});
	console.log(newlist);
	uni.uploadFile({
		url: surl + '?token=' + uni.getStorageSync("token"), //仅为示例，非真实的接口地址
		files: newlist, //参数是一个 file 对象的数组，file 对象的结构如下：name	String ==uri	String
		formData: {
			'js': aToStr
		},
		success: (uploadFileRes) => {
			uni.hideLoading();
			console.log(uploadFileRes);
			var result = JSON.parse(uploadFileRes.data);
			successback(result);
		},
		fail: (e) => {
			uni.hideLoading();
			console.log(JSON.stringify(e));
		}
	});
};

//封装模态窗口
export const showModal = (str, successback) => {
	uni.showModal({
		title: "温馨提示",
		content: str,
		confirmText: '确定',
		success: function(res) {
			if (res.confirm) {
				successback()
			}
		}
	});
};
//封装跳转
export const tz = (url1, type) => {
	if (type == 1) {
		uni.switchTab({
			url: url1
		})
	} else {
		uni.navigateTo({
			url: url1
		})
	}
}
export default {
	alert,
	alert2,
	ypost,
	tpost,
	chooseimg,
	upfile,
	upfilet,
	upfiles,
	ts,
	tz,
	fenye,
	dpost,
	getpos,
	showts,
	showModal,
	surl,
	aliupfile,
	getimginfo
}
