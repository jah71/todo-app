<template>
  <div class="todoListContent">
    <ul class="todo" v-if="todoList.length > 0">
      <li v-for="item in todoList" :key="item.id">
        <div class="flextodo">
          <div class="todoListItem">
            <div>
              <input
                size="40"
                v-bind:class="{ inputDisabled: !item.isEditMode }"
                :disabled="!item.isEditMode"
                class="todoName"
                v-model="item.name"
              />
            </div>
            <div>
              <input
                v-if="item.description"
                size="40"
                v-bind:class="{ inputDisabled: !item.isEditMode }"
                :disabled="!item.isEditMode"
                class="todoDescription"
                v-model="item.description"
              />
            </div>
            <div>
              <select
                v-bind:class="[
                  getPriorityClass(item),
                  { inputDisabled: !item.isEditMode },
                ]"
                :disabled="!item.isEditMode"
                v-model="item.priority"
              >
                <option v-for="priority in priorities" :key="priority">
                  {{ priority }}
                </option>
              </select>
            </div>
          </div>
          <div class="todoListButtons">
            <button
              class="buttons edit"
              v-if="!item.isEditMode"
              @click="editItem(item)"
            >
              Edit
            </button>
            <button class="buttons save" v-else @click="saveItem(item)">
              Save
            </button>
            <button class="buttons delete" @click="deleteItem(item)">
              Delete
            </button>
          </div>
        </div>
        <hr />
      </li>
    </ul>
    <p class="emptyTodoList" v-else>You have nothing to do, well done!</p>
    <form v-on:submit.prevent="addItem">
      <div class="newItem">
        <div class="addItemInput">
          <input
            type="text"
            v-model="newItem.name"
            placeholder="add todo"
            v-on:keyup.enter="addItem"
          />
        </div>
        <div v-if="formErrors">
          <p class="error" v-for="error in formErrors" v-bind:key="error">
            {{ error }}
          </p>
        </div>
        <div class="addItemInput">
          <input
            type="text"
            v-model="newItem.description"
            placeholder="add description*"
          />
        </div>
        <div class="addItemInput">
          <select class="prioritySelect" v-model="newItem.priority">
            <option v-for="priority in priorities" :key="priority">
              {{ priority }}
            </option>
          </select>
        </div>
        <div>
          <button class="addButton">+</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  props: {
    todoList: Array,
    newItem: Object,
    deleteItem: Function,
    editItem: Function,
    saveItem: Function,
    addItem: Function
  },
  data() {
    return {
      formErrors: [],
      priorities: {
        // TODO: maybe move this to its own component
        // Note: in an ideal world this would be a type
        HIGH: "Life changing",
        MEDIUM: "Important",
        LOW: "Meh",
      },
    };
  },
  methods: {
    getPriorityClass({ priority, isEditMode }) {
      if (!priority) return;
      const priorityClass = `${priority
        .replaceAll(" ", "")
        .toLowerCase()}Prior`;

      return !isEditMode ? priorityClass : "";
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inputDisabled {
  -webkit-appearance: none;
  border: none;
  padding: 3px 4px;
}

.todo {
  list-style-type: none;
  padding: 0;
  margin-left: 15px;
  margin-right: 15px;
}

.flextodo {
  display: flex;
  justify-content: space-between;
}

.todoListButtons {
  padding-bottom: 20px;
  padding-left: 10px;
}

.save {
  background-color: #3a6b2f;
  border-color: black;
  color: white;
}

.edit {
  background-color: white;
  color: rgb(52, 73, 94);
  margin-right: 2px;
}

.delete {
  background-color: #c71212;
  color: white;
  border-color: #8b0000;
}

.lifechangingPrior {
  color: #800000;
  background: inherit;
}

.importantPrior {
  color: #c28800;
  background: inherit;
}

.mehPrior {
  color: #e9da0a;
  background: inherit;
}

.emptyTodoList {
  text-align: center;
}

.newItem {
  display: flex;
  flex-direction: column;
  margin: 16px;
}

.addItemInput {
  padding-bottom: 4px;
}

.error {
  color: red;
  margin: 0;
}
</style>
