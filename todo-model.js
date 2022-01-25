
class Todo {
  id;
  title;
  isDone;

  constructor(id, title, isDone = false) {
    this.id = id;
    this.title = title;
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
    return new Model(Array.from({ length: 6 }, (_, i) => new Todo(i, `Task ${i}`)), []);
  }

  toogle = async (todo) => {
    await maybeDelay(2000, "Сорян, не смогли бахнуть галочку");
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


  addTodo = async(emptyTodo) => {
  // addTodo = async(emptyTodo) => {
    await maybeDelay(1000, "Не удалось создать элемент");
    const newTodo = new Todo(this.todos.length, emptyTodo.title, false);
    const todos = this.todos.slice();
    todos.push(newTodo);
    return new Model(todos);
  }
}

const delay = num =>
  new Promise(resolve => setTimeout(resolve, num, "Delay"));


const maybeDelay = (num, reason) =>
  new Promise((resolve, reject) =>
    setTimeout(() => Math.random() > 0.1 ? resolve() : reject(reason), num, "Delay"));