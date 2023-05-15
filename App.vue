<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			const updateManager = uni.getUpdateManager();
			
			updateManager.onCheckForUpdate(function(res) {
				console.log(res.hasUpdate);
			});
			updateManager.onUpdateReady(function(res) {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
						if (res.confirm) {
							updateManager.applyUpdate();
						}
					}
				});
			
			});
			updateManager.onUpdateFailed(function(res) {
				// 新的版本下载失败
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	view {
		font-size: 28rpx;
	}

	/*伸缩盒子*/

	.flex {
		display: flex;
		display: -webkit-flex;
	}

	.flex-1 {
		flex: 1;
	}

	.flex-center {
		align-content: center;
		align-items: center;
	}

	.flex-wrap {
		flex-flow: wrap;
	}

	.justify-content-c {
		justify-content: center;
	}

	.flex-between {
		justify-content: space-between;
	}

	.flex-column {
		flex-direction: column
	}
</style>
