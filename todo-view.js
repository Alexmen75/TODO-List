class View {

  render = (todos, actions) => {
    document.body.innerHTML = "";
    document.body.append(this.renderApp(todos, actions)); 
  }

  renderSearchRequest = (todos, action) => {
    const todoSection = document.getElementById("todos-section");
    todoSection.innerHTML = "";
    todoSection.append(this.renderMarkButton(todos, action), this.renderTodoSection(todos, action));
  }
  

  renderTodosPart = (todos, action) => {
    const todoSection = document.getElementById("todos-section");
    todoSection.innerHTML = "";
    todoSection.append(this.renderTodoSection(todos, action)); 
  }


  renderMarkButton = (todos, action) => 
    $("button",{id: "mark-button",
                onclick: e => action.markAll(todos, e),
                innerText: "MarkAll"})

  renderApp = (todos, actions) => 
    $("div", {},
      this.renderSearchBar(actions),
      this.renderTodoSection(todos, actions));

  
  renderTodoSection = (todos, actions) =>
    $("div", {id: "todos-section"},
      this.renderCompleated(todos),
      this.renderTodos(todos, actions));


  renderTodos = (todos, actions) => 
    $("div", { id: "todos" }, 
      ...todos.map(todo => this.renderTodo(todo, actions)));
  
  
  renderTodo = (todo, actions) => 
    $("label", {},
      $("input", {
        checked: todo.isDone,
        type: "checkbox",
        onchange: e => actions.toogle(todo, e)
        }),
      todo.title);
    
  renderSearchBar = (action = "") => 
    $("div", {id: "search-bar"},
      $("input", {placeholder: "Search",
                  onkeyup: e => action.search(e)}));
        
  
  renderCompleated = (todos) =>
    $("div", { id: "compleated" }, `${todos.filter(t => t.isDone === true).length}/${todos.length}`);
  
}



