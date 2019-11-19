<template>
  <div id="contenedora">
    <div id="sidebar">
      <Sidebar>
    </div>
    <div id="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from './Components/Layout/Sidebar.vue'
export default {
  data() {
    return {
      
    }
  },
  components: {
    Sidebar
  }
};
</script>

<style scoped>
#contenedora{
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  background-color: red;
}
#sidebar{
  background-color: green;
  height: 100vh;
  width: 10vw;
}

#main{
  width: 100%;
  background-color: yellow;
}
</style>