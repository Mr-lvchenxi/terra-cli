import Video from './index';

Video.install = function (Vue) {
  Vue.component(Video.name, Video);
};

export default Video;