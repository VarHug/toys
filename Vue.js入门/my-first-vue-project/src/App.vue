<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view/> -->
    <h1>{{title}}</h1>
    <h1 v-text="title2"></h1>
    <h1 v-html="title3"></h1>
    <ul>
      <li v-bind:class="{finished: item.isFinished}" v-for="item in items">
        {{item.label}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // name: 'App'
  data() {
    return {
      title : 'this is a todo list',
      title2 : 'this is a title2 test',
      title3 : '<p>this is a v-html test</p>',
      items : [
        {
          label: 'coding',
          isFinished: false
        },
        {
          label: 'walking',
          isFinished: true
        }
      ],
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.finished {
  text-decoration: underline;
}
</style>
