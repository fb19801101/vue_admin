<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li>|</li>
        <li>
          <router-link to="/login">Login</router-link>
          <ul>
            <li><router-link to="/login/success">Success</router-link></li>
            <li><router-link to="/login/error">Error</router-link></li>
          </ul>
        </li>
        <li>|</li>
        <li><router-link to="/student">Student</router-link></li>
        <li>|</li>
        <li><router-link to="/measure">Measure</router-link></li>
        <li>|</li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<!--npm i stylus stylus-loader &#45;&#45;save-dev-->
<style scoped lang="stylus">
#app {
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
}

*{ margin:0; padding:0; }
#nav{ width:380px; height:25px; margin:0 auto; }
#nav ul{ list-style:none; margin:0; padding:0; }
#nav ul li{ float:left; line-height:25px; text-align:center; position:relative; }
#nav ul li a{ text-decoration:none; color:#0000d2; display:block; padding:0 10px; }
#nav ul li a:hover{ color:#eeeeee; background:#5c5c5c; }
#nav ul li ul{ float:left; position:absolute; display:none; padding:0; }
#nav ul li ul li{ float:none; line-height:20px; text-align:left; }
#nav ul li ul li a{ text-decoration:none; color:#a8a8a8; display:block; margin-left:10px; padding:0 10px; }
#nav ul li ul li a:hover{ background-color:#0076ee; }
#nav ul li:hover ul{ display:block }
</style>
