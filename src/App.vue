<template>
  <div id="app">
    <nav>
    </nav>
    <router-view/>
  </div>
</template>

<style>
  body{
   background: #F7F8FA;
   height: 100vh;
   width: 100%;
}
#app {
  height: 100%;
  min-width: 1200px;

}
*{
  margin: 0;
  padding: 0;
}
 .flex{
  display: flex;
  align-content: center;
  justify-content: center;
 }
</style>
