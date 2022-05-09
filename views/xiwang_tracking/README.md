## 安装

```bash
npm i @k9/xiwang_tracking -S
```

## 引入

```
import xesLog from '@k9/xiwang_tracking'

// 将 Xiwang_tracking 挂载到 window 上
window.xesLog = xesLog(object)

// 将 $Xiwang_tracking 挂载到 vue 实例上
Vue.prototype.$xesLog = xesLog(object)
```

## 入参（object）

| 事件名 | 说明 | 参数 |
| event_env | 环境 | prod=生产环境，test=测试环境 |
| proj_id | 项目 id，必传，集团未来埋点平台申请 | '027_7274' |
| show_log | 是否开启日志打印，默认关闭 | false |
| auto_track | 是否开启全埋点，默认关闭 | false |
| collect_tags | 是否开启其他任意元素的全埋点采集（默认不采集），详见全埋点说明模块 | {} |
| source | 来源，必传，取值逻辑参考(1=android 手机端/2=ios 手机端/3=app 内嵌 h5/4=小程序内嵌 h5/5=微信 app 内游离 h5(非小程序)/6=服务器后端/7=QQapp 内游离 h5/8=Web 端/9=ipad 端/10=安卓 pad/11=小程序原生/12=授课端/13=新辅导端/14=老辅导端/100=其它 | '5' |
| saas | 是否埋点上传地址是 saas 部署的域名，传 true 为 saas 上传的域名地址，不传或者传 false 为培优埋点地址,默认值为 false | true |

## 注意事项

- 适用场景，用户登录后，可以通过该方法进行用户信息设置，后续上报的埋点数据均会携带用户信息

```
xesLog.setProfile({
  user_name: '',
  sex: '',
  gid: '',
  user_id: '',
  user_role: '',
  city: '',
  city_code: '',
  city_id: '',
  union_id: '',
  app_id: '',
  open_id: '',
  grade: '',
  grade_id: ''
});
```

- 以上字段的 key 均为 SDK 内部定义，调用 setProfile 时，不支持修改，不支持增加，value 可以按照实际需要传入，如不需要或者 value 为空则可省略传入。
  gid 字段，游客 id，默认 SDK 内部随机生成 uuid，如业务需要自定义，支持传入。

## API Events

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |


## 其他

有问题可知音楼联系：晨曦老师
