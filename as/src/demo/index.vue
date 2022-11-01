<template>
  <div class="example">
    <As/>
  </div>
</template>

<script>
import As from '../index.vue'
export default {
  name: 'demo',
  components: {
  As
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
