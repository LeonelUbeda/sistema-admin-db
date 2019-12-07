<template>
  <div id="contenedora" class="colorSecundario">
    <!--div class="width-100"-->
      <div id="sidebar" v-if="this.$store.state.Loggeado && !$store.state.Loading">
        <Sidebar>
      </div>
      <div id="main" 
      :class="[{'width-100 temp flex justify-center items-center': !$store.state.Loggeado},
      {'margin': this.$store.state.Loggeado}]" v-if="!$store.state.Loading">
        <router-view></router-view>
      </div>
      <loading :active.sync="$store.state.Loading" 
        
        :is-full-page="true"></loading>
    </div>
  <!--/div-->
</template>

<script>
import Sidebar from './Components/Layout/Sidebar.vue'
import Login from './Sections/Login.vue'
import Loading from 'vue-loading-overlay';
  
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  data() {
    return {
      
    }
  },
  components: {
    Sidebar,
    Login,
    Loading
  }
};
</script>

<style scoped>
*{
  font-family: 'Montserrat';
  box-sizing: border-box !important;
}

#contenedora{
  min-width: 800px;
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

  
}

.margin{
  margin-left: 150px;
}
</style>