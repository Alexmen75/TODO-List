class Controller {
  model;
  view;

  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  run = async () => {
        
    this.rerender();
    // Загрузили данные с сервера
    await this.model.seedTodos();

    this.rerender();
  }

  rerender = () => {
    this.view.render(this.model.todos, this);
  }
  
  renderSearchResult = (model) => {
    this.view.renderSearchRequest(model, this);
  }

  toogle = (todo, e) => {
    this.model.toogle(todo);
    this.rerender();

  }

  search = e => {
    const searchString = e.target.value; 
    if(searchString === ""){
      this.rerender();
      return;
    }
    const searchResult = this.model.todos.filter(todo =>
                              todo.title.search(searchString) > -1);
    this.renderSearchResult(searchResult, searchString);
  }

  markAll = (todos, e) => {
    todos.map(todo => this.model.toogle(todo));
    this.view.renderTodosPart(this.model.todos, this);
  }
}
