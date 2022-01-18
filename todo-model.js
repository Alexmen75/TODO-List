
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

  seedTodos = async () => {
    await delay(500);
    this.todos = Array.from({ length: 6 }, (_, i) => new Todo(i, `Task ${i}`)); 
  }

  toogle = (todo) => {
    this.todos = this.todos.slice();
    this.todos.splice(this.todos.indexOf(todo), 1, todo.toogle());
  }
  
}

const delay = num => 
  new Promise(resolve => setTimeout(resolve, num));