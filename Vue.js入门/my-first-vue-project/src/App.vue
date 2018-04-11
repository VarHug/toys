<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view/> -->
    <h1>{{title}}</h1>
    <input type="text" v-model="newItem" v-on:keyup.enter="addNew()">
    <ul>
      <li v-for="item in items" v-bind:class="{finished: item.isFinished}"  v-on:click="toggleFinish(item)">
        {{item.label}}
      </li>
    </ul>
    <h1 v-text="title2"></h1>
    <h1 v-html="title3"></h1>
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
          isFinished: true
        },
        {
          label: 'walking',
          isFinished: true
        }
      ],
      newItem : ''
    }
  },
  methods : {
    toggleFinish: function (item) {
      item.isFinished = !item.isFinished;
    },
    addNew: function () {
      this.items.push({
        label: this.newItem,
        isFinished: false
      });
      this.newItem = '';
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
