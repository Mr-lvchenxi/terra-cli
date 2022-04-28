"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _icon_play = _interopRequireDefault(require("./images/icon_play.png"));

require("./index-sfc.css");

// import BrowserUtil from "@xes/browser_util";
// const { isApp } = BrowserUtil;
var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "video",
    "class": _vm.classTitle
  }, [_c('video', {
    ref: "replyVideo",
    staticClass: "replyVideo",
    attrs: {
      "x5-video-player-fullscreen": "false",
      "x5-video-orientation": "portrait",
      "x-webkit-airplay": "true",
      "x5-video-player-type": "h5-page",
      "x5-playsinline": "true",
      "playsinline": "true",
      "webkit-playsinline": "true",
      "src": _vm.videoInfo.videoSrc,
      "autoplay": _vm.videoConfig.autoplay,
      "controls": _vm.videoConfig.controls,
      "controlsList": _vm.videoConfig.controlslist,
      "preload": _vm.videoConfig.preload,
      "loop": _vm.videoConfig.loop
    },
    on: {
      "play": _vm.videoPlay,
      "pause": _vm.videoPause,
      "error": _vm.videoError,
      "ended": _vm.videoEnded
    }
  }), _vm._v(" "), !_vm.isFirstIn ? _c('div', {
    staticClass: "mask"
  }) : _vm._e(), _vm._v(" "), !_vm.isFirstIn ? _c('div', {
    staticClass: "videoPoster",
    style: {
      backgroundImage: 'url(' + _vm.videoInfo.videoPoster + ')'
    }
  }) : _vm._e(), _vm._v(" "), !_vm.isFirstIn ? _c('div', {
    staticClass: "play_btn",
    style: {
      backgroundImage: "url(" + _vm.playBtnImg + ")"
    },
    on: {
      "click": function click($event) {
        $event.stopPropagation();
        return _vm.playVideo.apply(null, arguments);
      }
    }
  }) : _vm._e()]);
};

var __vue_staticRenderFns__ = [];
var _default2 = {
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__,
  name: "Video",
  props: {
    videoConfig: {
      type: Object,
      "default": function _default() {
        return {
          autoplay: false,
          controls: "controls",
          controlslist: "",
          // nodownload, nofullscreen, noremoteplayback
          preload: "metadata",
          // metadata, auto, none
          loop: false
        };
      }
    },
    videoInfo: {
      type: Object,
      "default": function _default() {
        return {
          videoSrc: "",
          videoPoster: ""
        };
      }
    },
    isShowNotWifi: {
      type: Boolean,
      "default": false
    },
    clickId: {
      type: Number,
      "default": 1
    },
    playBtnImg: {
      type: String,
      "default": _icon_play["default"]
    },
    classTitle: {
      type: String,
      "default": ""
    },
    commonStyle: {
      type: Object,
      "default": function _default() {
        return {
          btnBg: _icon_play["default"],
          className: ""
        };
      }
    },
    // 统计时长节点。min为单位
    pointTime: {
      type: Array,
      "default": function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      isShowFlag: this.isShowNotWifi,
      networkType: 1,
      // 1 wifi 2 移动
      isFirstIn: false,
      // 是否第一次进入。展示蒙层，播放按钮
      hasSetPointTimer: false,
      // 是否设置时间节点计时器
      videoDom: null // isApp: isApp,

    };
  },
  computed: {
    pointTimer: function pointTimer() {
      return new Array(this.pointTime.length);
    }
  },
  watch: {
    "videoInfo.videoSrc": function videoInfoVideoSrc() {
      // console.log('----- watch')
      this.isFirstIn = true;
      this.hasSetPointTimer = false;
      this.pointTimer.map(function (v) {
        return clearInterval(v);
      });
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.getNetWorkStatus();
    this.videoDom = this.$refs.replyVideo;
    this.videoDom.addEventListener("loadedmetadata", function () {
      // console.log('on loaded meta data... ...')
      if (!_this.hasSetPointTimer) {
        _this.setPointTimer();
      }
    });
  },
  unmounted: function unmounted() {
    this.pointTimer.map(function (v) {
      return clearInterval(v);
    });
  },
  methods: {
    setPointTimer: function setPointTimer() {
      var _this2 = this;

      this.hasSetPointTimer = true;
      var duration = this.videoDom.duration;
      console.log(duration);
      this.pointTime.filter(function (v) {
        return v <= duration;
      }).map(function (v, i) {
        console.log("v", v); // if (v <= duration) return

        _this2.pointTimer[i] = setInterval(function () {
          _this2.$emit("clickMsg", {
            clickid: _this2.clickid,
            videoUrl: _this2.videoInfo.videoSrc,
            action: "pointTime",
            point: v
          });

          clearInterval(_this2.pointTimer[i]);
          _this2.pointTimer[i] = null;
        }, v * 1000);
      });
    },

    /**
     * @description: App获取网络状态
     */
    getNetWorkStatus: function getNetWorkStatus() {
      if (window.xesApp) {
        this.networkType = window.xesApp.getNetWorkStatus();
        console.log("当前网络环境为", this.networkType);
      }
    },
    playVideo: function playVideo() {
      if (this.networkType === 2 && this.isShowFlag) {
        return false;
      }

      this.$refs.replyVideo.play();
      this.$emit("clickMsg", {
        clickid: this.clickid,
        clicklevel: "1",
        videoUrl: this.videoInfo.videoSrc,
        action: "playVideo",
        elemname: "点击播放视频"
      });
      console.log("playVideo======点击播放视频");
    },
    goOnPlay: function goOnPlay() {
      this.isShowFlag = false;
      this.$refs.replyVideo.play();
      this.$emit("clickMsg", {
        clickid: this.clickid,
        clicklevel: "1",
        videoUrl: this.videoInfo.videoSrc,
        action: "goOnPlay",
        elemname: "视频继续播放"
      });
      console.log("goOnPlay======视频继续播放");
    },
    videoPlay: function videoPlay() {
      this.isFirstIn = true;
      this.$emit("clickMsg", {
        clickid: this.clickid,
        clicklevel: "1",
        videoUrl: this.videoInfo.videoSrc,
        action: "videoPlay",
        elemname: "视频播放中"
      });
      this.$emit("videoApi", {
        type: "Play"
      });
      console.log("videoPlay======视频播放");
    },
    videoPause: function videoPause() {
      this.$emit("clickMsg", {
        clickid: this.clickid,
        clicklevel: "1",
        videoUrl: this.videoInfo.videoSrc,
        action: "videoPause",
        elemname: "暂停播放视频"
      });
      this.$emit("videoApi", {
        type: "Pause"
      });
      console.log("videoPause======播放暂停");
    },
    videoError: function videoError(e) {
      this.$emit("clickMsg", {
        clickid: this.clickid,
        videoUrl: this.videoInfo.videoSrc,
        msg: JSON.stringify(e, ["message", "arguments", "type", "name"]),
        action: "videoError",
        elemname: "视频错误监听"
      });
      this.$emit("videoApi", {
        type: "Error",
        content: e
      });
      console.log("videoError======播放出错");
    },
    videoEnded: function videoEnded() {
      this.$emit("clickMsg", {
        clickid: this.clickid,
        clicklevel: "1",
        videoUrl: this.videoInfo.videoSrc,
        action: "videoEnded",
        elemname: "视频播放完成"
      });
      this.$emit("videoApi", {
        type: "Ended"
      });
      console.log("videoEnded======视频播放完成");
    }
  }
};
exports["default"] = _default2;