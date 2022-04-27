<template>
  <div class="example">
    <Video :video-info="videoInfo" />
  </div>
</template>

<script>
import Video from "../index.vue";
export default {
  name: "demo",
  components: {
    Video,
  },
  data() {
    return {
      videoInfo: {
        videoSrc:
          "https://static0.xesimg.com/growth-h5-activity/0001626943642908.mp4?pipeline=fm,",
        videoPoster:
          "https://editor.xesimg.com/tailor/resource/abc-1622689222823.png",
      },
    };
  },
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.example {
  color: red;
}
.images {
  width: 100px;
}
</style>
