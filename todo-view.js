class View {

  elementInFocus = null;

  render = (todos, actions) => {
    document.body.innerHTML = "";
    document.body.append(this.renderApp(todos, actions));
    if(this.elementInFocus != null){
      this.elementInFocus.focus();
    }
  }


  renderApp = (todos, actions) =>
    $("div", {},
      this.renderSearchBar(todos, actions),
      this.renderAddButton(actions),
      this.renderTodoSection(todos, actions));


  renderTodoSection = (todos, actions) =>
    $("div", { id: "todos-section" },
      this.renderCompleated(todos),
      this.getTodoContent(todos, actions),
      this.renderEmptyTodos(todos, actions));


  getTodoContent = (todos, actions) => {
    const task = todos.getTaskInfo("todos");
    if (task.state == state.successfull) {
      return this.renderTodos(todos, actions);
    }
    else if (task.state == state.failed) {
      console.log(task.result);
    }
    return this.renderLoading();
  }



  renderTodos = (todos, actions) =>
    $("div", { id: "todos" },
      ...todos.filtered.map(todo => this.renderTodo(todo, actions, todos)));


  renderTodo = (todo, actions, todos) =>
    $("label", {id: "todo"},
      ...this.getCheckboxState(todos, todo, actions));
  // $("input", this.getCheckboxState(todos, todo, actions)),todo.title);
  // this.renderLoading());



  getCheckboxState = (todos, todo, actions) => {
    const task = todos.getTaskInfo(todo.id);
    if (task.state == state.pending) {
      return [$("input", this.getCheckbox(todo, actions, true)), todo.title, this.renderMiniLoading()];
    }
    else if (task.state == state.successfull || task.state == state.fresh) {
      return [$("input", this.getCheckbox(todo, actions, false)), todo.title];
    }
    else if (task.state == state.failed) {
      return [$("div",{id: "todo-error"},this.renderError(task, actions))]
    }
  }


  getCheckbox = (todo, actions, isDisabled) => {
    const checkbox = {
      checked: todo.isDone,
      id: todo.id,
      type: "checkbox",
      disabled: isDisabled,
      onchange: e => actions.toogle(todo, e)
    }
    return checkbox;
  }

  renderSearchBar = (todos, actions) => {
    const input = $("input", {
      placeholder: "Search",
      value: todos.query,
      id: "search-input"
    });
    input.oninput = e =>{
      this.elementInFocus = input;
      actions.search(e);
    } 
    if(this.elementInFocus != null && this.elementInFocus.id == input.id){
      this.elementInFocus = input;
    }

    return $("div", { id: "search-bar" },
      input,
      todos.query
        ? $("button", {
          id: "mark-button",
          onclick: e => actions.markAll(todos.filtered, e)
        },
          "MarkAll")
        : null
    );
  }



  renderAddButton = (actions) => 
    $("input", {type: "button",
                value: "add",
                onclick: actions.addEmptyTodo});
  
  renderEmptyTodos = (todos, actions) => 
    $("div",{},
      ...todos.emptyTodoArray.map(todo => this.renderEmptyTodo(todos, actions, todo)));
  
  renderEmptyTodo = (todos, actions, todo) => {
   return $("div", {id: "empty-todo"}, this.renderInputBox(todos, actions, todo));
  }

  renderInputBox = (todos, actions, todo) =>{
    const task = todos.getTaskInfo("newTodo");
    if(task.state == state.failed){
      return this.renderError(task, actions);
    }
    const isDisabled = task.state == state.pending;
    const input = $("input", {placeholder: "New todo",
                              value: todo.title,
                              oninput: e => actions.saveValue(todo, e),
                              disabled: isDisabled});
    input.onfocus = e => this.elementInFocus = input;

    if(this.elementInFocus != null && this.elementInFocus.id == input.id){
      this.elementInFocus = input;
    }
    return $("form",{onsubmit: e => actions.createNewTodo(todo)},
              input,
              $("input", {type: "submit"}));

  }
  // renderEmptyTodos = (todos, actions) => {
  //   const task = todos.getTaskInfo("todos");
  //   if(task.state == state.successfull){
  //     return $("div",{id: "empty-todo"}, ...this.renderInputBox(todos, actions));
  //   }
  // }

  // renderInputBox = (todos, actions) =>{

  //   const task = todos.getTaskInfo("newTodo");
  //   const input  = {};
  //   const createButton = {};
  //   const loading = {};
  //   if(task.state == state.pending){
  //     input.value = this.renderNewTodoBox(todos.newTodo, true);
  //     createButton.value = this.renderCreateButton(actions, input.value,true);
  //     loading.value = this.renderMiniLoading();
  //   }
  //   else if(task.state == state.failed){
  //     return [this.renderError(task, actions)];
  //   }
  //   else{
  //     input.value = this.renderNewTodoBox(todos.newTodo, false);
  //     createButton.value = this.renderCreateButton(actions, input.value,false);
  //   }
    
  //   input.value.oninput = e => {
  //     this.elementInFocus = input;
  //     actions.saveValue(e);
  //   };
  //   if(this.elementInFocus != null && this.elementInFocus.id == input.id){
  //     this.elementInFocus = input.value;
  //   }
  //   return [input.value, createButton.value, loading.value];
  // }

  renderNewTodoBox = (todo, isDisabled) =>
    $("input", {placeholder: "New Todo",
                value: todo.title || "",
                id: "new-todo-input",
                disabled: isDisabled});

  renderCreateButton = (actions, todo, isDisabled) =>
    $("input", {type: "button",
                value: "Create",
                onclick: e => actions.createNewTodo(todo),
                disabled: isDisabled});


  renderError = (task, actions) =>
    $("div", {id: "error"}, task.result, $("button", {
      onclick: e => actions.rerunTask(task),
      id: "rerun-button"
    }, "reran"))
  
  
  renderCompleated = (todos) =>
    $("div", { id: "compleated" }, `${todos.all.filter(t => t.isDone === true).length}/${todos.all.length}`);


  renderLoading = () => {
    const div = document.createElement("div");
    div.id = "loading";
    return div;
  }
  renderMiniLoading = () => 
  $("img",{src:"https://i.stack.imgur.com/MnyxU.gif",
            width: "10",
            height: "10"})
}
