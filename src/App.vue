<template>
  <div id="app">
    <header>
      <div class="header">
        <h1>{{ pageTitle }}</h1>
        <button class="buttons clear" @click="clearList">Clear</button>
      </div>
    </header>
    <div class="content">
      <Todo :todoList="todoList" :newItem="newItem" :deleteItem="deleteItem"  :editItem="editItem" :saveItem="saveItem" :addItem="addItem"/>
    </div>
  </div>
</template>

<script>
import Todo from "./components/Todo.vue";
import { getTodoList } from "./services/getTodoList.js";
import { v4 as uuidv4 } from 'uuid';

const defaultItem = {
  name: "",
  description: "",
  priority: "Important", // Note: default is important
  isEditMode: false,
};

export default {
  data() {
    return {
      pageTitle: "TODO list",
      todoList: getTodoList(),
      newItem: {
        ...defaultItem,
      },
    };
  },
  components: {
    Todo,
  },
  methods: {
    clearList() {
      this.todoList = [];
      localStorage.clear();
    },
    deleteItem({ id }) {
      if (!id) return;

      this.todoList = this.todoList.filter((el) => el.id !== id); // Note: a standard for loop is more performant but it's not as nice to read
      updateTodoList(this.todoList);
    },
    editItem(item) {
      if (!item) return;

      item.isEditMode = true;
    },
    saveItem(item) {
      if (!item || !item.id) return;

      item.isEditMode = false;
      updateTodoList(this.todoList);
    },
    addItem() {
      if (this.todoList === null || undefined) {
        this.todoList = [];
      } // Note: shouldn't be null, this is just being defensive

      this.formErrors = [];
      if (!this.newItem.name) {
        this.formErrors.push("Please add a name");
        return;
      }

      const id = uuidv4();
      const updateItem = { ...this.newItem, id };

      this.todoList.push(updateItem);
      updateTodoList(this.todoList);

      this.newItem = { ...defaultItem };
    },
  },
};

const updateTodoList = (list) => {
  localStorage.setItem("todo", JSON.stringify(list));
};

</script>

<style>
header {
  color: white;
  padding: 10px 0 25px 0;
  background-color: #602f6b;
}

h1 {
  font-weight: 100;
  margin: 0px;
}

.header {
  display: flex;
  justify-content: space-around;
}

.buttons {
  height: 30px;
  cursor: pointer;
  font-size: large;
  border: 1px solid;
  border-radius: 3px;
  margin-right: 5px;
}

body {
  background-color: rgb(240, 238, 238);
  font-family: "Poppins", sans-serif;
  margin: 0px;
}

input {
  font-size: 18;
}

.content {
  display: flex;
  background-color: rgb(249, 246, 238);
  filter: drop-shadow(0 0 0.45rem rgb(182, 182, 182));
  padding-bottom: 20px;
  justify-content: center;
}
</style>
