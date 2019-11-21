<template>
  <div id="contenedora" class="colorSecundario">
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
*{
  font-family: 'Montserrat';
  box-sizing: border-box !important;
}

#contenedora{
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: nowrap;
  
  
}
#sidebar{
  background-color: green;
  height: 100vh;
  position: fixed;
  width: 150px;
}

#main{
  width: 100%;

  margin-left: 150px;
}
</style>