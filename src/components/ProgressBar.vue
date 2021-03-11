<template>
  <div id="wrapper">
    <div class="inner-class">
      <div v-if="progressBarError">0%</div>
      <div v-else>{{ progress }}%</div>
      <div class="loading-bar" :style="progressBarError ? `background-color: '#f5c6cb'` : `backgroundColor: '#428bca'`">
        <div class="percentage" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
        progress: Number,
        progressBarError: Boolean
  },

  data() {
    return {
      percentage: 0
    };
  },

  // computed: {
  //   errorBackground() {
  //     console.log("errrr:::",this.errorBackground)
  //     if(this.progressBarError) {
  //       console.log("in compuytes")
  //         return { backgroundColor: '#f5c6cb' }
  //     }
  //     return "#f5bhdh"
  //   }
  // },
  // created() {
  //   var intval = setInterval(() => {
  //     if (this.percentage < 100) this.percentage += 0.1;
  //     else clearInterval(intval);
  //   }, 1000000);
  // }
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  width: 100vh;
  height: 50vh;
  overflow: hidden;
}

#wrapper {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  color: #222;
  width: 100%;
  /* height: 50vh; */
  /* background: linear-gradient(to bottom, #efefef, #ccc); */
  display: flex;
  justify-content: center;
  align-items: center;
}

.inner-class {
  text-align: center;
  font-size: 2rem;
  color: #fff;
}

.loading-bar {
  position: relative;
  width: 400px;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  box-shadow: inset 0 -2px 1px rgba(255, 255, 255, 0.3),
    inset 0 -2px 6px rgba(0, 0, 0, 0.4);
}

.loading-bar .percentage {
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  display: block;
  height: 100%;
  border-radius: 15px;
  background-color: #428bca; /*#df2449 */ /*#428bca*/ /**#04df80 *//*#f5c6cb*/
  background-size: 30px 30px;
  background-image: linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
  animation: animate-stripes 3s linear infinite;
}

@keyframes animate-stripes {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 60px 0;
  }
}
</style>
