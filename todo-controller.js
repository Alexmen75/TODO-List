class ViewModel {
  all; // array of Todos

  query; // string
  filtered; // array of Todos
  newTodo;

  emptyTodoArray = [];
  tasks = new Set();


  constructor(all, tasks, emptyTodos, query = '') {
    const todos = all || [];
    this.all = todos;
    this.query = query;
    this.emptyTodoArray = emptyTodos || [];
    this.tasks = tasks || new Set();
    this.filtered = todos.filter(todo =>
      todo.title.includes(this.query));
  }

  getTaskInfo = (id) => {
    const task = Array.from(this.tasks).find(x => x.id == id);
    if(task == undefined){
      return {
        state: state.successfull,
        result: ""
      }
    }
    return task;
  }
}


const state = {
  fresh: 0,
  pending: 1,
  successfull: 2,
  failed: 3
}

class TaskStaet{
  id;
  state;
  action;
  result;

  constructor(id, action){
    this.id = id;
    this.action = action;
    this.state = state.fresh;
  }
}


class Controller {
  model;
  view;
  viewModel;



  constructor(model, view) {
    this.view = view;
    this.setModel(model);
  }


  setModel = (model) => {
    this.model = model;
    const tasks = this.viewModel == undefined ? new Set() : this.viewModel.tasks;
    this.viewModel = new ViewModel(this.model.todos, tasks, (this.viewModel || {}).emptyTodoArray,(this.viewModel || {}).query);
  }


  applyChange = (model, contextModel) => {
    if (contextModel.todos == undefined) {
      this.setModel(model);
      return;
    }
    const aggregateModel = model;
    aggregateModel.todos = model.todos.map(todo => {
      const contextValue = contextModel.todos.find(x => x.id == todo.id);
      return contextValue != undefined && contextValue.isDone == todo.isDone ?
        this.model.todos.find(x => x.id == contextValue.id) :
        todo;
    })
    this.setModel(aggregateModel);
  }


  runTask = async (task) => {
    try{
      task.state = state.pending;
      this.rerender();
      const contextModel = this.model;
      const result = await task.action(contextModel);
      this.applyChange(result, contextModel);
      task.state = state.successfull;
      this.viewModel.tasks.delete(task);
    }
    catch(error){
      console.log(error);
      task.state = state.failed;
      task.result = error;
    }
    finally{
      this.rerender();
    }
  }

  asyncActionTask = (func, id) => async() => {
    const task = new TaskStaet(id, func);
    this.viewModel.tasks.add(task);
    await this.runTask(task);
   
  }

  rerunTask = async (task) => {
    task.state = state.fresh;
    await this.runTask(task);
  }



  run = this.asyncActionTask(
    model => model.seedTodos(),
    "todos");



  rerender = () => {
    this.view.render(this.viewModel, this);
  }




  toogle = async (todo, e) =>
    this.asyncActionTask(
      model => model.toogle(todo),
      todo.id)();



  search = e => {
    this.viewModel = new ViewModel(this.model.todos, this.viewModel.tasks, this.viewModel.newTodo,e.target.value);
    this.rerender();
  }


  markAll = (todos, e) => {
    this.setModel(this.model.toogleMany(todos));
    this.rerender();
  }


  // createNewTodo = async(title) => 
  //   title.trim() != "" ?
  //   this.asyncActionTask(
  //     model => {
  //       const newModel = model.addTodo(title.trim());
  //       this.viewModel = new ViewModel(this.model.todos, this.viewModel.tasks, "", this.viewModel.query);
  //       return newModel;
  //     }, "newTodo")() :
  //   null;


  createNewTodo = (emptyTodo) => 
    this.asyncActionTask(async model =>{
      const result = await model.addTodo(emptyTodo);
      const newEmptyTodos = this.viewModel.emptyTodoArray.slice();
      newEmptyTodos.splice(newEmptyTodos.indexOf(emptyTodo), 1);
      this.setModel(result);
      this.viewModel.emptyTodoArray = newEmptyTodos;
      return result;
    }, emptyTodo.id)();
    

  addEmptyTodo = () =>{
    const todo = new Todo( -this.viewModel.all.length - this.viewModel.emptyTodoArray.length, "");
    const emptyTodoArray = this.viewModel.emptyTodoArray.slice();
    emptyTodoArray.push(todo);
    this.viewModel = new ViewModel(this.model.todos, this.viewModel.tasks, emptyTodoArray, this.viewModel.query);
    this.rerender();
  }
 

  saveValue = (todo, e) => {
    todo.title = e.target.value;
  }

}
