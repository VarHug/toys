<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view/> -->
    <h1>{{title}}</h1>
    <input class="todo-input" type="text" v-model="newItem" v-on:keyup.enter="addNew()">
    <ul class="todolist">
      <li v-for="item in items" v-bind:class="{finished: item.isFinished}"  v-on:click="toggleFinish(item)">
        {{item.label}}
      </li>
    </ul>
    <h1 v-text="title2"></h1>
    <h1 v-html="title3"></h1>
  </div>
</template>

<script>
import Store from './store.js';

export default {
  // name: 'App'
  data() {
    return {
      title : 'this is a todo list',
      title2 : 'this is a title2 test',
      title3 : '<p>this is a v-html test</p>',
      items : Store.fetch(),
      newItem : ''
    }
  },
  watch: {
    items: {
      handler: function (items) {
        Store.save(items);
      },
      deep: true
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
.todo-input {
  width: 240px;
  margin: 0 auto;
  margin-left: 40px;
}
.todolist {
  width: 200px;
  margin: 10px auto;
}
.todolist li {
  cursor: pointer;
  list-style-type: none;
}
</style>
