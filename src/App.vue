<template>
  <div id="flashMessage" v-if="GStore.flashMessage">
    {{ GStore.flashMessage }}
  </div>
  <div style="margin-top: 30px;">

  </div>
  <span id="nav">
    <router-link :to="{ name: 'EventList' }">Home</router-link>
  </span>

  <!-- new element -->
  <router-view />
</template>
<script>
export default {
  inject: ['GStore'] // <----
}
</script>
<style>
@keyframes yellowfade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}
body{
  background-image: url('../src/assets/bg.jpg');
  background-size: cover;
  height: auto;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
#flashMessage {
  animation-name: yellowfade;
  animation-duration: 3s;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none ;
  font-size: medium;
}


#nav a.router-link-exact-active {
  color: #3f4798;
}
h4 {
  font-size: 20px;
}
</style>
