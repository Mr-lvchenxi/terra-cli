import Video from './index.vue'

Video.install = function (Vue) {
Vue.component(Video.name, Video)
}

export default Video
