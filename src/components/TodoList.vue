<template>
  <v-card :loading="apiLoading">
    <v-card-title>
      <span>Todo List</span>
      <v-spacer></v-spacer>
      <v-row>
        <v-col cols="auto">
           <v-select
          :items="filterOptions"
          :label="`Showing (${filteredTodo.length} / ${allTodos.length}) todos`"
          outlined
          dense
          v-model="defaultFilter"
          hide-details=""
        ></v-select>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text style="max-height: 85vh; overflow-y: auto">
      <v-list-item v-for="todo in filteredTodo" :key="todo.id" dense :disabled="apiLoading">
        <v-list-item-action class="my-1">
          <v-checkbox v-model="todo.completed"></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title
            :class="{ 'text-decoration-line-through': todo.completed }"
            >{{ todo.title }}</v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-action class="my-1">
          <v-btn icon @click="deleteTodo(todo.id)">
            <v-icon color="grey lighten-1">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "TodoList",
  data() {
    return {
      todos: [],
      defaultFilter: "",
      filterOptions: [
        { text: "All Todos", value: "" },
        { text: "Pending Todos", value: false },
        { text: "Completed Todos", value: true },
      ],
    };
  },
  computed: {
    ...mapState("todos", ["todoList","apiLoading"]),
    ...mapGetters("todos", ["allTodos", "pendingTodos", "completedTodos"]),
    filteredTodo(){
       switch (this.defaultFilter) {
        case true:
          return this.completedTodos;
        case false:
          return this.pendingTodos;
        default:
          return this.allTodos;
      }
    }
  },
  methods: {
    ...mapActions("todos", ["fetchTodos","deleteTodo"])
  },
  mounted: function () {
    this.fetchTodos();
  },
};
</script>

<style>
</style>