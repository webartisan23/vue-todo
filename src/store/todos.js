const state = {
  todoList : [],
  fetchError : {
    status : false,
    message : null
  },
  apiLoading : false,
  notifications : []
}
const getters = {
  allTodos: state => {
    return state.todoList
  },
  completedTodos: state => {
    return state.todoList.filter(todo => todo.completed)
  },
  pendingTodos: state => {
    return state.todoList.filter(todo => !todo.completed)
  }
}
const actions = {
  fetchTodos({commit}){
    commit('setLoading',true)
    this._vm.$axios.get('/todos').then((res) => {
      let todoData = res.data
      commit('setTodo',todoData)
    }).catch((e) => {
      commit('setAPIerror',{
        status : false,
        message : e
      })
    }).then(() => {
      commit('setLoading',false)
    })
  },
  deleteTodo({commit},todoId){
    commit('setLoading',true)
    this._vm.$axios.delete('/todos/'+todoId).then(() => {
      commit('removeTodo',todoId)
      commit('setNotification',{
        type : 'success',
        message : 'Todo removed successfully!'
      })
    }).catch((e) => {
      commit('setAPIerror',{
        status : false,
        message : e
      })
      commit('setNotification',{
        type : 'error',
        message : 'Unable to remove todo!'
      })
    }).then(() => {
      commit('setLoading',false)
    })
  },
  addTodo({commit},title){
    commit('setLoading',true)
    this._vm.$axios.post('/todos',{
      title : title
    }).then(() => {
      commit('setNewTodo',title)
      commit('setNotification',{
        type : 'success',
        message : 'Todo added successfully!'
      })
    }).catch((e) => {
      commit('setAPIerror',{
        status : false,
        message : e
      })
      commit('setNotification',{
        type : 'error',
        message : 'Unable to add todo!'
      })
    }).then(() => {
      commit('setLoading',false)
    })
  }
}
const mutations = {
  setLoading(state,status) {
    state.apiLoading = status
  },
  setTodo(state,data) {
    //add only first 10 items from API data
    state.todoList = data.slice(0, 10);
  },
  setAPIerror(state,data){
    state.fetchError.status = data.status
    state.fetchError.message = data.message
  },
  removeTodo(state,todoId) {
    state.todoList = state.todoList.filter(todo => todo.id != todoId)
  },
  setNewTodo(state,title) {
    state.todoList.unshift({
      id : (state.todoList.length + 1),
      title : title,
      completed : false
    })
  },
  setNotification(state,notification) {
    state.notifications.unshift(notification)
    //remove recently added notification after 5 seconds
    setTimeout(()=>{
      state.notifications.pop()
    },5000)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}