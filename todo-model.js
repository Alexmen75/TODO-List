
class Todo {
  id;
  title;
  isDone;

  constructor(id, title, isDone = false) {
    this.id = id;
    this.title =  title;
    this.isDone = isDone;
  }

  toogle = () => 
    new Todo(this.id, this.title, !this.isDone);

}

class Model {
  todos = [];
  constructor(todos) {
    this.todos = todos;
  }

  seedTodos = async () => {
    await delay(1000);
    return new Model(Array.from({ length: 6 }, (_, i) => new Todo(i, `Task ${i}`)))
  }

  toogle = async (todo) => {
    await delay(2000);
    // return this.toogleMany(this.toogleList);
    const todos = this.todos.slice();
    todos.splice(todos.indexOf(todo), 1, todo.toogle());
    return new Model(todos);
  }

  toogleMany = list => {
    const todos = this.todos.slice();
    list.forEach(todo =>
      todos.splice(todos.indexOf(todo), 1, todo.toogle()));
    return new Model(todos);
  }
  
}

const delay = num => 
  new Promise(resolve => setTimeout(resolve, num));