class View {

  elementInFocus = null;

  render = (todos, actions) => {
    document.body.innerHTML = "";
    document.body.append(this.renderApp(todos, actions));

    this.elementInFocus.focus();
  }

  // renderSearchRequest = (todos, action) => {
  //   const todoSection = document.getElementById("todos-section");
  //   todoSection.innerHTML = "";
  //   todoSection.append(this.renderMarkButton(todos, action), this.renderTodoSection(todos, action));
  // }
  

  // renderTodosPart = (todos, action) => {
  //   const todoSection = document.getElementById("todos-section");
  //   todoSection.innerHTML = "";
  //   todoSection.append(this.renderTodoSection(todos, action)); 
  // }

  renderApp = (todos, actions) => 
    $("div", {},
      this.renderSearchBar(todos, actions),
      this.renderTodoSection(todos, actions));

  
  renderTodoSection = (todos, actions) =>
    $("div", {id: "todos-section"},
      this.renderCompleated(todos),
      actions.usingEntries.has("todos") ?
      this.renderLoading(actions) :
      this.renderTodos(todos, actions));


  renderTodos = (todos, actions) => 
    $("div", { id: "todos" }, 
      ...todos.filtered.map(todo => this.renderTodo(todo, actions)));
  
  
  renderTodo = (todo, actions) => 
    $("label", {},
      $("input", {
        checked: todo.isDone,
        type: "checkbox",
        disabled: actions.usingEntries.has(todo.id),
        onchange: e => actions.toogle(todo, e)
        }),
      todo.title);
    
  renderSearchBar = (todos, actions) => {
    const input = $("input", {
      placeholder: "Search",
      value: todos.query,
      oninput: e => actions.search(e)});

    this.elementInFocus = input; 
      
    return $("div", {id: "search-bar"}, 
      input,
      todos.query 
        ? $("button", {
            id: "mark-button",
            onclick: e => actions.markAll(todos.filtered, e)},
            "MarkAll")
        : null        
      );
  }

  renderCompleated = (todos) =>
    $("div", { id: "compleated" }, `${todos.all.filter(t => t.isDone === true).length}/${todos.all.length}`);
  


  
  
  renderLoading = () => {
    const div = document.createElement("div");
    div.id = "loading";
    return div;
    //document.body.append(div);
  }
}
