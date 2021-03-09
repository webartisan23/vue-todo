<template>
  <v-app>
    <!-- Must have the app property -->
    <v-system-bar window dark>
      <v-icon>mdi-message</v-icon>
      <span>You have {{todoList.length}} total todos and {{pendingTodos.length}} pending out of them</span>
      <v-spacer></v-spacer>
    </v-system-bar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-progress-circular
        :rotate="360"
        :size="100"
        :width="10"
        :value="completePercent"
        class="fixed-progress-bar"
        color="success"
      >
        {{ completePercent }} %
    </v-progress-circular>
    <div class="notification-area">
      <v-alert dense :type="notification.type" dismissible v-for="(notification,index) in notifications" :key="index">
       {{notification.message}}
      </v-alert>
    </div>
  </v-app>
</template>
<script>
import {mapState,mapGetters} from "vuex";
export default {
  name: "App",
  components: {},

  data: () => ({
    //
  }),
  computed :{
    ...mapState('todos',['todoList','notifications']),
    ...mapGetters('todos',['pendingTodos','completedTodos']),
    completePercent(){
      return Math.ceil(this.completedTodos.length * 100 / this.todoList.length)
    }
  },
};
</script>
<style scoped>
.fixed-progress-bar {
  position:fixed;
  bottom:10px;
  left:20px;
}
.notification-area{
  position: fixed;
  max-width: 400px;
  bottom: 10px;
  max-height:400px;
  overflow-y: auto;
  left: 50%;
  transform: translateX(-50%);
}
</style>
