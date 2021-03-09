<template>
  <div class="home">
    <v-row>
      <v-col cols="3">
        <TodoForm></TodoForm>
      </v-col>
      <v-col cols="9">
         <TodoList></TodoList>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import TodoForm from "@/components/TodoForm.vue";
import TodoList from "@/components/TodoList.vue";
export default {
  name: "Home",
  components: {
    TodoForm,
    TodoList
  },
};
</script>
