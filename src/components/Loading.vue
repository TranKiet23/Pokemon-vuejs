<template>
  <div class="container" style="z-index: 100000">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      style="margin: auto; display: block" width="150px" height="150px" viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid">
      <path d="M6 50A44 44 0 0 0 94 50A44 46.2 0 0 1 6 50" fill="#0042b4" stroke="none"
        transform="rotate(307.753 50 51.1)">
        <animateTransform attributeName="transform" type="rotate" dur="0.9345794392523364s" repeatCount="indefinite"
          keyTimes="0;1" values="0 50 51.1;360 50 51.1" />
      </path>
    </svg>
    <!-- <img src="/ico-nam.png"  class="image-loading"/> -->
  </div>
</template>
<script>
export default {
  name: 'loading',
}
</script>

<style lang="scss">
.container {
  position: fixed;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>