<template>
  <div class="example">
    {{ msg }}
    <img src="./images/test.png" alt="" class="images" />
  </div>
</template>

<script>
export default {
  name: "Test_cx",
  data() {
    return {
      msg: "Hello Webpack2222",
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
