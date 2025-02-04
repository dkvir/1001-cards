<template>
  <div class="loader">
    <div id="text">1001</div>
  </div>
</template>

<script setup>
onMounted(() => {
  const scrambleText = new useScrambleText(document.getElementById("text"), {
    timeOffset: 1000,
    chars: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    callback: function () {
      console.log("ended");
    },
  }).play();
  setTimeout(() => {
    scrambleText.start();
  }, 1000);
});
</script>

<style lang="scss" scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: 5;
  width: 100vw;
  height: 100dvh;
}
</style>
