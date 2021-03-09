<template>
  <v-form @submit.prevent @submit="submitHandler">
    <v-card>
      <v-card-title>Add Todo</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.trim="newTodoTitle"
              hint="What needs to be done?"
              persistent-hint
              label="Title"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!newTodoTitle" type="submit">
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import {mapActions} from "vuex"
export default {
  name: "TodoForm",
  data() {
    return {
      newTodoTitle : ''
    };
  },
  methods : {
    ...mapActions('todos',['addTodo']),
    submitHandler(){
      if(this.newTodoTitle){
        this.addTodo(this.newTodoTitle).then(() => {
          this.newTodoTitle = ''
        })
      }
    }
  }
};
</script>

<style>
</style>