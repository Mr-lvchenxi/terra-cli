<template>
  <div class="example">
    <Test_cx/>
  </div>
</template>

<script>
import Test_cx from '../index.vue'
export default {
  name: 'demo',
  components: {
  Test_cx
},
data() {
  return {
    msg: 'Hello Webpack'
  };
},
};
</script>

<style>
.example {
  color: red;
}
.images {
  width: 100px;
}
</style>
