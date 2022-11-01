<template>
  <div class="example">
    <Ar/>
  </div>
</template>

<script>
import Ar from '../index.vue'
export default {
  name: 'demo',
  components: {
  Ar
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
