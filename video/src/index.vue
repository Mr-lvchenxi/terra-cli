<template>
  <div class="video" :class="commonStyle.className">
    <video
      class="replyVideo"
      ref="replyVideo"
      x5-video-player-fullscreen="false"
      x5-video-orientation="portrait"
      x-webkit-airplay="true"
      x5-video-player-type="h5-page"
      x5-playsinline="true"
      playsinline="true"
      webkit-playsinline="true"
      :src="videoInfo.videoSrc"
      :autoplay="videoConfig.autoplay"
      :controls="videoConfig.controls"
      :controlsList="videoConfig.controlslist"
      :preload="videoConfig.preload"
      :loop="videoConfig.loop"
      @play="videoPlay"
      @pause="videoPause"
      @error="videoError"
      @ended="videoEnded"
    ></video>
    <!-- 视频封面蒙层 -->
    <div class="mask" v-if="!isFirstIn"></div>
    <!-- 封面图 begin -->
    <div
      class="videoPoster"
      v-if="!isFirstIn"
      :style="{ backgroundImage: 'url(' + videoInfo.videoPoster + ')' }"
    ></div>
    <div
      class="play_btn"
      v-if="!isFirstIn"
      :style="{ backgroundImage: `url(${commonStyle.btnBg})` }"
      @click.stop="playVideo"
    ></div>
    <!-- 非WIFI begin -->
    <!-- <div
      class="video_no_wifi"
      v-show="isApp && networkType === 2 && isShowFlag"
    >
      <p>正在使用非WI-FI网络，播放将消耗流量</p>
      <span @click.stop="goOnPlay">继续播放</span>
    </div> -->
  </div>
</template>

<script>
// import BrowserUtil from "@xes/browser_util";
import btnBg from "./images/icon_play.png";
// const { isApp } = BrowserUtil;
export default {
  name: "Video",
  props: {
    videoConfig: {
      type: Object,
      default: () => {
        return {
          autoplay: false,
          controls: "controls",
          controlslist: "", // nodownload, nofullscreen, noremoteplayback
          preload: "metadata", // metadata, auto, none
          loop: false,
        };
      },
    },
    videoInfo: {
      type: Object,
      default: () => {
        return {
          videoSrc: "",
          videoPoster: "",
        };
      },
    },
    isShowNotWifi: {
      type: Boolean,
      default: false,
    },
    clickId: {
      type: Number,
      default: 1,
    },
    commonStyle: {
      type: Object,
      default: () => {
        return {
          btnBg: btnBg,
          className: "",
        };
      },
    },
    // 统计时长节点。min为单位
    pointTime: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isShowFlag: this.isShowNotWifi,
      networkType: 1, // 1 wifi 2 移动
      isFirstIn: false, // 是否第一次进入。展示蒙层，播放按钮
      hasSetPointTimer: false, // 是否设置时间节点计时器
      videoDom: null,
      // isApp: isApp,
    };
  },
  computed: {
    pointTimer() {
      return new Array(this.pointTime.length);
    },
  },
  watch: {
    "videoInfo.videoSrc"() {
      // console.log('----- watch')
      this.isFirstIn = true;
      this.hasSetPointTimer = false;
      this.pointTimer.map((v) => clearInterval(v));
    },
  },
  mounted() {
    this.getNetWorkStatus();
    this.videoDom = this.$refs.replyVideo;
    this.videoDom.addEventListener("loadedmetadata", () => {
      // console.log('on loaded meta data... ...')
      if (!this.hasSetPointTimer) {
        this.setPointTimer();
      }
    });
  },
  unmounted() {
    this.pointTimer.map((v) => clearInterval(v));
  },
  methods: {
    setPointTimer() {
      this.hasSetPointTimer = true;
      const duration = this.videoDom.duration;
      console.log(duration);
      this.pointTime
        .filter((v) => v <= duration)
        .map((v, i) => {
          console.log("v", v);
          // if (v <= duration) return
          this.pointTimer[i] = setInterval(() => {
            this.$emit("clickMsg", {
              clickid: this.clickid,
              videoUrl: this.videoInfo.videoSrc,
              action: "pointTime",
              point: v,
            });
            clearInterval(this.pointTimer[i]);
            this.pointTimer[i] = null;
          }, v * 1000);
        });
    },
    /**
     * @description: App获取网络状态
     */
    getNetWorkStatus() {
      if (window.xesApp) {
        this.networkType = window.xesApp.getNetWorkStatus();
        console.log("当前网络环境为", this.networkType);
      }
    },
    playVideo() {
      if (this.networkType === 2 && this.isShowFlag) {
        return false;
      }
      this.$refs.replyVideo.play();
      this.$emit("clickMsg", {
        clickid: this.clickid,
        clicklevel: "1",
        videoUrl: this.videoInfo.videoSrc,
        action: "playVideo",
        elemname: "点击播放视频",
      });
      console.log("playVideo======点击播放视频");
    },
    goOnPlay() {
      this.isShowFlag = false;
      this.$refs.replyVideo.play();
      this.$emit("clickMsg", {
        clickid: this.clickid,
        clicklevel: "1",
        videoUrl: this.videoInfo.videoSrc,
        action: "goOnPlay",
        elemname: "视频继续播放",
      });
      console.log("goOnPlay======视频继续播放");
    },
    videoPlay() {
      this.isFirstIn = true;
      this.$emit("clickMsg", {
        clickid: this.clickid,
        clicklevel: "1",
        videoUrl: this.videoInfo.videoSrc,
        action: "videoPlay",
        elemname: "视频播放中",
      });
      this.$emit("videoApi", { type: "Play" });
      console.log("videoPlay======视频播放");
    },
    videoPause() {
      this.$emit("clickMsg", {
        clickid: this.clickid,
        clicklevel: "1",
        videoUrl: this.videoInfo.videoSrc,
        action: "videoPause",
        elemname: "暂停播放视频",
      });
      this.$emit("videoApi", { type: "Pause" });
      console.log("videoPause======播放暂停");
    },
    videoError(e) {
      this.$emit("clickMsg", {
        clickid: this.clickid,
        videoUrl: this.videoInfo.videoSrc,
        msg: JSON.stringify(e, ["message", "arguments", "type", "name"]),
        action: "videoError",
        elemname: "视频错误监听",
      });
      this.$emit("videoApi", { type: "Error", content: e });
      console.log("videoError======播放出错");
    },
    videoEnded() {
      this.$emit("clickMsg", {
        clickid: this.clickid,
        clicklevel: "1",
        videoUrl: this.videoInfo.videoSrc,
        action: "videoEnded",
        elemname: "视频播放完成",
      });
      this.$emit("videoApi", { type: "Ended" });
      console.log("videoEnded======视频播放完成");
    },
  },
};
</script>

<style lang="less">
.video {
  width: 100%;
  height: 300px;
  position: relative;
  margin: auto;
  font-size: 0;

  video {
    background-color: rgba(0, 0, 0, 0.7);
    object-fit: fill; // 设置poster的大小
  }

  .replyVideo,
  .mask,
  .videoPoster,
  .video_no_wifi,
  .play_btn {
    width: 100%;
    height: 100%;
    margin: auto;
    position: absolute;
  }

  .play_btn {
    top: 0;
    z-index: 5;
    //background-image: url('./images/icon_play.png');
    background-position: center;
    background-size: 55px;
    background-repeat: no-repeat;
  }

  .video_no_wifi,
  .videoPoster,
  .mask {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .mask {
    z-index: 5;
    background: #000;
    opacity: 0.3;
  }

  .videoPoster {
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 4;
  }

  .video_no_wifi {
    z-index: 6;
    background: #212831;

    p {
      margin: 69px 0 12px 0;
      font-size: 12px;
      font-weight: 400;
      text-align: center;
      color: #fff;
      text-shadow: 0 1px 6px rgba(111, 61, 5, 0.1);
    }

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 32px;
      margin: 0 auto;
      font-size: 14px;
      font-weight: 400;
      text-align: center;
      color: #fff;
      background: #eb002a;
      border-radius: 16px;
      box-shadow: 0 1px 6px 0 rgba(111, 61, 5, 0.1);
      text-shadow: 0 1px 6px rgba(111, 61, 5, 0.1);
    }
  }
}
</style>
